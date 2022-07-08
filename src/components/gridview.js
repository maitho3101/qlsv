import React, {useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";
import Header from "./header";
import "../css/gridview.css";
import "../css/home.css";
import db from "../firebase";
import { collection, getDocs, doc, docs } from "firebase/firestore";

function Gridview(props) {
    const [students, setStudents]=useState([]);
    
    const studentsCollection = collection(db,"students");

    async function getStudents() {
        const data = await getDocs(studentsCollection); 
        var newStudent = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
        setStudents(newStudent);
    }
    useEffect(() => async function() {
        
		await getStudents();
    },[]);

    const CardProfile = ()=>{
        return(
            students.map((student, index)=>
                (
                    <div className="col-3 profile-display">
                        <div className="profile-content">
                            <div className="stu_avatar " >
                                    <img className="rounded-circle" style={{"height":"80px", "width":"80px"}} src={student.pic}></img>
                            </div>
                            <div className="stu-info ">
                                <p className="stu-name">{student.name}</p>
                                <p>{student.gender}</p>
                                <p>{student.msv}</p>
                                <p>{student.grade}</p>
                                <a href="#">View Details</a>
                            </div>
                        </div>
                    </div>
                )
        ));
    }
    return (
        <div>
            <Header/>
                <div className="title"> 
                    <h1>Profile GridView</h1>
                </div>
            <div className="liststudents-gridview container-fluid">
                <CardProfile></CardProfile>
            </div>
        </div>
    );
}

export default Gridview;