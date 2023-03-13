import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm/AddItemForm";

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
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>(
        [
            {id: todoList_id1, title: 'What To buy', filter: 'all'},
        ]
    )

    const [tasks, setTasks] = useState<TasksStateType>(
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
        let newTodolistId = v1()
        let newTodolist:TodoListType = {id: newTodolistId, title: title, filter: 'all'}
        setTodoLists([newTodolist, ...todoLists])
        setTasks({
            ...tasks, [newTodolistId]: []
        })
    }

    const removeTodolist = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId));
        delete tasks[todoListId]
    }

    const changeFilter = (value: filterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl))
    }

    const changeTodolistTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title}: tl))
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

    function changeTaskTitle(taskId: string, todoListId: string, title: string) {
        const task = tasks[todoListId].find(t => t.id === taskId);
        if (task) {
            task.title = title
        }
        setTasks({...tasks})
    }

    return (
        <div className="App">
            <div className="TodolistContainer">
            <AddItemForm userTextMaxLength={15} AddNewItemCallback={AddTodolist} placeholder='Todolist name'/>
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
