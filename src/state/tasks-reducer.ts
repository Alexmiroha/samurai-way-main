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
    return {type: 'REMOVE-TASK', id: todolistId}
}

export const AddTaskAC = (newTodolistTitle: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: newTodolistTitle}
}

export const ChangeTaskTitleAC = (todolistId2: string, newTodolistTitle: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', id: todolistId2, title: newTodolistTitle}
}

export const ChangeTaskStatusAC = (todolistId2: string, newFilter: FilterValuesType): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', id: todolistId2, filter: newFilter}
}

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(tl => tl.id !== action.id)]
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            throw new Error('I dont understand this type')
    }
}