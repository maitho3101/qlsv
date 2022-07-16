import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Header from './header';
import "../css/detail.css";
import db from "../firebase";
import { collection, getDoc, doc, docs, updateDoc } from "firebase/firestore";
function DetailStudent(props) {
    const [stuDetail, setStuDetail]= useState("");
    const { id } = useParams();
    const studentsCollection = collection(db,"students");

    async function getStudentData(){
        db.collection('students').doc(id).get()
        .then(snapshot => setStuDetail(snapshot.data()))
     
    }
    useEffect(() => async function() {
        
		await getStudentData();
    },[]);
    return (
        <div>
            <Header/>
            <span><a href='/manage'>Back</a></span>
            <div className='student-profile container-fluid'>
                <div className='student-profile_title'>
                    <h1>Student Profile</h1>
                </div>
                <div className='student-profile_body'>
                    <div className="stu-avatar_detail" >
						<img style={{"height":"220px", "width":"220px"}} src={stuDetail.pic}></img>
					</div>
                    <div className='stu_detail'>
                        <h3 className='stu_name'>Student Name: {stuDetail.name}</h3>
                        <p>Student ID: {stuDetail.stuId}</p>
                        <hr/>
                        <p>Gender: {stuDetail.gender}</p>
                        <hr/>
                        <p>Email: {stuDetail.email}</p>
                        <hr/>
                        <p>Department: {stuDetail.department}</p>
                        <hr/>
                        <p>Grade: {stuDetail.grade}</p>
                        <hr/>
                        
                    </div>
                </div>
                <div className='stu_bio container'>
                    <p>Biography: </p>
                    <div className='bio_detail'>
                        {stuDetail.bio}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DetailStudent;