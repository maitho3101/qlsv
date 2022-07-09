import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"
import Signup from "./components/signup";
import Login from "./components/login";
import Home from "./components/home";
import User from "./components/user";
import Students from "./components/students";
import DetailStudent from "./components/detailStudent";

import Cookies from "js-cookie";

function App(){
	return(
		<BrowserRouter>
			<Routes>
				<Route path="/signup" element={<Signup/>}/>
				<Route  path='/' element={<Home/>}/>
				<Route path="/login" element={<Login/>}/>
				{/* <Route exact path="/" element ={<PrivateRoute/>}>
				</Route> */}
				<Route path="/user" element={<User/>}/>
				<Route path="/students" element={<Students/>}/>
				<Route path="/student/:id" element={<DetailStudent/>}/>
			</Routes>
		</BrowserRouter>
	)
}


export default App;
