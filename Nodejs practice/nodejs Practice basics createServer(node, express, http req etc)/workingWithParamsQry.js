// import express (after npm install express)
const express = require('express');

// create new express app and save it as "app"
const app = express();
// middleware
app.use(express.json())

// server configuration
const PORT = 8080;

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});

users = {}
// get method
app.get("/user", (req, res)=> {
    console.log(req.query);
    res.send(users)
})

// working with params
app.get("/user/:id",(req, res)=> {
    console.log(req.params.id);
    res.json({message:"user id received"})
})