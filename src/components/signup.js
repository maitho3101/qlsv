import React, { useState } from "react";
import "../css/signup.css";
import db from "../firebase";

function Signup() {
const [userName, setUserName] = useState("");
const [msv, setMsv] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const submit = (e) => {
    e.preventDefault();
    db.collection("users").add({
      name: userName,
      msv: msv,
      email: email,
      password: password,
    })
    .then((docRef)=>{
        console.log("signup success")
    })
    .catch((error)=>{
        console.log("error",error)
    });
};

return (
	<div className="signup-in container-fluid">
        <div className="signup-in__title">
            <h1>Sign Up</h1>
        </div>
        <div className="signup-in__form ">
            <input type="text" placeholder="Name" value={userName} onChange={(e) => setUserName(e.target.value)}/>
            <input type="text" placeholder="MSV" value={msv} onChange={(e) => setMsv(e.target.value)}/>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={submit}>Sign Up</button>
        </div>
	</div>
);
}

export default Signup;
