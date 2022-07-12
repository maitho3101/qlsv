import React, { useState , useEffect} from "react";
import "../css/signup.css";
import db from "../firebase";
import Cookies from 'js-cookie';
import { collection, getDocs,  } from "firebase/firestore";

function Signup() {

const [page, setPage]= useState(0);
const [signupButton, setSignupButton] = useState("none");

const FormTitles = ["Sign Up", "Personal Info", "Other"];

const [userName, setUserName] = useState("");
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

useEffect(() => async function() {
    await getUsers();
},[]);

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
async function nextPage(){
    if(page===0){
        if(!email ){
            setNotify("Please fill in email!")
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
        }
    }
    else if(page ===1){
        if(!userName ){
            setNotify("Please fill in name!")
        }
        else if (!age ){
            setNotify("Please fill in age!")
        }
        else if (!bio) {
            setNotify("Please fill in bio!")
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
            const cur = await checkIfUserExist(); 
            if(!cur) {
                 const check = await db.collection("users").add({
                    name: userName,
                    email: email,
                    password: password,
                    age:age,
                    bio: bio,
                    phone:phone,
                    address:address,
                })
                setNotify("success");;
                window.location.href = '/login';
                

            } 
            else {
                setNotify("Account already exist. Please choose another one!");
            }
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
                <input type="email" placeholder="Email"  value={email}  onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder="Confirm Password"  value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
                <p class="notify-p">{notify}</p>
                
            </div>
        );
    }
    else if(page ===1){
        return (
            <div className="signup-in__form">
                <input type="text" placeholder="Name"  value={userName} onChange={(e) => setUserName(e.target.value)}/>
                <input type="number" placeholder="Tuoi"  value={age} onChange={(e) => setAge(e.target.value)}/>
                <input type="text" placeholder="Tieu su"  value={bio} onChange={(e) => setBio(e.target.value)}/>
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
                <button disabled={page === 0} onClick={()=>{setPage((currentPage)=> currentPage -1)}} >Prev</button>
                {/* <button 
                    onClick={submit}
                >
                        {page === FormTitles.length -1?"Submit":"Next"}
                </button> */}
                {page ===FormTitles.length-1?<button onClick={submit} >Sign Up</button>:<button onClick={nextPage}>Next</button>}
                
                
                
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
