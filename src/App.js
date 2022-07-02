import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Users from "./components/users";
import Register from "./components/register";
import Home from "./components/home";

function App(){
	return(
		<BrowserRouter>
			<Routes>
				<Route path="/home" element={<Home/>}/>
				<Route path="/signup" element={<Signup/>}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/users" element={<Users/>}/>
				<Route path="/register" element={<Register/>}/>
			</Routes>
		</BrowserRouter>
	)
}


export default App;
