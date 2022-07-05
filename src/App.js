import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"
import Signup from "./components/signup";
import Login from "./components/login";
import ListUsers from "./components/listusers";
import Home from "./components/home";
import User from "./components/user";
import Cookies from "js-cookie";

function App(){
	return(
		<BrowserRouter>
			<Routes>
				<Route path="/signup" element={<Signup/>}/>
				<Route exact path='/' element={<Home/>}/>
				<Route path="/login" element={<Login/>}/>
				{/* <Route exact path="/" element ={<PrivateRoute/>}>
				</Route> */}
				<Route path="/listusers" element={<ListUsers/>}/>
				<Route path="/user" element={<User/>}/>
			</Routes>
		</BrowserRouter>
	)
}


export default App;
