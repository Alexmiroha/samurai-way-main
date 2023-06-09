import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type AddItemFormType = {
    userTextMaxLength: number;
    AddNewItemCallback: (title: string) => void
    placeholder: string
}

export const AddItemForm:FC<AddItemFormType> = memo((
    {
        userTextMaxLength,
        AddNewItemCallback,
        placeholder,
    }
) => {

    let [newInputTitle, SetNewItemTitle] = useState<string>('');
    let [error, setError] = useState<string>('')

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
        }
        else {
            SetNewItemTitle(e.currentTarget.value);
            setError('')
        }
    }
    const addItemHandler = () => {
        if (!newInputTitle.trim()) {
            setError('emptyTitle')
        }
        else if (error === 'lengthMax') {
        }
        else {
            AddNewItemCallback(newInputTitle.trim())
            SetNewItemTitle('');
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }


    const buttonDisabled = error === 'emptyTitle' || !newInputTitle || error  === 'lengthMax'
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

export default AddItemForm;
