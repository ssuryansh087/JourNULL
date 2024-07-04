import React, { useState } from "react";
import firebase from '../../database/firebaseConfig';
import 'firebase/compat/firestore';
import '../styles/ToDo.css';
import ListComponent from './ListComponent';
import down from '../../assets/listIcons/down.png';
import up from '../../assets/listIcons/up.png';
import shopping from '../../assets/listIcons/shopping.png';
import book from '../../assets/listIcons/book.png';
import toDo from '../../assets/listIcons/toDo.png';
import { nanoid } from 'nanoid';
import { useSelector } from "react-redux";

function ToDoLeft(){
    //const userID = useSelector(state => state.userID);
    const [lists, setLists] = useState([]);
    const [downArrowIMG, setDownArrowIMG] = useState(down);
    const [selectedIcon, setSelectedIcon] = useState(toDo);
    const [switchIcon1, setSwitchIcon1] = useState(shopping);
    const [switchIcon2, setSwitchIcon2] = useState(book);
    const [listName, setListName] = useState('My List');
    const [dynamicIcon, setDynamicIcon] = useState('todo');
    var indexToDel;

    const addListServer = async(e) => {
        try{
            
            const listObj = {
                ListIcon: dynamicIcon,
                ListName: listName,
                List: []
            }
            const list = nanoid();
            firebase.firestore().collection('Lists').doc(list).set(listObj);
            firebase.firestore().collection('Users').doc(userID).update({
                lists: [...list]
            });
        }
        catch(error){
            alert(error.message);
        }
    }

    const addList = (list) => {
        setLists([...lists, list]);
    };

    function editDropdown(){
        let dropMenu = document.getElementById("CreateIconDropMenu");
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
        let dialog = document.getElementById("CreateDialog");
        dialog.close();
    }

    function setListValues(){
        setDynamicIcon(selectedIcon);
        if(selectedIcon === toDo){
            setDynamicIcon('todo');
        }
        else if(selectedIcon === shopping){
            setDynamicIcon('shopping');
        }
        else if(selectedIcon === book){
            setDynamicIcon('book');
        }
        addList({listName, dynamicIcon});
        console.log(listName);
        addListServer();
        dialogClose();
    }

    function openDialog(){
        let dialog = document.getElementById("CreateDialog");
        dialog.showModal();
    }

    const deleteList = (indexToDelete) => {
        let dialog = document.getElementById("AreYouSureDialog");
        dialog.showModal();
        indexToDel = indexToDelete;
    };

    const exitSureDialog = () => {
        pleaseDelete(indexToDel);
        let dialog = document.getElementById("AreYouSureDialog");
        dialog.close();
    }

    const pleaseDelete = (indexToDelete) => {
        setLists(lists.filter((_, index) => index !== indexToDelete));
    }

    const closeSureDialog = () => {
        let dialog = document.getElementById("AreYouSureDialog");
        dialog.close();
    }

    return(
        <>
        <div id="ToDoLeftPanel">
            <h2 id="ToDoYourLists">Your Lists</h2>
            <hr style={{color: "whitesmoke"}}/>
            <div>
                {lists.map((list, index) => (
                    <ListComponent key = {index} listN = {list.listName} listI = {list.dynamicIcon} onDelete={() => deleteList(index)}/>
                ))}
            </div>
            <button id="CreateNewListButton" onClick={openDialog}>Create New List</button>
            <dialog id="CreateDialog">
                <h1 id="EditDialogHeader">Create a List</h1>
                <hr style={{color: "black"}}/>  
                
                <div id="EditIconDropDiv">
                    <button id="EditIconButton" onClick={() => editDropdown()}>
                    <div id="EditIconDropdown">
                        <img src={selectedIcon} alt="To Do Icon" id="EditIconIcon"/>
                        <img src={downArrowIMG} alt="Down Arrow" id="EditIconDown"/>
                    </div>
                    <div id="CreateIconDropMenu">
                        <button className="CreateIconIconButtons" onClick={() => onSelectIcon(switchIcon1)}><img src={switchIcon1} alt="Shopping Icon" className="EditIconIcons"/></button>
                        <button className="CreateIconIconButtons" onClick={() => onSelectIcon(switchIcon2)}><img src={switchIcon2} alt="Book Icon" className="EditIconIcons"/></button>
                    </div>
                    </button>
                </div>
                <input type="text" id="EditDialogTextInput" value={listName} onChange={(e) => setListName(e.target.value)} maxLength={16}/>
                <button id="EditDialogSave" onClick={() => setListValues()}>Save</button>
                <button id="EditDialogExit" onClick={() => dialogClose()}>Exit</button>
            </dialog>
            <dialog id="AreYouSureDialog">
                <h1 id="AreYouSureText">Are you sure you want to delete this List?</h1>
                <button id="YesSureButton" onClick={() => exitSureDialog()}>Yes, delete</button>
                <button id="NoSureButton" onClick={() => closeSureDialog()}>No, go back</button>
            </dialog>
        </div>
        </>
    )
}

export default ToDoLeft;