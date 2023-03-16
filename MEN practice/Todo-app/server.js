const express = require("express")
const bodyParser = require('body-parser');
let cors = require('cors')
let jwt = require('jsonwebtoken');
let verifiy = require("./middleware")
const app = express()

const PORT = 3000;
app.use(
    cors({
      origin: "https://ibuo51.csb.app/",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

// for encoded from
app.use(bodyParser.urlencoded({extended:true}));
// for json data
app.use(bodyParser.json());


let users = []
// create a profile
app.get("/", (req, res)=> {
    res.send("Hello Friends")
})

app.post('/api/v1/signup', (req, res)=>{
    let data = req.body
    let message = "user registered successfully"
    let flag = false
    for(let i = 0; i < users.length; i++){
        if(users[i].email === data.email){
            message = "user registered already please login"
            flag = true
        }
    }
    !flag ? users.push(data) : {}
    res.json({
        message,
        data: flag ? {} : data
    });
});

// login
app.post('/api/v1/login', (req, res)=>{
    // console.log(users)
    let {email, password} = req.body
    let message = "user not registered"
    let flag = false
    for(let i = 0; i < users.length; i++){
        if(users[i].email === email){
            if(users[i].password === password){
                message = "user logged in successfully"
                flag = true
                break
            }
        }
    }
    let token = jwt.sign({ email }, 'xyz');
    res.json({
        message,
        data: flag ? {email, password} : {},
        token: flag ? token: null
    });
});


let todos = [{1:1, "title":"hello"}, {2:2, "title":"hello world"}]
// create a task
app.post('/api/v1/createTask',verifiy, (req, res)=> {
    const {id, title} = req.body
    const data = {id, title}
    todos.push(data)
    res.json({
        message: "task added successfully",
        data
    })

})

// get all task
app.get('/api/v1/getAllTask',verifiy, (req, res)=> {
    res.json({
        message: "all tasks",
        todos
    })
})

// update a task
app.put('/api/v1/updateTask/:id', (req, res)=> {
    const {id} = req.params
    const {title} = req.body
    todos.forEach((item)=> {
        if(item.id === id){
            item.title = title
        }
    })
    res.json({
        message:"task updated successfully",
        todos
    })
})

// remove a task
app.delete('/api/v1/removeTask/:id', (req, res)=> {
    const {id} = req.params
    todos = todos.filter((item)=> item.id !== id)
    res.json({
        message:"task updated successfully",
        todos
    })
})
  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running,and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);