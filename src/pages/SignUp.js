import firebase from '../database/firebaseConfig.js';
import 'firebase/compat/firestore';
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import './styles/SignUp.css';
import logo from '../assets/finalLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userUpdate, userIDUpdate } from '../features/userSlice.js';

function SignUp(){
    let [buttonText, setButtonText] = useState('Show');
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const HandleClick = () =>{
        setButtonText(showPassword === true ? 'Show' : 'Hide');
        setShowPassword((prev) => !prev)
    }

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
      e.preventDefault();
      const myData = {
        username: username,
        email: email,
        lists: []
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            firebase.firestore().collection('Users').doc(user.uid).set(myData);
            alert("Account Created Successfully!");
            dispatch(userUpdate(username));
            dispatch(userIDUpdate(user.uid));
            navigate('/');
        })
        .catch((error) => {
            setErrorMessage(error.message);
            alert(errorMessage);
        });
    };  

    return(
        <>
        <NavBar />
        <div id="SignUpPage">
            <div id='SignUpLeft'>
                <img src={logo} id='SignUpLogo' alt='JourNULL Logo'/>
                <p id='SignInNewHere'>Already a Member?</p>
                <p id='SignInAD'>Sign In and and continue your Journey with The JourNULL!</p>
                <Link to="/Account"><button id='SignInButton'>Sign In</button></Link>
            </div>  
            <div id="SignUpRight">
                <p className='SignInPageStars'>&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                <p id="SignUpCreateAccount">Create Account</p>
                <form onSubmit={handleRegister}>
                    <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} name='username' required id='SignUpUsernameInput'/>
                    
                    <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} name='username' required id='SignUpEmailInput'/>
                    
                    <div id='SignUpPasswordInputDiv'>
                        <input type={showPassword ? 'text' : 'password'}  placeholder='Password' name='password' required id='SignUpPasswordInput' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button type='button' className='ShowHideButton' onClick={HandleClick}>{buttonText}</button>
                    </div>

                    <button type='submit' id='SignUpSubmitButton'>Sign Up</button>
                </form>
                <hr style={{marginTop: "10%", opacity: "50%"}}/>
                <hr style={{marginTop: "3%", opacity: "75%"}}/>
                <hr style={{marginTop: "3%", opacity: "100%"}}/>
            </div>   
        </div>
        <Footer />
        </>
    )
}

export default SignUp;