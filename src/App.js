import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";

function App(){
	return(
		<BrowserRouter>
			<Routes>
				<Route path="/signup" element={<Signup/>}/>
			</Routes>
		</BrowserRouter>
	)
}


export default App;
