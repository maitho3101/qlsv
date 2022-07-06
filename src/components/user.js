import React, {useState} from 'react';
import Header from './header';
import "../css/user.css";

function User() {
    const [displayUsernameBox, setDisplayUsernameBox] = useState(localStorage.getItem("userNameBox"));
    const [displayLoginBox, setDisplayLoginBox] = useState(localStorage.getItem("loginBox"));
	const signoutOnclick = () => {
        setDisplayUsernameBox("none");
        setDisplayLoginBox("block");
        localStorage.setItem("userNameBox", "none");
        localStorage.setItem("loginBox", "block");
        window.location.href="/";
    }
    return (
        <div>
            <Header/>
            <div className='user-profile container'>
                <h1>User Profile</h1>
                <div className='pic_profile'>
                    avatar
                </div>
                <button className='btn btn_signout' onClick={signoutOnclick}>signout</button>
            </div>
        </div>
    );
}

export default User;