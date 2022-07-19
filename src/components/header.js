
import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import "../css/header.css"
import { useNavigate, useParams } from "react-router-dom";

function Header() {
    const [displayUsernameBox, setDisplayUsernameBox] = useState(localStorage.getItem("userNameBox"));
    const [displayLoginBox, setDisplayLoginBox] = useState(localStorage.getItem("loginBox"));
	let navigate = useNavigate();
	const [managelink, setManagelink] = useState("#");
	const [listlink, setListlink] = useState("#");


	const signoutOnclick = () => {
        setDisplayUsernameBox("none");
        setDisplayLoginBox("block");
        localStorage.setItem("userNameBox", "none");
        localStorage.setItem("loginBox", "block");
        localStorage.setItem("displayUsername", "");
        localStorage.removeItem("user");
        navigate('/login', {replace: true});
    }

    useEffect( () => {
        if (localStorage.getItem("displayUsername") ==="") {
            setManagelink("/login");
            setListlink("/login");
        }
        else {
            setManagelink("/manage");
            setListlink("/students");
        }
    },[]);
    return (
		<nav class="navbar navbar-dark bg-dark navbar-expand-md container-fluid header">
			<a href="#" class="navbar-brand header_name">QLSV</a>
			<button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="navbar-collapse collapse justify-content-center" id="navbar">
				<ul class="navbar-nav header_menu " >
					<li class="nav-item "><a href="/" class="nav-link " >Home</a></li>
					<li class="nav-item"><a href={managelink} class="nav-link">ListView</a></li>
					<li class="nav-item"><a href={listlink} class="nav-link">GridView</a></li>
				</ul>
			</div>
				<div class="user-info" style={{display:displayUsernameBox}}>
			 		<div class="dropdown user-displayname ">
			 			<button type="button" class=" btn-user bg-dark  dropdown-toggle" data-bs-toggle="dropdown">
			 				{localStorage.getItem("displayUsername")}
			 			</button>
			 			<ul class="dropdown-menu">
			 				<li><a class="dropdown-item" href="#" onClick={()=>navigate(`/user/${Cookies.get("user")}`)}>View Profile</a></li>
			 				<li><a class="dropdown-item" href="#" onClick={()=>navigate(`/changepassword/${Cookies.get("user")}`)}>Change Password</a></li>
			 				<li><a class="dropdown-item" href="#" onClick={signoutOnclick}>Signout</a></li>
			 			</ul>
			 		</div>
             	</div> 
			 	<div class="header-signin" style={{display:displayLoginBox}}>
			 		<span class="btn btn-signin"><a href="/login">Login </a></span>
			 		<span class="btn-or"> / </span>
			 		<span class="btn btn-signin"><a href="/signup">Sign up</a></span>
			 	</div>
		</nav>	
    );
}

export default Header;