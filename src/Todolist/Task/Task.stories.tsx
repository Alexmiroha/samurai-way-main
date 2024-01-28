import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Task} from './Task';
import {useState} from "react";

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
        removeTask: action('Remove Button clicked changed inside Task'),
        task: {id: '1111', title: 'JS', isDone: false},
        key: '12wsdewfijdei'
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsNotDoneStory: Story = {
    args: {
        task: {id: '3333', title: 'HTML', isDone: false},
    },
};

export const TaskIsDoneStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        task: {id: '2222', title: 'CSS', isDone: true},
    },
};

const TaskToggle = () => {

    const [task, setTask] = useState({id: 'qwrfsdtsdt', title: 'JS', isDone: true})

    return <Task
        task={task}
        removeTask={action('removeTask')}
        changeTaskStatus={() => setTask({...task, isDone: !task.isDone})}
        changeTaskTitle={(taskId, newTitle) => setTask({...task, title: newTitle})}
        key={task.id}/>
}

export const TaskToggleStory: Story = {
    render: () => <TaskToggle/>
};

// 2:05:40