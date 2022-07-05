import Cookies from "js-cookie";
import React from "react";
import {Navigate, Outlet} from 'react-router-dom';

const PrivateRoute=()=>{
    const auth = Cookies.get("displayUsername");
    return !auth ? <Outlet/> : <Navigate to ="/" replace={true}/>;
    
}
export default PrivateRoute;