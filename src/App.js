import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"
import Signup from "./components/signup";
import Login from "./components/login";
// import Home from "./components/home";
import ListView from "./components/listView";
import User from "./components/user";
import Students from "./components/students";
import DetailStudent from "./components/detailStudent";
import Welcome from "./components/welcome";
import ChangePassword from "./components/changepassword";
import Cookies from "js-cookie";

function App(){
	return(
		<Router>
			<Routes>
				{/* <Route path="/" element={<Welcome/>}/> */}
				<Route path="/" element={<Signup/>}/>
				{/* <Route  path='/home' element={<Home/>}/> */}
				<Route  path='/listview' element={<ListView/>}/>
				<Route path="/login" element={<Login/>}/>
				
				<Route path="/user/:id" element={<User/>}/>
				<Route path="/changepassword/:id" element={<ChangePassword/>}/>
				<Route path="/students" element={<Students/>}/>
				<Route path="/student/:id" element={<DetailStudent/>}/>
			</Routes>
		 </Router> 
	)
}


export default App;
