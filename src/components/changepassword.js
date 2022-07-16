import React, {useState , useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Header from './header';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';
import { collection, getDocs, doc, docs, updateDoc, deleteDoc,onSnapshot , where, query, orderBy , limit } from "firebase/firestore";
import "../css/changepassword.css";
import db from "../firebase";

function ChangePassword() {
    
    
    const [user, setUser]= useState("");
    const [userCookie, setUserCookie] = useCookies(["user"]);
    const [changePassword, setChangePassword] = useState("none");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword]= useState("");
	const [confNewPassword, setConfNewPassword]= useState("");
    const [notify, setNotify]=useState("");

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
    const saveSubmit =async(e)=>{
        e.preventDefault();
        if(user.password !== oldPassword){
            setNotify("Old password is incorrect");
            console.log(user.password, oldPassword)
        }
        else if(newPassword.length<8){
            setNotify("Password needs to be at least 8 characters");
        }
        else if(newPassword !== confNewPassword){
            setNotify("Password doesn't match!");
        }
        else{
            const userDoc = doc(db, "users", id);
            await updateDoc(userDoc,{password: newPassword});
            setNotify("Change success");
            navigate(`/user/${Cookies.get("user")}`,{replace: true});
        }
    }
    
    return (
        <div>
            <Header/>
            <div className='changepass-page '>
                <div className='changepass-display' >
                    <h3>Change Password</h3>
                    <div className='old-password'>
                        <input type="password" placeholder='Old Password' onChange={(e)=>setOldPassword(e.target.value)} value={oldPassword}/>
                        <input type="password" placeholder='New Password' onChange={(e)=>setNewPassword(e.target.value)} value={newPassword}/> 
                        <input type="password" placeholder='Confirm New Password' onChange={(e)=>setConfNewPassword(e.target.value)} value={confNewPassword}/>
                        <p class="notify-p">{notify}</p>
                    </div>
                    
                    <div className='btn-changepass'>
                        <button onClick={saveSubmit} className="btn">Save</button>
                        <button className="btn" onClick={()=>navigate(`/user/${Cookies.get("user")}`)}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;