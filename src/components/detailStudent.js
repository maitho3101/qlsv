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
    useEffect(() => {
		try {
			getStudentData();
		} catch {
		} finally {
		}
	  }, []);
      let navigate = useNavigate();
      async function backToPrevPage(){
        navigate(-1);
      }
    return (
        <div>
            <Header/>
            <a href='#' onClick={backToPrevPage} className="back-btn">&lt;Back</a>
            <div className='student-profile container-fluid'>
                <div className='student-profile_title'>
                    <h1>Student Profile</h1>
                </div>
                <div className='student-profile_body '>
                    <div className="stu-avatar_detail" >
						<img  src={stuDetail.pic}></img>
					</div>
                    <div className='stu_detail'>
                        <h3 className='stu_name'>{stuDetail.name}</h3>
                        <p>Student ID: {stuDetail.msv}</p>
                        <hr/>
                        <p>Gender: {stuDetail.gender}</p>
                        <hr/>
                        <p>Email: {stuDetail.email}</p>
                        <hr/>
                        <p>Department: {stuDetail.khoa}</p>
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