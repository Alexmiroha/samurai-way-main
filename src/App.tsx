import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist/Todolist";

function App() {

    let [tasks, setTasks] = useState(
        [
            {id: 1, title: 'HTML & CSS', isDone: true},
            {id: 2, title: 'ES6 & TS', isDone: true},
            {id: 3, title: 'REACT & REDUX', isDone: false},
            {id: 4, title: 'REST API', isDone: false},
            {id: 5, title: 'graphQL', isDone: false}
        ]
    );
    
    function removeTask(id: number) {
        let newTasks = tasks.filter(t => t.id != id);
        setTasks(newTasks);
    }

    const todoListTitle: string = 'What to learn';

    return (
        <div className="App">
            <div className="TodolistContainer">
                <Todolist title={todoListTitle} task={tasks} removeTask={removeTask}/>
            </div>
        </div>
    );
}

export default App;
