import React, {useState, useEffect} from "react";
import { confirm } from "react-confirm-box";
import Header from "./header";
import "../css/listusers.css";
import db from "../firebase";
import { collection, query, where, onSnapshot, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

function ListUsers(){

    const [displayChangeMSV, setDisplayChangeMSV] = useState("none");
    const [users, setUsers]=useState([]);
    const [searchUser, setSearchUser]=useState("")
    
    const usersCollection = collection(db,"users");

    async function getUsers() {
        const data = await getDocs(usersCollection); 
        var newUser = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
        setUsers(newUser);
    }

    useEffect(() => async function() {
        await getUsers();
    },[]);

    const searchSubmit = async()=>{
        console.log("search");
    }
    const deleteUser = async (id)=>{
        const userDoc = doc(db, "users", id); 
        var result = await confirm("Want to delete?");
        if (result) {
        await deleteDoc(userDoc);
        return;
        }else{
            console.log("no")
        }
}
    return (
        <div>
            <Header/>
            <h1>List Users</h1>
            <div className="search_user">
                <input onChange={(e) => setSearchUser(e.target.value)} type="text" placeholder="Search" />
                <i onClick={searchSubmit} class="fa-solid fa-magnifying-glass" type="submit" value="search"></i>
            </div>
            <div className="listusers-display">
                <table id="admin">
                    <tr>
                        <th >STT</th>
                        <th >Tên</th>
                        <th >MSV</th>
                        <th >Email</th>
                        <th >Action</th>
                    </tr>
                </table>
                {users.map((user, index)=>{
                    return(
                        <table id="admin">
                            <tr id ="admin">
                                <td >{index + 1}</td>
                                <td > {user.name}</td>
                                <td >{user.msv}</td>
                                <td >{user.email}</td>
                                <td >
                                    <button >edit</button>
                                    <button onClick={()=>deleteUser(user.id)}><i class="fa-solid fa-trash-can"></i></button>
                                </td>
                            </tr>
                        </table>
                        )
                })}
            </div>
        </div>
    );
}
export default ListUsers;