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
    res.send(users)
})

// post method
app.post("/user", (req, res)=> {
    console.log(req.body);
    users = req.body
    res.json({
        message: "send data successfully",
        user:req.body
    })
})

// patch method
app.patch("/user", (req,res) => {
    console.log("req.body =>", req.body);
    let dataToBeUpdated = req.body;
    for (key in dataToBeUpdated){
        users[key] = dataToBeUpdated[key]
    }
    res.json({
        message: "data update succesfull"
    })
})

// delete method
app.delete("/user",(req,res)=> {
    users = {}
    res.json({message:"delete data successfully"})
})