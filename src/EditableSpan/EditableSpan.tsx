import React, {ChangeEvent, FC, useState} from 'react';

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
    let [localTitle, setLocalTitle] = useState<string>(title)
    let onSpanClick = () => {
        setEditMode(true)
    };
    let onInputBlur = () => {
        setEditMode(false)
        changeTitle(localTitle);
    }
    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }

    return (
        <>
            {editMode ? <input value={localTitle} onChange={changeLocalTitle} autoFocus={true} onBlur={onInputBlur} type="text"/> :
                <span onClick={onSpanClick}>{title}</span>}
        </>
    );
};

export default EditableSpan;
