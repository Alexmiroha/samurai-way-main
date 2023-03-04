import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";

export type filterValuesType = 'all' | 'active' | 'completed';
type TodoListType = {
    id: string,
    title: string,
    filter: string
}

type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App(): JSX.Element {

    const todoList_id1 = v1();
    const todoList_id2 = v1();
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>(
        [
            {id: todoList_id1, title: 'What To learn', filter: 'all'},
            {id: todoList_id2, title: 'What To buy', filter: 'all'},
        ]
    )

    const [tasks, setTasks] = useState<TasksStateType>(
        {
            [todoList_id1]:
                [
                    {id: v1(), title: 'HTML & CSS', isDone: true},
                    {id: v1(), title: 'ES6 & TS', isDone: true},
                    {id: v1(), title: 'REACT & REDUX', isDone: false},
                    {id: v1(), title: 'REST API', isDone: false},
                    {id: v1(), title: 'graphQL', isDone: false}
                ],
            [todoList_id2]:
                [
                    {id: v1(), title: 'Milk', isDone: true},
                    {id: v1(), title: 'Bread', isDone: true},
                    {id: v1(), title: 'Bear', isDone: false},
                    {id: v1(), title: 'Carrot', isDone: false},
                ],
        }
        )
    ;

    const removeTodolist = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId));
        delete tasks[todoListId]
    }

    const changeFilter = (value: filterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl))
    }

    const getFilteredTask = (tasks: Array<TaskType>, filter: string): Array<TaskType> => {
        let filteredTasks: Array<TaskType>;
        if (filter === 'active') {
            filteredTasks = tasks.filter(t => !t.isDone)
        } else if (filter === 'completed') {
            filteredTasks = tasks.filter(t => t.isDone)
        } else filteredTasks = tasks;
        return filteredTasks
    }

    function removeTask(taskId: string, todoListId: string) {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)
        })
    }

    function addTask(newTaskTitle: string, todoListId: string) {
        const newTask = {id: v1(), title: newTaskTitle, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    function changeTaskStatus(taskId: string, todoListId: string) {

        const task = tasks[todoListId].find(t => t.id === taskId);
        if (task) {
            task.isDone = !task.isDone
        }

        setTasks({...tasks})
    }

    return (
        <div className="App">
            <div className="TodolistContainer">

                {todoLists.map((tl) => {
                    const displayedTasks: Array<TaskType> = getFilteredTask(tasks[tl.id], tl.filter)
                    return <Todolist todoListId={tl.id}
                                     key={tl.id}
                                     title={tl.title}
                                     filter={tl.filter}
                                     task={displayedTasks}
                                     removeTodolist={removeTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeTaskStatus}
                                     currentFilter={tl.filter}
                    />
                })}
            </div>
        </div>
    );
}

export default App;
