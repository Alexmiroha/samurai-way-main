import React, {memo, useCallback} from 'react';
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import EditableSpan from "../../EditableSpan/EditableSpan";
import ListItem from "@mui/material/ListItem";
import {TaskType} from "../Todolist";

type TaskPropsType = {
    task: TaskType,
    removeTask: (taskId: string) => void,
    changeTaskStatus: (id: string, isDone: boolean) => void,
    changeTaskTitle: (taskId: string, newTitle: string) => void,
    key: string
}

export const Task = memo((props: TaskPropsType) => {

    const removeTaskHandler = useCallback(() => {
        props.removeTask(props.task.id)
    }, [props.removeTask, props.task.id])

    const changeStatusHandler = useCallback(() => {
        props.changeTaskStatus(props.task.id, !props.task.isDone)
    }, [props.changeTaskStatus, props.task.id, props.task.isDone])

    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle)
    }, [props.changeTaskTitle, props.task.id])

    return (
        <div className={'task'}>
            <ListItem
                disablePadding
                disableGutters
                secondaryAction={
                    <IconButton
                        color={"error"}
                        onClick={
                            removeTaskHandler
                        }>
                        <DeleteIcon/>
                    </IconButton>
                }
                className={props.task.isDone ? 'isDone' : ''}
                key={props.task.id}>
                <Checkbox size={"small"}
                          color={"primary"}
                          checked={props.task.isDone}
                          onChange={changeStatusHandler}
                />
                <ListItemText>
                    <EditableSpan
                        title={props.task.title}
                        maxLength={15}
                        changeTitle={changeTaskTitleHandler}/>
                </ListItemText>

            </ListItem>
        </div>
    );
});
