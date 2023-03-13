import React, {ChangeEvent, FC, useState} from 'react';
import s from './EditableSpan.module.css'

type EditableSpanPropsType = {
    title: string,
    maxLength: number,
    changeTitle: (title: string) => void
}

const EditableSpan: FC<EditableSpanPropsType> = (
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

    const onInputBlur = () => {
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

    return (
        <>
            {editMode ? <input className={error? s.error : s.input} value={localTitle} onChange={changeLocalTitle} autoFocus={true} onBlur={onInputBlur} type="text"/> :
                <span onClick={onSpanClick}>{title}</span>}
        </>
    );
};

export default EditableSpan;
