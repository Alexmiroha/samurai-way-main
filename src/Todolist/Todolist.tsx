import React, {ChangeEvent, KeyboardEvent, FC, useState,} from "react";
import {filterValuesType} from "../App";
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button} from "@mui/material";

export type TodolistPropsType = {
    title: string,
    filter: string,
    removeTodolist: (todoListId: string) => void,
    todoListId: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string, todoListId: string) => void,
    changeFilter: (value: filterValuesType, todoListId: string) => void,
    changeTodolistTitle: (title: string, todoListId: string) => void,
    addTask: (newTaskTitle: string, todoListId: string) => void,
    changeTaskStatus: (id: string, todoListId: string) => void,
    changeTaskTitle: (taskId: string, todoListId: string, title: string) => void,
    currentFilter: string
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist: FC<TodolistPropsType> = (props: TodolistPropsType): JSX.Element => {

    const handlerCreator = (filter: filterValuesType) => {
        return () => props.changeFilter(filter, props.todoListId)
    }

    const onChangeStatusHandler = (id: string, todoListId: string) => {
        props.changeTaskStatus(id, todoListId)
    }

    const AddNewTask = (title:string) => {
        props.addTask(title, props.todoListId)
    }

    const onChangeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(title, props.todoListId)
    }

    const taskItems: JSX.Element[] | JSX.Element = props.tasks.length ?
        props.tasks.map((task) => {

            const onChangeTaskTitleHandler = (title: string) => {
                props.changeTaskTitle(task.id, props.todoListId, title)
            }

            return (
                <li className={task.isDone ? 'isDone' : ''} key={task.id}>
                    <input type="checkbox" checked={task.isDone}
                           onChange={() => onChangeStatusHandler(task.id, props.todoListId)}/>
                    <EditableSpan title={task.title} maxLength={15} changeTitle={onChangeTaskTitleHandler}/>
                    <button onClick={() => {
                        props.removeTask(task.id, props.todoListId)
                    }}>x
                    </button>
                </li>)
        })
        : <div>Todolist is empty</div>

    return (
        <div className='Todolist'>
            <h3>
            <EditableSpan title={props.title} maxLength={15} changeTitle={onChangeTodolistTitleHandler}/>
                <button onClick={() => {
                    props.removeTodolist(props.todoListId)
                }}>X
                </button>
            </h3>
            <AddItemForm userTextMaxLength={20} AddNewItemCallback={AddNewTask} placeholder='Task name'/>
            <ul>
                {taskItems}
            </ul>
            <div>
                <Button className={props.currentFilter === 'all' ? 'button' : ''} onClick={
                    handlerCreator('all')
                }>All
                </Button>
                <Button className={props.currentFilter === 'active' ? 'button' : ''} onClick={
                    handlerCreator('active')
                }>Active
                </Button>
                <Button className={props.currentFilter === 'completed' ? 'button' : ''} onClick={
                    handlerCreator('completed')
                }>Completed
                </Button>
            </div>
        </div>

    );
}