import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"
import Signup from "./components/signup";
import Login from "./components/login";
// import Home from "./components/home";
import ManageStudents from "./components/manageStudents";
import User from "./components/user";
import Students from "./components/students";
import DetailStudent from "./components/detailStudent";
import Welcome from "./components/welcome";
import Test from "./components/testUploadImg";
import ChangePassword from "./components/changepassword";
import Cookies from "js-cookie";

function App(){
	return(
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Welcome/>}/>
				<Route path="/signup" element={<Signup/>}/>
				{/* <Route  path='/home' element={<Home/>}/> */}
				<Route  path='/manage' element={<ManageStudents/>}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/test" element={<Test/>}/>
				
				<Route path="/user/:id" element={<User/>}/>
				<Route path="/changepassword/:id" element={<ChangePassword/>}/>
				<Route path="/students" element={<Students/>}/>
				<Route path="/student/:id" element={<DetailStudent/>}/>
			</Routes>
		</BrowserRouter>
	)
}


export default App;
