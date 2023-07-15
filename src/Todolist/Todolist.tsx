import React, {FC, memo, useCallback,} from "react";
import {FilterValuesType} from "../App";
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import s from './Todolist.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import {ButtonWithMemo, ButtonWithMemoPropsType} from "./ButtonWithMemo";
import {Task} from "./Task/Task";

export type TodolistPropsType = {
    title: string,
    filter: string,
    removeTodolist: (todoListId: string) => void,
    todoListId: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string, todoListId: string) => void,
    changeFilter: (value: FilterValuesType, todoListId: string) => void,
    changeTodolistTitle: (title: string, todoListId: string) => void,
    addTask: (newTaskTitle: string, todoListId: string) => void,
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void,
    changeTaskTitle: (taskId: string, todoListId: string, title: string) => void,
    currentFilter: string
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist: FC<TodolistPropsType> = memo((props: TodolistPropsType): JSX.Element => {

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todoListId), [props.changeFilter, props.todoListId])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todoListId), [props.changeFilter, props.todoListId])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todoListId), [props.changeFilter, props.todoListId])

    const removeTask = useCallback((taskId: string) => {
        props.removeTask(taskId, props.todoListId)
    },[props.removeTask, props.todoListId])

    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) => {
        props.changeTaskStatus(taskId, isDone, props.todoListId)
    }, [props.changeTaskStatus, props.todoListId])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string) => {
        props.changeTaskTitle(taskId, props.todoListId, newTitle)
    }, [props.changeTaskTitle, props.todoListId])

    const AddNewTask = useCallback((title: string) => {
        props.addTask(title, props.todoListId)
    }, [props.addTask, props.todoListId])

    const onChangeTodolistTitleHandler = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.todoListId)
    }, [props.changeTodolistTitle, props.todoListId])

    const getFilteredTask = (tasks: Array<TaskType>, filter: string): Array<TaskType> => {
        let filteredTasks: Array<TaskType>;
        if (filter === 'active') {
            filteredTasks = tasks.filter(t => !t.isDone)
        } else if (filter === 'completed') {
            filteredTasks = tasks.filter(t => t.isDone)
        } else filteredTasks = tasks;
        return filteredTasks
    }

    const displayedTasks: Array<TaskType> = getFilteredTask(props.tasks, props.filter)


    const taskItems: JSX.Element[] | JSX.Element = props.tasks.length ?
        displayedTasks.map((task) => {
            return (
                <Task key={task.id} task={task} changeTaskTitle={changeTaskTitle}
                      changeTaskStatus={changeTaskStatus} removeTask={removeTask}/>)
        })
        : <div>Todolist is empty</div>

    return (
        <div className='Todolist'>
            <Typography style={{display: 'flex', justifyContent: 'space-around'}} variant="h5" color="inherit"
                        component="div">
                <EditableSpan title={props.title} maxLength={15} changeTitle={onChangeTodolistTitleHandler}/>
                <IconButton color={"error"} size={"small"} onClick={() => {
                    props.removeTodolist(props.todoListId)
                }}>
                    <DeleteIcon/>
                </IconButton>
            </Typography>
            <AddItemForm userTextMaxLength={20} AddNewItemCallback={AddNewTask} placeholder='Task name'/>
            <List>
                {taskItems}
            </List>
            <div className={s.filterButtonsContainer}>
                <ButtonWithMemo title={'All'}
                                variant={props.currentFilter === 'all' ? "contained" : "outlined"}
                                onClick={onAllClickHandler}
                />
                <ButtonWithMemo title={'Active'}
                                variant={props.currentFilter === 'active' ? "contained" : "outlined"}
                                onClick={onActiveClickHandler}
                />
                <ButtonWithMemo title={'Completed'}
                                variant={props.currentFilter === 'completed' ? "contained" : "outlined"}
                                onClick={onCompletedClickHandler}
                />
            </div>
        </div>

    );
})