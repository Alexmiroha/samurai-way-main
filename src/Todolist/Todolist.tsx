import React, {ChangeEvent, KeyboardEvent, FC, useState, useCallback, memo,} from "react";
import {FilterValuesType} from "../App";
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

    console.log('Todolist')

    const onAllClickHandler = useCallback( () => props.changeFilter('all', props.todoListId), [props.changeFilter, props.todoListId])
    const onActiveClickHandler = useCallback( () => props.changeFilter('active', props.todoListId), [props.changeFilter, props.todoListId])
    const onCompletedClickHandler = useCallback( () => props.changeFilter('completed', props.todoListId), [props.changeFilter, props.todoListId])

    const onChangeStatusHandler = (id: string, isDone: boolean, todoListId: string) => {
        props.changeTaskStatus(id, isDone, todoListId)
    }

    const AddNewTask = useCallback((title: string) => {
        props.addTask(title, props.todoListId)
    }, [props.addTask, props.todoListId])

    const onChangeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(title, props.todoListId)
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

    const displayedTasks: Array<TaskType> = getFilteredTask(props.tasks, props.filter)


    const taskItems: JSX.Element[] | JSX.Element = props.tasks.length ?
        displayedTasks.map((task) => {

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
                              onChange={() => onChangeStatusHandler(task.id, !task.isDone, props.todoListId)}/>
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


type ButtonWithMemoPropsType = {
    title: string,
    onClick: () => void,
    variant: "contained" | "outlined",

}

const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {
    return (
        <Button variant={props.variant} size={"small"}
                onClick={
                    props.onClick
                }>{props.title}
        </Button>)
})