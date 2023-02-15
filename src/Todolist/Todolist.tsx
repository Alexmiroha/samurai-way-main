import React, {FC} from "react";
import {filterValuesType} from "../App";

type TodolistPropsType = {
    title: string,
    task: Array<TaskType>,
    removeTask: (taskId: string) => void,
    changeFilter: (value: filterValuesType) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist: FC<TodolistPropsType> = (props: TodolistPropsType) : JSX.Element => {
    const taskItems: JSX.Element[] | JSX.Element = props.task.length ?
        props.task.map((task) => {
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={ () => {
                        props.removeTask(task.id)
                    } }>x</button>
                </li>)
        })
        : <div>Todolist is empty</div>

    return (
        <div className='Todolist'>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskItems}
            </ul>
            <div>
                <button onClick={() => {props.changeFilter('all')}}>All</button>
                <button onClick={() => {props.changeFilter('active')}}>Active</button>
                <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>

    );
}