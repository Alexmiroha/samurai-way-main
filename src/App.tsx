import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist/Todolist";

function App() {

    const todoListTitle: string = 'What to learn';
    const tasks: Array<TaskType> = [
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'ES6 & TS', isDone: true},
        {id: 3, title: 'REACT & REDUX', isDone: false}
    ]

  return (
      <div className="App">
          <div className="TodolistContainer">
              <Todolist title={todoListTitle} task={tasks}/>
              <Todolist title={todoListTitle} task={tasks}/>
              <Todolist title={todoListTitle} task={tasks}/>
          </div>
      </div>
  );
}

export default App;
