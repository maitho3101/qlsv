import React, {useState , useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Header from './header';
import Cookies from 'js-cookie';
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
    

    // async function getUsers() {
    //     const data = await getDocs(usersCollection); 
    //     var newUser = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
    //     setUsers(newUser);
    // }
    // // console.log(Cookies.get("displayUsern"));
    // useEffect(() => async function() {
    //     await getUsers();
    // },[]);
    let navigate = useNavigate();
	const signoutOnclick = () => {
        setDisplayUsernameBox("none");
        setDisplayLoginBox("block");
        localStorage.setItem("userNameBox", "none");
        localStorage.setItem("loginBox", "block");
        localStorage.setItem("displayUsername", "");
        Cookies.remove("idLogin")
        navigate('/', {replace: true});
    }
    const [userDetail, setUserDetail]= useState("");
    const { id } = useParams();
    async function getUserData(){
        db.collection('users').doc(id).get()
        .then(snapshot => setUserDetail(snapshot.data()))
    }
    useEffect(() => async function() {
        
		await getUserData();
    },[]);
    return (
        <div>
            <Header/>
            <div className='user-profile container'>
                
                <div>
                    <p>Họ Tên: {userDetail.name}</p>
                    <p>Tuổi: {userDetail.age}</p>
                    <p>Email: {userDetail.email}</p>
                    <p>Sdt: {userDetail.phone}</p>
                    <p>Địa chỉ: {userDetail.address}</p>
                    <p>Tiểu sử: {userDetail.bio}</p>
                </div>
                <button className='btn btn_signout' onClick={signoutOnclick}>signout</button>
            </div>
        </div>
    );
}

export default User;