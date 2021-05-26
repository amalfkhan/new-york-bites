# New York Restaurant Review

An application for users to post reviews on restaurants in New York

## Project Screen Shots

### Search:   

[ ADD SCREEN SHOTS ]

### Restaurant:

[ ADD SCREEN SHOTS ]

### Login and Register:

[ ADD SCREEN SHOTS ]


## Installation and Setup

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

### Installation:

Server - from the restaurant-reviews folder
```sh
cd backend
npm i
``` 

Frontend - from the restaurant-reviews folder
```sh
cd frontend
npm i
```

### Start Application:

Start Server - from the restaurant-reviews folder
```sh
cd backend
npm run start
```

Start Frontend - from the restaurant-reviews folder
```sh
cd frontend
npm run start
``` 

To Visit App:
`localhost:3000/`  

## Reflection

This was a project built to familiarize myself with: 
  - The process of developing a server in nodejs 
  - Connecting a server to a mongodb database
  - Methods for connecting a backend to a frontend
  - Reading technical documentation for tools that are new to me

I wanted to build an application that allowed users to leave restaurant reviews. I started this by first developing a backend that connected to my mongodb database. The database was populated using a sample dataset of restaurants in New York. I tested the backend using insomnia. Once the majority of the backend was complete, I switched to setting up my frontend and putting in requests to the backend. I later decided I wanted to implement a proper user sign-in so I built out a user authentication system.  

The main challenges I ran into were setting up authentication, and working directly with mongodb. My understanding of authentication has greatly improved, and in future projects I'll likely use mongoose as an in-between to a mongodb database.

The main technologies I used in implementing this project included:
  - React with React Router
  - node.js with Express
  - Mongodb