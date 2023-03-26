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
    try {
      const response = await axios.get(
        "https://todolist-api-henna.vercel.app/getTasks"
      );
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async () => {
    try {
      const response = await axios.post(
        "https://todolist-api-henna.vercel.app/createTask",
        {
          title: newTask,
          id: nxtId
        }
      );

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
      console.log(token, "token");

      if (token) {
        const res = await fetch(
          `https://todolist-api-henna.vercel.app/removeTask/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ token })
          }
        );
        setTasks(await res.json());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (id, title) => {
    try {
      const res = await axios.put(
        `https://todolist-api-henna.vercel.app/editTask/${id}`,
        { title }
      );
      console.log(id, title);
      console.log(res, "res");

      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
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
            <div key={task.id} className="task">
              <span>{task.title}</span>
              <button
                onClick={() =>
                  editTask(task.id, prompt("Enter new task", task.title))
                }
              >
                Edit
              </button>
              <button onClick={() => removeTask(task.id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ToDoList;
