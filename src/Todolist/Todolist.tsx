import React, {FC} from "react";

type TodolistPropsType = {
    title: string,
    task: Array<TaskType>
}

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

export const Todolist: FC<TodolistPropsType> = (props: TodolistPropsType) : JSX.Element => {
    const taskItems: JSX.Element[] | JSX.Element = props.task.length ?
        props.task.map((task) => {
            return (
                <li>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>

    );
}