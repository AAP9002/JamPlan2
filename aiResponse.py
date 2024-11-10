from dotenv import load_dotenv, dotenv_values 
import os
import google.generativeai as genai

def generateResponse(prompt:str):
    load_dotenv(".env.local") #contains api key
    genai.configure(api_key= os.getenv("AI_KEY"))
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text

if __name__ == '__main__':
    print(generateResponse("Hello there :3"))