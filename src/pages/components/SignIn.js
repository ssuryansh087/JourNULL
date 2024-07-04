import firebase from '../../database/firebaseConfig';
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/finalLogo.png';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../database/firebaseDatabase';
import { useDispatch } from 'react-redux';
import { userUpdate } from '../../features/userSlice';
import 'firebase/compat/firestore';

function SignInLeft(){
    let [buttonText, setButtonText] = useState('Show');
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();

    const HandleClick = () =>{
        setButtonText(showPassword === true ? 'Show' : 'Hide');
        setShowPassword((prev) => !prev);
    }

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
          const userID = userCredential.user.uid;
          const docRef = doc(db, 'Users', userID);
          const docSnap = await getDoc(docRef);

          if(docSnap.exists()){
            const userData = docSnap.data();
            const username = userData.username;
            dispatch(userUpdate(username));
          }
          else{
            console.log("No Such Document!");
          }
          alert("User Logged in Successfully!");    
          navigate('/');
        } 
        catch (error) {
          setErrorMessage(error.message);
          alert(errorMessage);
        }
      }; 

    return(
        <>
            <div id="SignInPageDiv">
            <p className='SignInPageStars'>&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                <div id="SignInLeft">
                    <div>
                        <h2 id="LoginToYourAccount">Sign In</h2>
                    </div>
                    <form onSubmit={handleLogin}>
                        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} name='username' required id='SignInEmailInput'/>
                        
                        <div id="PasswordInputDiv">
                            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} maxLength="16" placeholder='Password' name='password' required id='SignInPasswordInput'/>
                            <button type='button' className='ShowHideButton' onClick={HandleClick}>{buttonText}</button>
                        </div>                
                        <button type='submit' id='SignInSubmitButton'>Sign In</button>
                    </form>
                <hr style={{marginTop: "10%", opacity: "50%"}}/>
                <hr style={{marginTop: "3%", opacity: "75%"}}/>
                <hr style={{marginTop: "3%", opacity: "100%"}}/>
                </div>
                <div id='SignInPageRight'>
                    <img src={logo} id='SignInLogo' alt='JourNULL Logo'/>
                    <p id='SignInNewHere'>New Here?</p>
                    <p id='SignInAD'>Sign Up and discover yourself with The JourNULL!</p>
                    <Link to="/Sign-Up"><button id='SignUpButton'>Sign Up</button></Link>
                </div>    
            </div>
        </>
    )
}

export default SignInLeft;