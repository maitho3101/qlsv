import React, { useState , useEffect} from "react";
import { useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import db from "../firebase";
import { collection, getDocs,  } from "firebase/firestore";


function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [notify, setNotify] = useState("");
const [users, setUsers]=useState([]);

const [displayUsernameBox, setDisplayUsernameBox] = useState(localStorage.getItem("userNameBox"));
const [displayLoginBox, setDisplayLoginBox] = useState(localStorage.getItem("loginBox"));

// const[cookies, setCookie] = useCookies(['displayUsername']);

const onClickimg = () => {
    setDisplayUsernameBox("flex");
    setDisplayLoginBox("none");
}
const usersCollection = collection(db,"users");

async function getUsers() {
    const data = await getDocs(usersCollection); 
    var newUser = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
    setUsers(newUser);
}

useEffect(() => async function() {
    await getUsers();
},[]);

async function checkLogin() {
    await getUsers();
    for(var i=0; i< users.length; i++){
        if (email === users[i].email && password === users[i].password){
            return users[i].name; 
        }
        // console.log(users[i].name)
    }
    return "0";
}

let navigate = useNavigate();
const submit = async (e) => {
    e.preventDefault();
    if(email ===""){
        setNotify("Please fill in email!")
    }
    else if (password ===""){
        setNotify("Please fill in password!")
    }
    else{
        const displayName ="";
        const cur = await checkLogin(displayName);
        if(cur==="0") {
            setNotify("Username or password is invalid. Please try again");
        } 
        else {
            console.log("login");
            // Cookies.set("displayUsername",cur,{ path: '/' });
            localStorage.setItem("displayUsername",cur);
            localStorage.setItem("userNameBox", "flex");
            localStorage.setItem("loginBox", "none");
            onClickimg();
            // console.log(localStorage.getItem("displayUsername"));
            // window.location.href = '/';
            navigate('/', {replace: true});
            
        //    <Navigate to ='/' replace={true}/>
            
        }
    }
    // setEmail("");
    // setPassword("");
}


return (
	<div>
        <form onSubmit={submit} className="signup-in" >
            <div className="signup-in__title">
                <h1>Login</h1>
            </div>
            <div className="signup-in__form ">
                <input type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                <p className="notify-p">{notify}</p>
                
            </div>
                <input type="submit" value="Login" className="btn " />
        </form>
    </div>
);
}

export default Login;
