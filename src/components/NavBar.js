import React from 'react';
import './styles/NavBarStyle.css';
import Logo from '../assets/finalLogo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavBar(){
    const title = useSelector(state => state.title);

    return(
        <>
            <div id='TheNavBar'>
                <img src={Logo}  alt='JourNULL Logo' id='NavBarLogo'/>
                <Link to="/" id='NavBarTitle'>{title}</Link>
                <p id='NavBarAnchor'>|</p>
                <Link to="/" className='NavBarButtons'>Home</Link>
                <Link to="/Journal" className='NavBarButtons'>Journal</Link>
                <Link to="/ToDo" className='NavBarButtons'>To-Do List</Link>
                <div id='NavBarDropdown'>
                    <Link to="/Account" id='AccountDropdown'>Account</Link>
                    <div id='NavBarDropdownContent'>
                        <Link to="/Account/MyAccount">My Account</Link>
                        <Link to="/Account/Dashboard">Dashboard</Link>
                        <Link to="/Settings">Settings</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar;