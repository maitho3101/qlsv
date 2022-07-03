import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import ListUsers from "./components/listusers";
import Home from "./components/home";
import User from "./components/user";

function App(){
	return(
		<BrowserRouter>
			<Routes>
				<Route exact path='/' element={<Home/>}/>
				<Route path="/signup" element={<Signup/>}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/listusers" element={<ListUsers/>}/>
				<Route path="/user" element={<User/>}/>
			</Routes>
		</BrowserRouter>
	)
}


export default App;
