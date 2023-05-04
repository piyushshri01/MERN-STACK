// import express (after npm install express)
const express = require('express');
const userRouter = require("./Routers/userRouter")
const authRouter = require("./Routers/authRouter")
const cookieParser = require('cookie-parser')

// create new express app and save it as "app"
const app = express();
// middleware
app.use(express.json())
// cookie parser
app.use(cookieParser())

// server configuration
const PORT = 8080;

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});

// Base route
app.use("/user",userRouter)
app.use("/auth", authRouter)