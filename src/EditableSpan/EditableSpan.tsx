import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import s from './EditableSpan.module.css'
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string,
    maxLength: number,
    changeTitle: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = memo((
    {
        title,
        maxLength,
        changeTitle
    }
) => {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [localTitle, setLocalTitle] = useState<string>(title);
    let [error, setError] = useState<string>('');

    let onSpanClick = () => {
        setEditMode(true)
    };

    const onChangeHandler = () => {
        if (error === 'emptyTitle') {
            setLocalTitle(title)
            changeTitle(title)
        } else if (error === 'longTitle') {
            setLocalTitle(localTitle.slice(0, maxLength))
            changeTitle(localTitle.slice(0, maxLength))
        } else changeTitle(localTitle)
        setEditMode(false)
    }

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (localTitle.length >= maxLength) {
            setError('longTitle');
            setLocalTitle(e.currentTarget.value)
        } else if (!e.currentTarget.value.trim()) {
            setError('emptyTitle')
            setLocalTitle(e.currentTarget.value)
        } else {
            setLocalTitle(e.currentTarget.value)
            setError('')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onChangeHandler()
        }
    }

    return (
        <>
            {editMode ? <TextField style={{marginBottom: '10px'}} variant={"standard"} size={"small"} value={localTitle} label={'Item name'} error={!!error} onChange={changeLocalTitle} autoFocus={true} onBlur={onChangeHandler} onKeyPress={onKeyPressHandler} type="text"/> :
                <span onClick={onSpanClick}>{title}</span>}
        </>
    );
},);

export default EditableSpan;
