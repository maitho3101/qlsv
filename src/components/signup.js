import React, { useState , useEffect} from "react";
import "../css/signup.css";
import db from "../firebase";
import { collection,  onSnapshot, getDocs,  } from "firebase/firestore";

function Signup() {
const [userName, setUserName] = useState("");
const [msv, setMsv] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confPassword, setConfPassword] = useState("");
const [notify, setNotify] = useState("");
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

async function checkIfUserExist() {
    // console.log(users)
    // console.log(userName)
    await getUsers();
    for(var i=0; i< users.length; i++){
        // console.log(users[i].email)
        if (email === users[i].email){
            return 1; 
        }
    }
    return 0;
}
 
const submit = async (e) => {
    e.preventDefault();
    if(email ===""){
        setNotify("Please fill in email!")
    }
    else if (userName ===""){
        setNotify("Please fill in userName!")
    }
    else if (msv ===""){
        setNotify("Please fill in msv!")
    }
    else if (password ===""){
        setNotify("Please fill in password!")
    }
    else if (password !== confPassword) {
        setNotify("Password doesn't match!")
    }
    else{

        const cur = await checkIfUserExist(); 
        if(!cur) {
            await db.collection("users").add({
                name: userName,
                msv: msv,
                email: email,
                password: password,
            })
            setNotify("success");
            window.location.href = '/login';
        } 
        else {
            setNotify("Email is already in use. Please choose another one!");
        }
    }
    // setUserName("");
    // setMsv("");
    // setEmail("");
    // setPassword("");
    // setConfPassword("");
}

return (
	<form onSubmit={submit} className="signup-in">
        <div className="signup-in__title">
            <h1>Sign up</h1>
        </div>
        <div className="signup-in__form ">
            <input type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" placeholder="Name"  value={userName} onChange={(e) => setUserName(e.target.value)}/>
            <input type="text" placeholder="MSV"  value={msv} onChange={(e) => setMsv(e.target.value)}/>
            <input type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" placeholder="Confirm Password"  value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
            <p class="notify-p">{notify}</p>
            <input type="submit" value="Sign up" className="submit-button" />
        </div>
	</form>
);
}

export default Signup;
