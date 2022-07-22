
import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import "../css/header.css"
import { useNavigate, useParams } from "react-router-dom";
import { toBeInTheDOM } from '@testing-library/jest-dom/dist/matchers';

function Header() {
    const [displayUsernameBox, setDisplayUsernameBox] = useState(localStorage.getItem("userNameBox"));
    const [displayLoginBox, setDisplayLoginBox] = useState(localStorage.getItem("loginBox"));
	let navigate = useNavigate();
	const [listLink, setListLink] = useState("#");
	const [gridLink, setGridLink] = useState("#");
	const [linkColor1, setLinkColor1]= useState("")
	const [linkColor2, setLinkColor2]= useState("")
	const [linkColor3, setLinkColor3]= useState("")

	const signoutOnclick = () => {
        setDisplayUsernameBox("none");
        setDisplayLoginBox("block");
        localStorage.setItem("userNameBox", "none");
        localStorage.setItem("loginBox", "block");
        localStorage.setItem("displayUsername", "");
        localStorage.removeItem("pageIndex");
        localStorage.removeItem("user");
		Cookies.remove("user")
        navigate('/login', {replace: true});
    }

    useEffect( () => {
        if (localStorage.getItem("displayUsername") ==="") {
            setListLink("/login");
            setGridLink("/login");
        }
        else {
            setListLink("/listview");
            setGridLink("/students");
        }
		if (localStorage.getItem("pageIndex") == 1) {
			setLinkColor1("red")
		}
		else {
			setLinkColor1("#ffffff8c")
		}
		if (localStorage.getItem("pageIndex") == 2) {
			setLinkColor2("red")
		}
		else {
			setLinkColor2("#ffffff8c")
		}
		if (localStorage.getItem("pageIndex") == 3) {
			setLinkColor3("red")
		}
		else {
			setLinkColor3("#ffffff8c")
		}
    },[]);
	function setPageIndex1(){
		localStorage.setItem("pageIndex", 1);
	}
	function setPageIndex2(){
		localStorage.setItem("pageIndex", 2);
	}
	function setPageIndex3(){
		localStorage.setItem("pageIndex", 3);
	}
	function viewProfile(){
		localStorage.removeItem("pageIndex");
		navigate(`/user/${Cookies.get("user")}`)
	}
	function changePassword(){
		localStorage.removeItem("pageIndex");
		navigate(`/changepassword/${Cookies.get("user")}`)
	}
    return (
		<nav class="navbar navbar-dark bg-dark navbar-expand-md container-fluid header navbar-inverse">
			<a href="#" class="navbar-brand header_name">QLSV</a>
			<button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="navbar-collapse collapse justify-content-center" id="navbar">
				<ul class="navbar-nav nav header_menu " >
					<li class="nav-item "><a  href='#' class="nav-link" style={{color: linkColor1}}  onClick={setPageIndex1} >Home</a></li>
					<li class="nav-item"><a  href={listLink} class="nav-link" style={{color: linkColor2}} onClick={setPageIndex2} >ListView</a></li>
					<li class="nav-item"><a href={gridLink} class="nav-link" style={{color: linkColor3}} onClick={setPageIndex3}>GridView</a></li>
				</ul>
			</div>
				<div class="user-info" style={{display:displayUsernameBox}}>
			 		<div class="dropdown user-displayname ">
			 			<button type="button" class=" btn-user bg-dark  dropdown-toggle" data-bs-toggle="dropdown">
			 				{localStorage.getItem("displayUsername")}
			 			</button>
			 			<ul class="dropdown-menu">
			 				<li><a class="dropdown-item" href="#" onClick={viewProfile}>View Profile</a></li>
			 				<li><a class="dropdown-item" href="#" onClick={changePassword}>Change Password</a></li>
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