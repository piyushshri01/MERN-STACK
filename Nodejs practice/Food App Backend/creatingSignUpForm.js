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

users = [
    {
        id: 1,
        name:"Aaaaaa"
    },
    {
        id: 2,
        name:"Bbbbbb"
    },
    {
        id: 3,
        name:"Cccccc"
    }
]
// Mounting (we can say mini app)
const userRouter = express.Router()
const authRouter = express.Router()
// Base route
app.use("/user",userRouter)
app.use("/auth", authRouter)

userRouter
.route("/")
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route("/:id")
.get(getUserById)

authRouter
.route("/signup")
.get(getSignUp)
.post(postSignUp)


function getUser(req, res) {
    res.send(users)
}

function postUser(req, res){
    console.log(req.body);
    users = req.body
    res.json({
        message: "send data successfully",
        user:req.body
    })
}

function updateUser(req, res){
    console.log("req.body =>",req.body);
    // update data in users obj
    let dataToBeUpdated = req.body
    for (key in dataToBeUpdated){
        users[key] = dataToBeUpdated[key]
    }
    res.json({
        message: "data update succesfull"
    })
}

function deleteUser(req,res){
    users = {}
    res.json({message:"delete data successfully"})
}

function getUserById(req, res){
    console.log(req.params.id);
    let paramId = req.params.id
    let obj = {}
    for (let i = 0; i<users.length; i++){
        if(users[i]["id"] == paramId){
            obj = users[i]
        }
    }
    res.json({
        messsage:"req received",
        data:obj
    })
}

function getSignUp(req,res){
    res.sendFile('/public/index.html', {root: __dirname})
}

function postSignUp(req, res){
    let dataObj = req.body;
    console.log("backend", dataObj);
    res.json({
        message: "user signed up",
        data: dataObj
    })

}