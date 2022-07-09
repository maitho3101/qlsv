import React, {useState , useEffect} from 'react';
import Header from './header';
import "../css/user.css";

import db from "../firebase";
import { collection, getDocs,  } from "firebase/firestore";

function User() {
   
    const [displayUsernameBox, setDisplayUsernameBox] = useState(localStorage.getItem("userNameBox"));
    const [displayLoginBox, setDisplayLoginBox] = useState(localStorage.getItem("loginBox"));
    const [users, setUsers]=useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notify, setNotify] = useState("");
    const [user, setUser] = useState("");
    const usersCollection = collection(db,"users");
    

    async function getUsers() {
        const data = await getDocs(usersCollection); 
        var newUser = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
        setUsers(newUser);
    }

    useEffect(() => async function() {
        await getUsers();
    },[]);

	const signoutOnclick = () => {
        setDisplayUsernameBox("none");
        setDisplayLoginBox("block");
        localStorage.setItem("userNameBox", "none");
        localStorage.setItem("loginBox", "block");
        window.location.href="/";
    }
    async function checkAcc(e) {
        e.preventDefault();
        const nameDisplay = localStorage.getItem("displayUsername");
        await getUsers();
        const displayName=users.some(function(st){return st.name== nameDisplay; });
        
    }
    return (
        <div>
            <Header/>
            <div className='user-profile container'>
                <h1>User Profile</h1>
                <div className='pic_profile'>
                    avatar
                </div>
                <button onClick={checkAcc}>check</button>
                <button className='btn btn_signout' onClick={signoutOnclick}>signout</button>
            </div>
        </div>
    );
}

export default User;