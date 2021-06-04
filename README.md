![Home/Search page](https://i.imgur.com/6VcjW1R.png)

# New York Bites

[Visit Live Site](https://new-york-bites.herokuapp.com/)

An application for users to post reviews for restaurants in New York City.

**Example account**

Feel free to create your own account, or take a look at this example account that has reviews posted:

```sh
email: rodrigohernandez@me.com
pwd: rodrigohernandez
```

## Tools

React/JavaScript, Node.js/Express, mongoDB

## Features

- Users can browse a collection of restaurants in New York City
- Users can register for an account - email/username is checked for uniqueness and passwords are stored encrypted
- Users can create, edit and delete their own reviews
- Users can search the entire collection of restaurants by name, zipcode, or cuisine

<p>&nbsp;</p>

## Project Screen Shots

### Individaul Restaurant (Featured Quick Bite):

![Restaurant example](https://i.imgur.com/CTFOxzX.png)

### Register:

![Registration page with error](https://i.imgur.com/V5epimG.png)

<p>&nbsp;</p>

## Reflection

I built this project to familiarize myself with:

- Developing a server in node.js
- Connecting a server to a mongodb database
- Methods for connecting a backend to a frontend
- Reading technical documentation for tools that are new to me

I wanted to build an application that allowed users to leave restaurant reviews. I started this by first developing a backend that connected to my mongodb database. The database was populated using a sample dataset of restaurants in New York. I tested the backend using insomnia. Once the majority of the backend was complete, I switched to setting up my frontend and putting in requests to the backend. I later decided I wanted to implement a proper user sign-in so I built out a user authentication system.

The main challenges I ran into were setting up authentication, and working directly with mongodb. My understanding of authentication has greatly improved, and in future projects I'll likely use mongoose as an in-between to a mongodb database.
