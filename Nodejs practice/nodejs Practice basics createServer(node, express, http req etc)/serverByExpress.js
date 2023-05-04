// import express (after npm install express)
const express = require('express');

// create new express app and save it as "app"
const app = express();

// server configuration
const PORT = 8080;

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});

// create a route for the app
app.get('/', (req, res) => {
    res.sendFile("./view/home.html",{root:__dirname});
  });

// create a route for the about
app.get('/about', (req, res) => {
    res.sendFile('./view/about.html',{root:__dirname});
  });

// create a route for the about-me
app.get('/about-me', (req, res) => {
    res.redirect("/about")
  });

// create a route for the any other that's does not exists
app.get('*', (req, res) => {

    res.sendFile("./view/404.html",{root:__dirname})
  });