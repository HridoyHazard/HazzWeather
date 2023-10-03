# [HazzWeather](https://effulgent-brioche-795ac4.netlify.app/)

## _The Only Weather App You Need !_

![image](https://user-images.githubusercontent.com/71395891/195014989-9760cf7c-a410-424f-a144-fc44f0a6b532.png)

## About

Weather Application created using ReactJS and APIs provided by OpenAPI.org.

- [Contributing Guidelines](https://github.com/HridoyHazard/HazzWeather/blob/main/CONTRIBUTING.md)
- [About Hacktoberfest](https://github.com/HridoyHazard/HazzWeather/blob/main/HACKTOBERFEST.md)

## Features

- Type the name of city whose weather has to be known OR allow location access(to check weather of present location).
- Sound customised to selected city's weather played in the background.
- Displays the present weather conditions (Temperature, Humidity, Cloud Cover) along with forecasts for the future.
- Animation According To Weather Condition.

## Setup Guide

- Copy the `.env.example` file and rename it to `.env`.
- Make an account on [OpenWeather.org](https://openweathermap.org/)
- Click on your `avatar/username` in navbar.
- Click on `My API Keys`.
- Generate a `key` if there is none.
- Copy the `Key` and paste in `.env` file.

### For local development / deployment

- Install the node modules with `npm i`.
- Run the application using `npm start`.
- Access to the application with http://localhost:3000
- To exit press CTRL+C

### For build and run a local development / deployment container using Docker and Docker-Compose

- Install Docker and Docker-Compose. The best way is to install Docker Desktop, please refer to the docs at https://docs.docker.com/get-docker/.
- Execute `docker-compose -f docker-compose.dev.yml up` or use `make compose-run-dev` to deploy a local container.
- Access to the application with http://localhost:3000
- To see the actual log of the container, run `docker logs -f hazzweather_dev`, to exit press CTRL+C
- To stop the container, execute `docker-compose -f docker-compose.dev.yml down` or `make compose-stop-dev`

### For build and run a local production container using Docker and Docker-Compose

- Install Docker and Docker-Compose. The best way is to install Docker Desktop, please refer to the docs at https://docs.docker.com/get-docker/.
- Execute `docker-compose -f docker-compose.prod.yml up` or use `make compose-run-prod` to deploy a local container.
- Access to the application with http://localhost:3000
- To see the actual log of the container, run `docker logs -f hazzweather_prod`, to exit press CTRL+C
- To stop the container, execute `docker-compose -f docker-compose.prod.yml down` or `make compose-stop-prod`

### For build and run a production container using Docker (intented for orchestration or deployment in the cloud)

- Install Docker. The best way is to install Docker Desktop, please refer to the docs at https://docs.docker.com/get-docker/.
- Execute `docker build -f Dockerfile.prod --target production -t hazzweather . --no-cache` or use `make docker-build-prod` to build the image
- Execute `docker run -d -p 80:80 --env-file .env --name hazzweather_prod hazzweather` or use `make docker-run-prod` to run the container
- Access to the application with http://localhost
- To see the actual log of the container, run `docker logs -f hazzweather_prod`, to exit press CTRL+C
- To stop the container, execute `docker stop hazzweather_prod` or `make docker-stop-prod`
- If you need to delete the container, execute `docker rm hazzweather_prod` or use `make docker-rm-prod`

## REPO STATUS

<div align="center">

![GitHub PR Open](https://img.shields.io/github/issues-pr/HridoyHazard/HazzWeather?style=for-the-badge&color=aqua)
![GitHub PR closed](https://img.shields.io/github/issues-pr-closed-raw/HridoyHazard/HazzWeather?style=for-the-badge&color=blue)
![GitHub language count](https://img.shields.io/github/languages/count/HridoyHazard/HazzWeather?style=for-the-badge&color=brightgreen)
<br><br>

## How to contribute:

- Drop a :star: on the Github repository (optional)<br/>

- Before Contribute Please read [CONTRIBUTING.md](https://github.com/HridoyHazard/HazzWeather/blob/main/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://github.com/HridoyHazard/HazzWeather/blob/main/CODE_OF_CONDUCT.md)

- Create an issue of the project or a feature you would like to add in the project and get the task assigned to you.(Issue can be any bug fixes or any feature you want to add in this project).

- Fork the repo to your Github.<br/>

- Clone the Repo by going to your local Git Client in a particular local folder in your local machine by using this command with your forked repository link in place of below given link: <br/>
  `git clone https://github.com/HridoyHazard/HazzWeather`
- Create a branch using below command.
  `git branch <your branch name>`
- Checkout to your branch.
  `git checkout <your branch name>`
- Add your code in your local machine folder.
  `git add . `
- Commit your changes.
  `git commit -m"<add your message here>"`
- Push your changes.
  `git push --set-upstream origin <your branch name>`

- Make a pull request! (compare your branch with the owner main branch)

# Contributors

<br>
<div>
<h1 align="center">
 <b>Thanks to these amazing people
<h1>
<a href="https://github.com/HridoyHazard/HazzWeather/contributors">
  <img src="https://contrib.rocks/image?repo=HridoyHazard/HazzWeather&&max=817" />
</a>
</div>
<br>
<div align="center">
<h3>Show some ❤️ by starring this awesome repository!</h3>
</div>
