![image](https://github.com/user-attachments/assets/66e01b90-4dfe-46bb-8ff3-5a18a366b090)
## GreatUniHack 2024 -  GDG 2nd Place
![image](https://github.com/user-attachments/assets/36b8a37b-e734-413f-a406-acf5dada3417)


## What it does

Since peoples music taste is always changing as time moves forward, it can be hard to find songs all your friends want to jam out to. We use Spotify's API to gather most listened songs over time and find trends between the group as a whole. These trends allow us to predict songs that peoples music taste may be drifting towards and all enjoy at their next jam sesh. We are unique due to the fact that we account for time when gathering and predicting data and explore how your tastes change over time.

## How we built it

We used Flask backend and Typescript front end. We handle all the AI calls using python and pass the results to the front end. The use of Spotify API is key as this lets us gather accurate data personalised to the users for a better experience.

## Challenges we ran into

We ended up restarting the whole code base at 1am after using typescript as a back end became too much of a pain. (Hence the two in the name) After restarting using python, it was challenging to integrate the spotify API as it runs using javascript and we were using python.

## Accomplishments that we're proud of

As a team of two who only joined forces late Saturday, plus restarting at 1am, we made a huge amount of progress compared to what I was expecting. Using the Spotify API in python despite it being a javascript library (via lots of jank). Our system for generating our predictions. We used a two layered model, one layer to summarise trends in listening between the group, which feeds into the second layer which uses the input to recommend a jam sesh. This gave far better performance and more natural sounding text.

## What we learned

Do not use typescript as backend...

## Examples
![image](https://github.com/user-attachments/assets/22e3182b-e9b6-4b07-80fd-5bcb27fdc95b)
![image](https://github.com/user-attachments/assets/27c31b2b-5579-435d-ae17-95b609393d0a)
![image](https://github.com/user-attachments/assets/c65fdf12-45aa-4f59-90e5-82f33f91d582)
