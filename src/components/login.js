import React, { useState , useEffect} from "react";
import { useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import { useCookies } from "react-cookie";
import db from "../firebase";
import { collection, getDocs,  } from "firebase/firestore";
import { async } from "@firebase/util";
import "../css/signup.css"

function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [notify, setNotify] = useState("");
const [users, setUsers]=useState([]);
const [userDetail, setUserDetail]= useState("");

const [displayUsernameBox, setDisplayUsernameBox] = useState(localStorage.getItem("userNameBox"));
const [displayLoginBox, setDisplayLoginBox] = useState(localStorage.getItem("loginBox"));


const onClickimg = () => {
    setDisplayUsernameBox("flex");
    setDisplayLoginBox("none");
}
function setCookie(cname, cvalue, expdays){
    const d = new Date();
    d.setTime(d.getTime() + expdays*24*60*60*1000);
    let expires ="expires=" +d.toUTCString();
    document.cookie = cname + "=" + cvalue +";" +expires + ";path=/";
}
const usersCollection = collection(db,"users");

async function getUsers() {
    const data = await getDocs(usersCollection); 
    var newUser = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
    setUsers(newUser);
}

useEffect(() => {
    try {
        getUsers();
    } catch {
    } finally {
    }
  }, []);

async function checkLogin() {
    await getUsers();
    for(var i=0; i< users.length; i++){
        if (email === users[i].email && password === users[i].password){
            return users[i].name; 
        }
    }
    return "0";
}
async function checkLogin2() {
    await getUsers();
    for(var i=0; i< users.length; i++){
        if (email === users[i].email && password === users[i].password){
            return users[i].id; 
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
    else if(/([a-zA-Z0-9._%+-]{3})+@[a-z0-9-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g.test(email)=== false){
        setNotify("Incorrect email")
    }
    else if (password ==="" ){
        setNotify("Please fill in password!")
    }
    
    else{
        const displayName ="";
        const cur = await checkLogin(displayName);
        if(cur==="0") {
            setNotify("Username or password is invalid. Please try again");
        } 
        else {
            // Cookies.set("displayUsern",users,{ path: '/' });
            
            localStorage.setItem("displayUsername",cur);
            localStorage.setItem("pageIndex", 2);
            localStorage.setItem("userNameBox", "flex");
            localStorage.setItem("loginBox", "none");
            const idLogin ="";
            const cur2 = await checkLogin2(idLogin);
            setCookie("user", cur2, 5);
            // localStorage.setItem("user",cur2);
            onClickimg();
            navigate('/listview', {replace: true});
            
        }
    }
}


return (
	<div>
        <form onSubmit={submit} className="signup-in" >
            <div className="signup-display">

                <div className="signup-in__title">
                    <h1>Login</h1>
                </div>
                <div className="signup-in__form ">
                    <input type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <p className="notify-p">{notify}</p>
                    
                </div>
                <input type="submit" value="Login" className=" btn-login " />
                <div className="member">
                    <span>Not a member?</span>
                    <a href="/">Sign Up</a>
                </div>
            </div>
        </form>
    </div>
);
}

export default Login;
