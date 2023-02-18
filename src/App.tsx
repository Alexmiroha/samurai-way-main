import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";

export type filterValuesType = 'all' | 'active' | 'completed';

function App() {

    let [tasks, setTasks] = useState(
        [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'ES6 & TS', isDone: true},
            {id: v1(), title: 'REACT & REDUX', isDone: false},
            {id: v1(), title: 'REST API', isDone: false},
            {id: v1(), title: 'graphQL', isDone: false}
        ]
    );

    let [filter, setFilter] = useState<filterValuesType>('all')

    const changeFilter = (value: filterValuesType) => {
        setFilter(value)
    }

    const getFilteredTask = (tasks: Array<TaskType>, filter: string): Array<TaskType> => {
        let filteredTasks:Array<TaskType>;
        if (filter === 'active') {
            filteredTasks = tasks.filter(t => !t.isDone)
        } else if (filter === 'completed') {
            filteredTasks = tasks.filter(t => t.isDone)
        } else  filteredTasks = tasks;
        return filteredTasks
    }

    let displayedTasks: Array<TaskType> = getFilteredTask(tasks, filter)

    function removeTask(id: string) {
        let newTasks = tasks.filter(t => t.id !== id);
        setTasks(newTasks);
    }

    function addTask(newTaskTitle: string) {
        let newTask = {id: v1(), title: newTaskTitle, isDone: false}
        setTasks([newTask, ...tasks]);
    }

    const todoListTitle: string = 'What to learn';

    return (
        <div className="App">
            <div className="TodolistContainer">
                <Todolist title={todoListTitle}
                          task={displayedTasks}
                          removeTask={removeTask}
                          changeFilter={changeFilter}
                          addTask={addTask}
                />
            </div>
        </div>
    );
}

export default App;
