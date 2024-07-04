import React, { useState } from "react";
import toDo from '../../assets/listIcons/toDo.png';
import edit from '../../assets/listIcons/edit.png';
import down from '../../assets/listIcons/down.png';
import up from '../../assets/listIcons/up.png';
import shopping from '../../assets/listIcons/shopping.png';
import book from '../../assets/listIcons/book.png';
import deleteIcon from '../../assets/listIcons/delete.png';

function ListComponent(props){
    var listI;
    if(props.listI === 'todo'){
        listI = toDo;
    }
    else if(props.listI === 'shopping'){
        listI = shopping;
    }
    else if(props.listI === 'book'){
        listI = book;
    }
    
    const [downArrowIMG, setDownArrowIMG] = useState(down);
    const [selectedIcon, setSelectedIcon] = useState(listI);
    const [switchIcon1, setSwitchIcon1] = useState(shopping);
    const [switchIcon2, setSwitchIcon2] = useState(book);
    const [listName, setListName] = useState(props.listN);
    const [dynamicName, setDynamicName] = useState(props.listN);
    const [dynamicIcon, setDynamicIcon] = useState(listI);

    function openEditDialog(){
        let dialog = document.getElementById("EditDialog");
        dialog.showModal();
    }

    function editDropdown(){
        let dropMenu = document.getElementById("EditIconDropMenu");
        if(downArrowIMG === down){
            setDownArrowIMG(up);
            dropMenu.style.display = 'block';
        }
        else{
            setDownArrowIMG(down);
            dropMenu.style.display = 'none';
        }
    }

    function onSelectIcon(icon){
        setSelectedIcon(icon);
        if(icon === shopping){
            setSwitchIcon1(toDo);
            setSwitchIcon2(book);
        }
        if(icon === book){
            setSwitchIcon1(shopping);
            setSwitchIcon2(toDo);
        }
        if(icon === toDo){
            setSwitchIcon1(shopping);
            setSwitchIcon2(book);
        }
    }

    function dialogClose(){
        let dialog = document.getElementById("EditDialog");
        dialog.close();
    }

    function setListValues(){
        setDynamicName(listName);
        setDynamicIcon(selectedIcon);
        dialogClose();
    }
    
    return(
        <div id="ListComponentDiv">
            <div id="ListComponent">
                <img src={dynamicIcon} id="ListIcon" alt="To Do Icon"/>
                <p id="ListText">{dynamicName}</p>
                <button id="EditButton" onClick={openEditDialog}><img src={edit} id="EditIcon" alt="Edit Icon"/></button>
                <button id="DeleteButton" onClick={props.onDelete}><img src={deleteIcon} id="DeleteIcon" alt="Delete Icon"/></button>                
            </div>
            <dialog id="EditDialog">
                <h1 id="EditDialogHeader">Edit List Properties</h1>
                <hr style={{color: "black"}}/>  
                
                <div id="EditIconDropDiv">
                    <button id="EditIconButton" onClick={editDropdown}>
                    <div id="EditIconDropdown">
                        <img src={selectedIcon} alt="To Do Icon" id="EditIconIcon"/>
                        <img src={downArrowIMG} alt="Down Arrow" id="EditIconDown"/>
                    </div>
                    <div id="EditIconDropMenu">
                        <button className="EditIconIconButtons" onClick={() => onSelectIcon(switchIcon1)}><img src={switchIcon1} alt="Shopping Icon" className="EditIconIcons"/></button>
                        <button className="EditIconIconButtons" onClick={() => onSelectIcon(switchIcon2)}><img src={switchIcon2} alt="Book Icon" className="EditIconIcons"/></button>
                    </div>
                    </button>
                </div>
                <input type="text" id="EditDialogTextInput" value={listName} onChange={(e) => setListName(e.target.value)} maxLength={16}/>
                <button id="EditDialogSave" onClick={() => setListValues()}>Save</button>
                <button id="EditDialogExit" onClick={() => dialogClose()}>Exit</button>
            </dialog>
        </div>
    )
}

export default ListComponent;