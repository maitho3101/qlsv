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
    const signoutOnclick = () => {
        setDisplayUsernameBox("none");
        setDisplayLoginBox("block");
        localStorage.setItem("userNameBox", "none");
        localStorage.setItem("loginBox", "block");
        localStorage.setItem("displayUsername", "");
        localStorage.removeItem("user");
        navigate('/', {replace: true});
    }
    return (
        <div>
            <Header/>
            <div className='user-profile container'>
            <div>
                                <p>Họ Tên: {user.name}</p>
                                <p>Tuổi: {user.age}</p>
                                <p>Email: {user.email}</p>
                                <p>Sdt: {user.phone}</p>
                                <p>Địa chỉ: {user.address}</p>
                                <p>Tiểu sử: {user.bio}</p>
                            </div>
            {/* {users && (<>
						{users.map((user)=>{
						return(
							<div>
                                <p>Họ Tên: {user.name}</p>
                                <p>Tuổi: {user.age}</p>
                                <p>Email: {user.email}</p>
                                <p>Sdt: {user.phone}</p>
                                <p>Địa chỉ: {user.address}</p>
                                <p>Tiểu sử: {user.bio}</p>
                            </div>
                            
							)
						})}
					</>)} */}
               
                <button className='btn btn_signout' onClick={signoutOnclick}>signout</button>
            </div>
        </div>
    );
}

export default User;