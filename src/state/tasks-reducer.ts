import {TasksStateType} from "../App";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todoListId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todoListId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    todoListId: string,
    title: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string,
    todoListId: string
}

type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskTitleActionType | ChangeTaskStatusActionType

export const RemoveTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todoListId}
}

export const AddTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todoListId}
}

export const ChangeTaskTitleAC = (taskId: string, todoListId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, todoListId, title}
}

export const ChangeTaskStatusAC = (taskId: string, todoListId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, todoListId}
}

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            const stateCopy = {...state}
            // const tasks = state[action.todoListId]
            // const filteredTasks = tasks.filter(t => action.taskId !== t.id);
            // stateCopy[action.todoListId] = filteredTasks;
            stateCopy[action.todoListId] = state[action.todoListId].filter(t => action.taskId !== t.id)
            return stateCopy
        case 'ADD-TASK':

            return stateCopy
        case 'CHANGE-TASK-TITLE':

            return stateCopy
        case 'CHANGE-TASK-STATUS':

            return stateCopy
        default:
            return state
    }
}