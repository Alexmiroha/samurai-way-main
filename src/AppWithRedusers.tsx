import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm/AddItemForm";
import {AppBar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Menu} from "@mui/icons-material";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListType = {
    id: string,
    title: string,
    filter: string
}

export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App(): JSX.Element {

    const todoList_id1 = v1();
    const [todoLists, dispatchToTodoListsReduser] = useReducer(todolistsReducer,
        [
            {id: todoList_id1, title: 'What To buy', filter: 'all'},
        ]
    )

    const [tasks, dispatchToTasksReduser] = useReducer(tasksReducer,
        {
            [todoList_id1]:
                [
                    {id: v1(), title: 'Milk', isDone: true},
                    {id: v1(), title: 'Bread', isDone: true},
                    {id: v1(), title: 'Bear', isDone: false},
                    {id: v1(), title: 'Carrot', isDone: false},
                ],
        }
        )
    ;

    const AddTodolist = (title:string) => {
        let action = AddTodolistAC(title)
        dispatchToTodoListsReduser(action)
        dispatchToTasksReduser(action)
    }

    const removeTodolist = (todoListId: string) => {
        let action = RemoveTodolistAC(todoListId)
        dispatchToTodoListsReduser(action)
    }

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let action = ChangeTodolistFilterAC(todoListId, value)
        dispatchToTodoListsReduser(action)
    }

    const changeTodolistTitle = (title: string, todoListId: string) => {
        let action = ChangeTodolistTitleAC(todoListId, title)
        dispatchToTodoListsReduser(action)
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
        let action = RemoveTaskAC(taskId, todoListId)
        dispatchToTasksReduser(action)
    }

    function addTask(newTaskTitle: string, todoListId: string) {
        let action = AddTaskAC(newTaskTitle, todoListId)
        dispatchToTasksReduser(action)
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        let action = ChangeTaskStatusAC(taskId, isDone, todoListId)
        dispatchToTasksReduser(action)
    }

    function changeTaskTitle(taskId: string, todoListId: string, title: string) {
        let action = ChangeTaskTitleAC(taskId, todoListId, title)
        dispatchToTasksReduser(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Todolist
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className="TodolistContainer">
                <Typography style={{marginTop: "18px", marginBottom: '10px'}} variant="h5" color="inherit" component="div">
                    Add New List
                    <AddItemForm userTextMaxLength={15} AddNewItemCallback={AddTodolist} placeholder='Todolist name'/>
                </Typography>

                {todoLists.map((tl) => {
                    const displayedTasks: Array<TaskType> = getFilteredTask(tasks[tl.id], tl.filter)
                    return <Todolist todoListId={tl.id}
                                     key={tl.id}
                                     title={tl.title}
                                     filter={tl.filter}
                                     tasks={displayedTasks}
                                     removeTodolist={removeTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     changeTodolistTitle={changeTodolistTitle}
                                     addTask={addTask}
                                     changeTaskStatus={changeTaskStatus}
                                     changeTaskTitle={changeTaskTitle}
                                     currentFilter={tl.filter}
                    />
                })}
            </div>
        </div>
    );
}

export default App;
