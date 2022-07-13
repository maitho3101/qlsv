
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
        navigate('/', {replace: true});
    }

    useEffect( () => {
        if (localStorage.getItem("displayUsername") =="") {
            setManagelink("/login");
            setListlink("/login");
        }
        else {
            setManagelink("/manage");
            setListlink("/students");
        }
    },[]);

    return (
        <div>
			{/* header */}
			<div className="container-fluid header">
				<div className="header_name">
					<p>QLSV</p>
				</div>
				<div className="header_menu ">
					<ul className="nav navbar-nav ml-auto">
						<li class="nav__item"><a href="/" class="nav__link">Home</a></li>
						<li class="nav__item"><a href={managelink} class="nav__link active">Manage</a></li>
						<li class="nav__item"><a href={listlink} class="nav__link">List</a></li>
						<li class="nav__item"><a href="#" class="nav__link">About</a></li>
					</ul>
				</div>
				<div class="user-info" style={{display:displayUsernameBox}}>
					<div class="dropdown user-displayname">
						<button type="button" class=" btn-user  dropdown-toggle" data-bs-toggle="dropdown">
							{localStorage.getItem("displayUsername")}
						</button>
						<ul class="dropdown-menu">
							<li><a class="dropdown-item" href="#" onClick={()=>navigate(`/user/${Cookies.get("user")}`)}>View Profile</a></li>
							<li><a class="dropdown-item" href="#" onClick={()=>navigate(`/changepassword/${Cookies.get("user")}`)}>Change Password</a></li>
							<li><a class="dropdown-item" href="#" onClick={signoutOnclick}>Signout</a></li>
						</ul>
					</div>
            	</div>

            {/* signin signup */}
				<div class="header-signin" style={{display:displayLoginBox}}>
					<span class="btn btn-signin"><a href="/login">Login </a></span>
					<span class="btn-or"> / </span>
					<span class="btn btn-signin"><a href="/signup">Sign up</a></span>
				</div>
			</div>
			
			
		</div>
    );
}

export default Header;