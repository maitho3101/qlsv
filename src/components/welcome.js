import React, {useState, useEffect} from 'react';
import Header from './header';
import "../css/welcome.css";
function Welcome(props) {
    
    return (
        <div >
            <Header/>
            <div className='welcome container-fluid'>
                <h1 className='welcome-title' > WELCOME</h1>
            </div>
            
        </div>
    );
}

export default Welcome;