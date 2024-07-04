import React from 'react';
import './styles/MainPageChildren.css';
import bookAnimation from '../assets/bookAnimation.gif';
//import dolphin from '../assets/dolphin.gif';

function MainPageChildren(){
    return(
        <>
            <div id='MainPageParent'>
                <div id='LeftChild'>
                    <img src={bookAnimation} alt='Book Animation' id='LeftChildImage' />
                    <p id='LeftChildTitle'>NULLIFY Your Worries and Stress</p>
                    <p className='LeftChildContent'>Discover the transformative power of daily journaling. At JourNULL, we believe in the simple yet profound act of putting thoughts to paper. Our platform offers a serene space for you to document your journey, track your progress, and achieve peace of mind.</p>
                
                </div>

                <div id='RightChild'>
                    <p id='RightChildTitle'>Why JourNULL?</p>
                    <p className='RightChildContent'> - Daily Journaling: Create a habit that enhances your mental and emotional health.</p>
                    <p className='RightChildContent'> - To-Do Lists: Organize your tasks and priorities effortlessly.</p>
                    <p className='RightChildContent'> - Stress Relief: Empty your mind of worries and stress by writing them away.</p>
                    <hr style={{marginTop: "7.5%"}}/>
                    <h2 id='StartJourneyTitle'>Start Your Journey Today</h2>
                    <p id='StartJourneyDesc'>Nullify the chaos of daily life. Embrace calm, clarity, and control with JourNULL.</p>
                    <button id='CreateJournalButton'>Create Your Journal</button>
                </div>
            </div>
        </>
    )
}

export default MainPageChildren;