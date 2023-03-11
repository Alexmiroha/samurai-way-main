import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
    userTextMaxLength: number;
    AddNewItemCallback: (title: string) => void
}

const AddItemForm:FC<AddItemFormType> = (
    {
        userTextMaxLength,
        AddNewItemCallback,

    }
) => {

    let [newInputTitle, SetNewItemTitle] = useState<string>('');
    let [error, setError] = useState<string>('')

    let inputTitle = ''
    if (error === 'emptyTitle') {
        inputTitle = 'your text is empty'
    } else if (error === 'lengthMax') {
        inputTitle = 'Your text is too long'
    } else inputTitle = 'Item name'

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
    const addTaskHandler = () => {
        newInputTitle.trim() && !error ? AddNewItemCallback(newInputTitle.trim()) : setError('emptyTitle')
        SetNewItemTitle('');
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }


    const buttonDisabled = error === 'emptyTitle' || !newInputTitle
    let inputMessage = <div className={error}>{inputTitle}</div>


    return (
        <div>
            <input
                value={newInputTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'errorInput' : ''}
            />
            <button onClick={() => {
                addTaskHandler()
            }} disabled={buttonDisabled}>+
            </button>
            {inputMessage}
        </div>
    );
};

export default AddItemForm;
