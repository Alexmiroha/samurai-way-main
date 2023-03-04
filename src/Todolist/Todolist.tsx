import React, {ChangeEvent, KeyboardEvent, FC, useState,} from "react";
import {filterValuesType} from "../App";

export type TodolistPropsType = {
    title: string,
    filter: string,
    removeTodolist: (todoListId: string) => void,
    todoListId: string,
    task: Array<TaskType>,
    removeTask: (taskId: string, todoListId: string) => void,
    changeFilter: (value: filterValuesType, todoListId: string) => void,
    addTask: (newTaskTitle: string, todoListId: string) => void,
    changeTaskStatus: (id: string, todoListId: string) => void,
    currentFilter: string
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist: FC<TodolistPropsType> = (props: TodolistPropsType): JSX.Element => {

    const [newTaskTitle, SetNewTaskTitle] = useState<string>('');
    const [error, setError] = useState<string>('')

    const addTaskHandler = () => {
        newTaskTitle.trim() ? props.addTask(newTaskTitle.trim(), props.todoListId) : setError('error')
        SetNewTaskTitle('');
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const handlerCreator = (filter: filterValuesType) => {
        return () => props.changeFilter(filter, props.todoListId)
    }

    const onChangeStatusHandler = (id: string, todoListId: string) => {
        props.changeTaskStatus(id, todoListId)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.trim() === '') {
            setError('error')
            SetNewTaskTitle('');
        } else {
            SetNewTaskTitle(e.currentTarget.value);
            setError('')
        }
    }

    const taskItems: JSX.Element[] | JSX.Element = props.task.length ?
        props.task.map((task) => {

            return (
                <li className={task.isDone ? 'isDone' : ''} key={task.id}>
                    <input type="checkbox" checked={task.isDone}
                           onChange={() => onChangeStatusHandler(task.id, props.todoListId)}/>
                    <span>{task.title}</span>
                    <button onClick={() => {
                        props.removeTask(task.id, props.todoListId)
                    }}>x
                    </button>
                </li>)
        })
        : <div>Todolist is empty</div>

    return (
        <div className='Todolist'>
            <h3>{props.title}
                <button onClick={() => {
                    props.removeTodolist(props.todoListId)
                }}>X
                </button>
            </h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'errorInput' : ''}
                />
                <button onClick={() => {
                    addTaskHandler()
                }} disabled={error === 'error'}>+
                </button>
                {error ? <div className={error}>Title is required</div> : <div>Add your task</div>}
            </div>
            <ul>
                {taskItems}
            </ul>
            <div>
                <button className={props.currentFilter === 'all' ? 'button' : ''} onClick={
                    handlerCreator('all')
                }>All
                </button>
                <button className={props.currentFilter === 'active' ? 'button' : ''} onClick={
                    handlerCreator('active')
                }>Active
                </button>
                <button className={props.currentFilter === 'completed' ? 'button' : ''} onClick={
                    handlerCreator('completed')
                }>Completed
                </button>
            </div>
        </div>

    );
}