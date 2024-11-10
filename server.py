from flask import Flask, jsonify, redirect, request
from dotenv import load_dotenv, dotenv_values 
import os
import random
import string
from urllib.parse import urlencode
import requests
import json
import base64

app = Flask(__name__)
load_dotenv(".env.local") #import .env variables
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

@app.route('/authenticate', methods=['GET'])
def authenticateSpotify():
    
    parameters = {
        "response_type": 'code',
        "client_id": client_id,
        "scope": 'user-read-private user-read-email',
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

    return str(tracksList)


@app.route('/get_user_profile/<token>', methods=['GET'])
def getProfile(token):
    url = "https://api.spotify.com/v1/me?"
    headers = {
    "Authorization": f"Bearer {token}"
    }   
    response = requests.get(url, headers=headers)
    response = json.loads(response.content.decode('utf-8'))
    return str(response)



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
    return str(response)

@app.route('/getAI', methods=['GET'])
def getAIResponse():
    print("TODO")
    return "Tmp response"

if __name__ == '__main__':
    app.run(host='localhost', port = 5000)