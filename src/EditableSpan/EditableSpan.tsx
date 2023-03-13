import React, {FC, useState} from 'react';

type EditableSpanPropsType = {
    title: string,
    maxLength: number,
    changeTitle: (title: string) => void
}

const EditableSpan: FC<EditableSpanPropsType> = (
    {title,
    maxLength,
    changeTitle,
    }
) => {

    let [editMode, setEditMode] = useState<boolean>(false);
    let onSpanClick = () => {
        setEditMode(true)
    };
    let onInputBlur = () => {
        setEditMode(false)
    }

    return (
        <>
            {editMode ? <input value={title} autoFocus={true} onBlur={onInputBlur} type="text"/> :
                <span onClick={onSpanClick}>{title}</span>}
        </>
    );
};

export default EditableSpan;
