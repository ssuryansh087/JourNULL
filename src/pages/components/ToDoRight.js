import React, { useState } from "react";
import ToDoComponent from "./ToDoComponent";
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

function ToDoRight(){
    const title = useSelector(state => state.title);
    const [todos, setTodos] = useState([]);
    const [inputVal, setInputVal] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    if(title !== 'The JourNULL'){
        setLoggedIn(true);
    }

    function handleAddTodo(){
        //if(loggedIn === false){
        //    let dialog = document.getElementById('SignInFirstDialog');
        //    dialog.showModal();
        //}
        //else{
            if(inputVal.trim() !== ''){
                setTodos([...todos, inputVal]);
                setInputVal('');
        //    }
        }
    }

    const handleDeleteTodo = (todoText) => {
        const updatedTodos = todos.filter(todo => todo !== todoText);
        setTodos(updatedTodos);
    };

    function handleKey(e){
        if(e.key === 'Enter'){
            handleAddTodo();
        }
    }

    function closeDialog(){
        let dialog = document.getElementById('SignInFirstDialog');
        dialog.close();
    }

    return(
        <>
        <div id="ToDoRightPanel">
            <div style={{width: "100%", display: "flex"}}>
                <input 
                type="text" 
                id="ToDoListInput"  
                placeholder="Enter Task..." 
                value={inputVal} 
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKey}
                />
                <button id="ToDoListInputButton" onClick={() => handleAddTodo()}>Add</button>
            </div>
            <div style={{display: todos.length === 0 ? "flex" : "none", justifyContent: "center", height: "75vh", alignItems: "center", fontFamily: "Karla", fontSize: "200%"}}>
                Your Tasks Appear Here!
            </div>
            <div style={{maxHeight: "76vh", overflowY: "auto"}}>
            {todos.map((todo, index) => (
                <ToDoComponent key={index} text={todo} onDelete={handleDeleteTodo} />
            ))}
            </div>
        </div>
            <dialog id="SignInFirstDialog">
                <button onClick={closeDialog} style={{position: "absolute", cursor: "pointer", backgroundColor: "white", border: "none", fontSize: "200%", left: '93%', top: '0%'}}>X</button>
                <h1 id='PleaseSign'>Please Sign In to your Account to Continue.</h1>
                <button id="SignInFirstButton" onClick={() => navigate('/Account')}>Sign In</button>
                <p id="NewHereSignUp">New Here? <Link to='/Sign-Up' id="NewHereCreateAccount">Create Account</Link></p>
            </dialog>
        </>
    )
}

export default ToDoRight;