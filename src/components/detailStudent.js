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
       
        // const studentDoc = doc(db, "students", id); 
        // try {
        //     const docSnap = await getDoc(studentDoc);
        //     if(docSnap.exists()) {
        //         console.log(docSnap.data());
                
        //     } else {
        //         console.log("Document does not exist")
        //     }
        
        // } catch(error) {
        //     console.log(error)
        // }
    }
    useEffect(() => async function() {
        
		await getStudentData();
    },[]);
    return (
        <div>
            <Header/>
            <div className='student-profile container-fluid'>
                <div className='student-profile_title'>
                    <h1>Student Profile</h1>
                </div>
                <div className='student-profile_body'>
                    <div className="stu-avatar_detail" >
						<img style={{"height":"220px", "width":"220px"}} src={stuDetail.pic}></img>
					</div>
                    <div className='stu_detail'>
                        <h3 className='stu_name'>Họ tên: {stuDetail.name}</h3>
                        <p>Mã sinh viên: {stuDetail.msv}</p>
                        <hr/>
                        <p>Giới tính: {stuDetail.gender}</p>
                        <hr/>
                        <p>Email: {stuDetail.email}</p>
                        <hr/>
                        <p>Khóa: {stuDetail.khoa}</p>
                        <hr/>
                        <p>Lớp: {stuDetail.grade}</p>
                        <hr/>
                        
                    </div>
                </div>
                <div className='stu_bio container'>
                    <p>Tiểu sử: </p>
                    <div className='bio_detail'>
                        {stuDetail.bio}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DetailStudent;