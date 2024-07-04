import React, { useState, useRef, useEffect } from "react";
import edit from '../../assets/listIcons/edit.png';
import tick from '../../assets/listIcons/tick.png';
import deleteI from '../../assets/listIcons/delete.png';

function ToDoComponent({text, onDelete}){
    const [toDoVal, setToDoVal] = useState(text);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [toDisplay, setToDisplay] = useState(true);
    const inputRef = useRef(null);

    const handleDelete = () => {
        onDelete(text); 
    };

    function editTodo(){
        setIsDisabled(!isDisabled);
        setToDisplay(!toDisplay);
        if(toDisplay){
            let button1 = document.getElementById("ToDoListListEditButton");
            button1.style.display = "block";
            let button2 = document.getElementById("ToDoListListDeleteButton");
            button2.style.display = "block";
        }
        else{
            let button1 = document.getElementById("ToDoListListEditButton");
            button1.style.display = "none";
            let button2 = document.getElementById("ToDoListListDeleteButton");
            button2.style.display = "none";
        }
        
    }

    useEffect(() => {
        if (!isDisabled) {
          inputRef.current.focus();
        }
      }, [isDisabled]);
    
    function handleSave(e){
        if(e.key === 'Enter'){
            setIsDisabled(true);
            editTodo();
        }
    }

    return(
        <>
            <div id="ToDoListComponent">
                <input
                type="checkbox"
                id="ToDoListCheckbox"
                value={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                />
                <input 
                type="text" 
                className="ToDoListList" 
                value={toDoVal} 
                ref={inputRef} 
                onChange={(e) => setToDoVal(e.target.value)} 
                disabled = {isDisabled} 
                maxLength={160}
                onKeyDown={handleSave}
                style={{textDecoration: isChecked ? "line-through" : "none"}}
                />
                <button id="ToDoListListEditButton" title="Edit Task" onClick={() => editTodo()}><img src={isDisabled ? edit : tick} alt="Edit Button" id="ToDoListListEdit"/></button>
                <button id="ToDoListListDeleteButton" title="Delete Task" onClick={handleDelete}><img src={deleteI} alt="Delete Button" id="ToDoListListDelete"/></button>
            </div>
        </>
    )
}

export default ToDoComponent;