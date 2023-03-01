import React, {ChangeEvent, KeyboardEvent, FC, useState,} from "react";
import {filterValuesType} from "../App";

export type TodolistPropsType = {
    title: string,
    task: Array<TaskType>,
    removeTask: (taskId: string) => void,
    changeFilter: (value: filterValuesType) => void,
    addTask: (newTaskTitle: string) => void,
    changeTaskStatus: (id: string) => void,
    curentFilter: string
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
        newTaskTitle.trim()? props.addTask(newTaskTitle.trim()) : setError('error')
        SetNewTaskTitle('');
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const onChangeStatusHandler = (id: string) => {
        props.changeTaskStatus(id)
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
                <li className={task.isDone? 'isDone' : ''} key={task.id}>
                    <input type="checkbox" checked={task.isDone} onChange={() => onChangeStatusHandler(task.id)}/>
                    <span>{task.title}</span>
                    <button onClick={() => {
                        props.removeTask(task.id)
                    }}>x
                    </button>
                </li>)
        })
        : <div>Todolist is empty</div>

    return (
        <div className='Todolist'>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error? 'errorInput' : ''}
                />
                <button onClick={() => {
                    addTaskHandler()
                }} disabled={error === 'error'}>+
                </button>
                {error? <div className={error}>Title is required</div>: <div>Add your task</div>}
            </div>
            <ul>
                {taskItems}
            </ul>
            <div>
                <button className={props.curentFilter === 'all'? 'button': ''} onClick={() => {
                    props.changeFilter('all')
                }}>All
                </button>
                <button className={props.curentFilter === 'active'? 'button': ''} onClick={() => {
                    props.changeFilter('active')
                }}>Active
                </button>
                <button className={props.curentFilter === 'completed'? 'button': ''} onClick={() => {
                    props.changeFilter('completed')
                }}>Completed
                </button>
            </div>
        </div>

    );
}