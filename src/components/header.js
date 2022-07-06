
import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
function Header() {
    const [displayUsernameBox, setDisplayUsernameBox] = useState(localStorage.getItem("userNameBox"));
    const [displayLoginBox, setDisplayLoginBox] = useState(localStorage.getItem("loginBox"));
    return (
        <div>
			{/* header */}
			<div className="container-fluid header">
				<div className="header_name">
					<p>QLSV</p>
				</div>
				<div className="header_menu ">
					<ul className="nav navbar-nav ml-auto">
						<li class="nav__item"><a href="/" class="nav__link active">Home</a></li>
						<li class="nav__item"><a href="#" class="nav__link">List</a></li>
						<li class="nav__item"><a href="#" class="nav__link">Home</a></li>
						<li class="nav__item"><a href="#" class="nav__link">Home</a></li>
					</ul>
				</div>
				<div class="user-info" style={{display:displayUsernameBox}}>
					<div class="user-displayname">
						<a href='/user'>{localStorage.getItem("displayUsername")}</a>
						{/* <a href='/user'>{Cookies.get("displayUsername")}</a> */}
					</div>
            	</div>

            {/* signin signup */}
				<div class="header-signin" style={{display:displayLoginBox}}>
					<span class="btn signin"><a href="/login">Login </a></span>
					<span class="btn-or"> / </span>
					<span class="btn signup"><a href="/signup">Sign up</a></span>
				</div>
			</div>
			
			
		</div>
    );
}

export default Header;