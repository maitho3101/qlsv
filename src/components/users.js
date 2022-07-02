import React, {useState, useEffect} from "react";
import "../css/user.css"
import db from "../firebase";
import { collection, query, where, onSnapshot, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
function Users(){

    const [displayChangeMSV, setDisplayChangeMSV] = useState("none");

    const [users, setUsers]=useState([]);
    
    const usersCollection = collection(db,"users");

    async function getUsers() {
        //console.log(1);
        const data = await getDocs(usersCollection); 
        var newUser = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
        setUsers(newUser);
    }

    useEffect(() => async function() {
        await getUsers();
    },[]);

    async function changeMSV (id, msv, event){
        const userDoc = doc(db, "users", id); 
        console.log(userDoc)
        const newField ={msv: event.target.old_msv.value} 
        await updateDoc(userDoc, newField)
        
    }
    function changeMSVhandle(){
        setDisplayChangeMSV("flex");
    }
    const deleteUser = async (id)=>{
        const userDoc = doc(db, "users", id); 
        await deleteDoc(userDoc);
    }
   
    return (
        <div>
            <table id="admin">
                    <tr>
                        <th >STT</th>
                        <th >Username</th>
                        <th >msv</th>
                        <th >email</th>
                        <th >action</th>
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
                            <button onClick={()=>changeMSVhandle(user.id)}>edit</button>
                            <button onClick={()=>deleteUser(user.id)}>del</button>
                        </td>

                    </tr>
                </table>
                )
            })}
            <form   style={{display:displayChangeMSV}}>
                <label>
                    New msv:
                </label>
                <input type="text" name="old_msv" />
                <button onClick={changeMSV}>change</button>
            </form>
        </div>
    );
}
export default Users;