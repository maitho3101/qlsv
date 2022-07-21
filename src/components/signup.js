import React, { useState , useEffect} from "react";
import "../css/signup.css";
import db from "../firebase";
import Cookies from 'js-cookie';
import { collection, getDocs,  } from "firebase/firestore";
import { func } from "prop-types";

function Signup() {

const [page, setPage]= useState(0);
const [prevButton, setPrevButton] = useState("none");

const FormTitles = ["Sign Up", "Personal Info", "Other"];

const [displayName, setDisplayName] = useState("");
const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confPassword, setConfPassword] = useState("");
const [age, setAge] = useState("");
const [bio, setBio] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");

const [notify, setNotify] = useState("");
const [users, setUsers]=useState([]);

const usersCollection = collection(db,"users");

async function getUsers() {
    //console.log(1);
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

async function checkIfUserExist() {
    // console.log(users)
    // console.log(userName)
    await getUsers();
    for(var i=0; i< users.length; i++){
        // console.log(users[i].msv)
        if (email === users[i].email ){
            return 1; 
        }
    }
    return 0;
}
async function backToPrevPage(){
    if(page===0){
        setPrevButton("none");
    }
    else if(page ===1 ){
        setPage(page-1);
        setPrevButton("none");
    }
    else if (page ===2){
        setPage(page-1);
    }
}
async function nextPage(){
    if(page===0){
        setPrevButton("none");
        const cur = await checkIfUserExist();
        if(!email ){
            setNotify("Please fill in email!")
        }
        else if(/([a-zA-Z0-9._%+-]{3})+@[a-z0-9-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g.test(email)=== false){
            setNotify("Email address need to be at least 3 characters before '@'. Ex: abc@gmail.com")
        }
        else if(cur){
            setNotify("Email is already exist. Please choose another one")
        }
        else if (!password ){
            setNotify("Please fill in password!")
        }
        else if (password.length <8 ){
            setNotify("Password needs to be at least 8 characters")
        }
        else if (password !== confPassword) {
            setNotify("Password doesn't match!")
        }
        else{
            setPage(1);
            setNotify("");
            setPrevButton("block");
        }
    }
    else if(page ===1){
        if(!displayName ){
            setNotify("Please fill in display name!")
        }
        else if (!fullName) {
            setNotify("Please fill in fullname!")
        }
        else if (!age ){
            setNotify("Please fill in age!")
        }
        else{
            setPage(2);
            setNotify("");
        }
    }
    
}
const submit = async (e) => {
    e.preventDefault();
    if(!phone ){
        setNotify("Please fill in phone!")
    }
    else if(/((09|03|07|08|05)+([0-9]{8})\b)/g.test(phone)== false){
        setNotify("Phone number must contain 10 characters and start with 09,03,08")
    }
    
    else if (!address ){
        setNotify("Please fill in address!")
    }
    else{
        if(page === FormTitles.length-1){
             
                await db.collection("users").add({
                    name: displayName,
                    fullname: fullName,
                    email: email,
                    password: password,
                    age:age,
                    phone:phone,
                    address:address,
                })
                setNotify("success");;
                window.location.href = '/login';
            
        }
    
    }
    
    // setUserName("");
    // setMsv("");
    // setEmail("");
    // setPassword("");
    // setConfPassword("");
}
const PageDisplay=()=>{
    if(page === 0){
        return (
            <div className="signup-in__form">
                <input type="email" placeholder="Email"  value={email}  onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder="Confirm Password"  value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
                <p class="notify-p">{notify}</p>
                
            </div>
        );
    }
    else if(page ===1){
        return (
            <div className="signup-in__form">
                <input type="text" placeholder="Displayname"  value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
                <input type="text" placeholder="Fullname"  value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                <input type="number" placeholder="Tuoi"  value={age} onChange={(e) => setAge(e.target.value)}/>
                <p class="notify-p">{notify}</p>
            </div>
        )
    }
    else{
        return (
            <div className="signup-in__form">
                <input type="text" placeholder="SDT"  value={phone} onChange={(e) => setPhone(e.target.value)}/>
                <input type="text" placeholder="Dia chi"  value={address} onChange={(e) => setAddress(e.target.value)}/>
                <p class="notify-p">{notify}</p>
            </div>
        )
    }
}
return (
    <div className="signup-in">
        <div className="signup-display">
            <div className="signup-in__title">
                <h1>{FormTitles[page]}</h1>
            </div>
                {PageDisplay()}
            <div className="footer">
                <div style={{display: prevButton}} className="footer-btn prev-btn">

                    <button onClick={backToPrevPage} >Prev</button>
                </div>
                
                <div className="footer-btn">
                    {page ===FormTitles.length-1?<button onClick={submit} >Sign Up</button>:<button onClick={nextPage}>Next</button>}
                </div>
                
                
                
            </div>
            <div className="member">
                <span>Already a member?</span>
                <a href="/login">Login</a>
            </div>
        </div>
    </div>
);
}

export default Signup;
