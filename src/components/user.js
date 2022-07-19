import React, {useState , useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Header from './header';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';
import { collection, getDocs, doc, docs, updateDoc, deleteDoc,onSnapshot , where, query, orderBy , limit } from "firebase/firestore";
import "../css/user.css";

import db from "../firebase";

function User() {
    
    const [displayUsernameBox, setDisplayUsernameBox] = useState(localStorage.getItem("userNameBox"));
    const [displayLoginBox, setDisplayLoginBox] = useState(localStorage.getItem("loginBox"));
    const [user, setUser]= useState("");
    const [userCookie, setUserCookie] = useCookies(["user"]);
   

    const usersCollection = collection(db,"users");
    
    let navigate = useNavigate();
    const { id } = useParams();
    const studentsCollection = collection(db,"students");

    
    async function getUserData(){
        db.collection('users').doc(id).get()
        .then(snapshot => setUser(snapshot.data()))
    }
    useEffect(() => async function() {
        
        await getUserData();
    },[]);
   
    return (
        <div>
            <Header/>
            <div className='user-profile '>
                <div className='user-profile_name'>
                    <h1>Profile</h1>
                </div>
                <div className='profile-body'>
                    <div className='profile-body_img'>
                        <img  src="https://images.unsplash.com/photo-1526512340740-9217d0159da9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmVydGljYWx8ZW58MHx8MHx8&w=1000&q=80"/>
                    </div>
                    <div className='profile-body_text'>
                        <p>Full Name: {user.fullname}</p>
                        <p>Age: {user.age}</p>
                        <p>Email: {user.email}</p>
                        <p>Phone Number: {user.phone}</p>
                        <p>Address: {user.address}</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default User;