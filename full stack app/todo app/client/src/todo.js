import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "./loginSignup/contextApi/contextApi";
const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [nxtId, setNxtId] = useState(2);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(userContext);
  const getTasks = async () => {
    let token = localStorage.getItem("todoToken");
    console.log(token);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`
        }
      };
      const response = await fetch(
        "https://todo-api-main-server.vercel.app/getTasks",
        config
      );
      // console.log(await response.json(), "responsse");
      let data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async () => {
    let token = localStorage.getItem("todoToken");
    try {
      const response = await axios.post(
        "https://todo-api-main-server.vercel.app/createTask",
        {
          title: newTask,
          token
        },
        {
          headers: {
            "x-access-token": `${localStorage.getItem("todoToken")}`
          }
        }
      );
      // console.log(response.data, "response");

      setTasks([...tasks, response.data["data"]]);
      setNxtId(nxtId + 1);
      setNewTask("");
    } catch (error) {
      console.log(error);
    }
  };

  const removeTask = async (id) => {
    try {
      let token = localStorage.getItem("todoToken");
      // console.log(token, "token");

      if (token) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`
          }
        };
        const res = await fetch(
          `https://todo-api-main-server.vercel.app/removeTask/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ token })
          }
        );
        // console.log(await res.json(), "res");
        getTasks();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const editTask = async (id, title) => {
    const new_title = title;
    try {
      let token = localStorage.getItem("todoToken");

      const res = await fetch(
        `https://todo-api-main-server.vercel.app/editTask/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ token, new_title })
        }
      );

      console.log(id, title);
      console.log(res, "res");

      const updatedTasks = tasks.map((task) => {
        if (task._id === id) {
          task.title = title;
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);
  // console.log(tasks, "tasks");

  return (
    <div className="container">
      <h1>To Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={createTask}>Add</button>
      </div>
      <div className="tasks-container">
        {tasks.length &&
          tasks.map((task) => (
            <div key={task._id} className="task">
              <span>{task.title}</span>
              <button
                onClick={() =>
                  editTask(task._id, prompt("Enter new task", task.title))
                }
              >
                Edit
              </button>
              <button onClick={() => removeTask(task._id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ToDoList;