import React, {ChangeEvent, KeyboardEvent, FC, useState,} from "react";
import {filterValuesType} from "../App";
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import s from './Todolist.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

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

    const AddNewTask = (title: string) => {
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
                <ListItem
                    disablePadding
                    disableGutters
                    secondaryAction={
                        <IconButton
                            color={"error"}
                            onClick={() => {
                                props.removeTask(task.id, props.todoListId)
                            }}>
                            <DeleteIcon/>
                        </IconButton>
                    }
                    className={task.isDone ? 'isDone' : ''}
                    key={task.id}>
                    <Checkbox size={"small"}
                              color={"primary"}
                              checked={task.isDone}
                              onChange={() => onChangeStatusHandler(task.id, props.todoListId)}/>
                    <ListItemText>
                        <EditableSpan
                            title={task.title}
                            maxLength={15}
                            changeTitle={onChangeTaskTitleHandler}/>
                    </ListItemText>

                </ListItem>)
        })
        : <div>Todolist is empty</div>

    return (
        <div className='Todolist'>
            <Typography style={{display: 'flex', justifyContent: 'space-around'}} variant="h5" color="inherit" component="div">
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
                <Button variant={props.currentFilter === 'all' ? "contained" : "outlined"} size={"small"} onClick={
                    handlerCreator('all')
                }>All
                </Button>
                <Button variant={props.currentFilter === 'active' ? "contained" : "outlined"} size={"small"} onClick={
                    handlerCreator('active')
                }>Active
                </Button>
                <Button variant={props.currentFilter === 'completed' ? "contained" : "outlined"} size={"small"}
                        onClick={
                            handlerCreator('completed')
                        }>Completed
                </Button>
            </div>
        </div>

    );
}