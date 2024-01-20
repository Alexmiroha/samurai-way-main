import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm, AddItemFormType} from './AddItemForm';
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {number} from "prop-types";

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// @ts-ignore
const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    // More on argTypes:
    // https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        AddNewItemCallback: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AddItemFormStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args

};

const ErrorAddItemForm: FC<AddItemFormType> = memo((
    {
        userTextMaxLength,
        AddNewItemCallback,
        placeholder,
    }
) => {

    let [newInputTitle, SetNewItemTitle] = useState<string>('');
    let [error, setError] = useState<string>('your text is empty')

    let inputTitle = ''
    if (error === 'emptyTitle') {
        inputTitle = 'your text is empty'
    } else if (error === 'lengthMax') {
        inputTitle = 'Your text is too long'
    } else inputTitle = ''

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.trim() === '') {
            setError('emptyTitle')
            SetNewItemTitle('');
        } else if (newInputTitle.length > userTextMaxLength) {
            setError('lengthMax')
            SetNewItemTitle(e.currentTarget.value)
        } else {
            SetNewItemTitle(e.currentTarget.value);
            setError('')
        }
    }
    const addItemHandler = () => {
        if (!newInputTitle.trim()) {
            setError('emptyTitle')
        } else if (error === 'lengthMax') {
        } else {
            AddNewItemCallback(newInputTitle.trim())
            SetNewItemTitle('');
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }


    const buttonDisabled = error === 'emptyTitle' || !newInputTitle || error === 'lengthMax'
    let inputMessage = <div className={error}>{inputTitle}</div>


    return (
        <div className={'AddItemForm'}>
            <TextField
                size={"small"}
                variant={"outlined"}
                label={inputMessage}
                error={!!error}
                value={newInputTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                placeholder={placeholder}
            />
            <Button variant={"contained"} size={"large"} onClick={() => {
                addItemHandler()
            }} disabled={buttonDisabled} color={"primary"}>
                <AddIcon/>
            </Button>
        </div>
    );
});

export const ErrorAddItemFormStory: Story = {
    render: () => <ErrorAddItemForm userTextMaxLength={15} AddNewItemCallback={title => title} placeholder={''}/>

};