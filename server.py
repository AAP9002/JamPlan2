from flask import Flask, jsonify, redirect, request
from dotenv import load_dotenv, dotenv_values 
import os
import random
import string
from urllib.parse import urlencode
import requests
import json
import base64
import aiResponse

app = Flask(__name__)
load_dotenv(".env.local") #import .env variables
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

@app.route('/authenticate', methods=['GET'])
def authenticateSpotify():
    
    parameters = {
        "response_type": 'code',
        "client_id": client_id,
        "scope": 'user-top-read user-read-private user-read-email',
        "redirect_uri": "http://localhost:3000/spotify/accept_oauth_link",
        "state": "1111111111111111"#''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(16))
    }
   
    return redirect(location =('https://accounts.spotify.com/authorize?' + urlencode(parameters)))

@app.route('/get50/<token>', methods=['GET'])
def getTop50(token):

    url = "https://api.spotify.com/v1/me/top/tracks?"
    parameters = {
        "time_range": "short_term",
        "limit": 50
    }
    headers = {
    "Authorization": f"Bearer {token}"
    }

    response = requests.get(url+urlencode(parameters), headers=headers, params=parameters) 
    tracksList = json.loads(response.content.decode('utf-8'))

    #track_names = [item["name"] for item in tracksList["items"]]

    return tracksList

@app.route('/get50Medium/<token>', methods=['GET'])
def getTop50Medium(token):

    url = "https://api.spotify.com/v1/me/top/tracks?"
    parameters = {
        "time_range": "medium_term",
        "limit": 50
    }
    headers = {
    "Authorization": f"Bearer {token}"
    }

    response = requests.get(url+urlencode(parameters), headers=headers, params=parameters) 
    tracksList = json.loads(response.content.decode('utf-8'))

    #track_names = [item["name"] for item in tracksList["items"]]

    return tracksList

@app.route('/get50Long/<token>', methods=['GET'])
def getTop50Long(token):

    url = "https://api.spotify.com/v1/me/top/tracks?"
    parameters = {
        "time_range": "long_term",
        "limit": 50
    }
    headers = {
    "Authorization": f"Bearer {token}"
    }

    response = requests.get(url+urlencode(parameters), headers=headers, params=parameters) 
    tracksList = json.loads(response.content.decode('utf-8'))

    #track_names = [item["name"] for item in tracksList["items"]]

    return tracksList


@app.route('/get_user_profile/<token>', methods=['GET'])
def getProfile(token):
    url = "https://api.spotify.com/v1/me?"
    headers = {
    "Authorization": f"Bearer {token}"
    }   
    response = requests.get(url, headers=headers)
    response = json.loads(response.content.decode('utf-8'))
    return response



@app.route('/getAccessToken', methods=['GET'])
def getAccessToken():
    code = request.args.get('code', type=str, default="")

    headers = {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + base64.b64encode(f"{client_id}:{client_secret}".encode("utf-8")).decode("utf-8")
        }
    payload = {
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': "http://localhost:3000/spotify/accept_oauth_link"
    }

    response = requests.post(url = "https://accounts.spotify.com/api/token", data = payload, headers=headers)

    response = json.loads(response.content.decode('utf-8'))
    return response

@app.route('/getAI/<input>', methods=['GET'])
def getAIResponse(input):

    #TMP INPUT
    input = {
        "time frame 1": [["Song1","Song2", "Song3", "Song4"], ["Song4","Song5", "Song6"],["Song4","Song5","Song1"]],
        "time frame 2": [["Song1","Song2", "Song3", "Song4"], ["Song4","Song1", "Song10"],["Song4","Song3","Song1"]],
        "time frame 3": [["Song1","Song2", "Song3", "Song4"], ["Song4","Song3", "Song10"],["Song4","Song3","Song10"]]
    }

    # assume input of form: {time frame 1:[UserList1,Userlist2....UserListN], time frame 2:[...], time frame 3:[...]}
    #time frame 1 is shortest (4 weeks)
    timeframe1 = input['time frame 1'] #4 weeks
    timeframe2 = input['time frame 2'] #6 months
    timeframe3 = input['time frame 3'] #1 year

    History = f'Over the last 4 weeks the group has listened to {timeframe1}. '\
        f'Over the last 6 months the group has listened to {timeframe2}. '\
        f'Over the last year the group has listened to {timeframe3}. '
    
    prompt1 = f'You are an analyst whos job is to summarize how a group of music peoples taste overlaps over a period of time. You must use only plain text. You must answer in less than 150 words. '\
        f'You should focus on the common ground as well as differences between people, espeically how it varies as time passes. '\
        f'Use the historic listening data made available to you: {History}'
    output1 = aiResponse.generateResponse(prompt1)

    #use generated summary of intrests to reccomend songs. This is seperated so the model can focus on the tasks seperatly for better performance

    prompt2 = f'You are a summarizer who will reccomend songs that should be played by the group in a jam session. You must use only plain text. You must answer in less than 150 words. '\
        f'You have a summary of the groups musical interests and how they change overtime that you can use as information about the group: [{output1}] '
    output2 = aiResponse.generateResponse(prompt2)
    return output2

if __name__ == '__main__':
    app.run(host='localhost', port = 5000)