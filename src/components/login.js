import React, { useState , useEffect} from "react";
import db from "../firebase";
import { collection,  onSnapshot, getDocs,  } from "firebase/firestore";

function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
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
    await getUsers();
    //console.log(users);
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
    const cur = await checkIfUserExist(); 
    if(cur) {
        console.log("success");
        window.location.href = '/users';
    } 
    else {
        console.log("doesnt match");
    }
    // setEmail("");
    // setPassword("");
}

return (
	<form onSubmit={submit} className="signup-in">
        <div className="signup-in__title">
            <h1>Login</h1>
        </div>
        <div className="signup-in__form ">
            <input type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
            <p class="notify-p">{notify}</p>
            <input type="submit" value="Login" />
        </div>
	</form>
);
}

export default Login;
