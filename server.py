from flask import Flask, jsonify, redirect
from dotenv import load_dotenv, dotenv_values 
import os
import random
import string
from urllib.parse import urlencode

app = Flask(__name__)
load_dotenv(".env.local") #import .env variables
client_id = os.getenv("CLIENT_ID")

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

@app.route('/get50', methods=['GET'])
def getTop50():

    output = {"tmp":"TODO"}

    return jsonify(output)





if __name__ == '__main__':
    app.run(host='localhost', port = 5000)