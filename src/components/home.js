import React, {useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";
import { confirm } from "react-confirm-box";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import {ref, uploadBytes, listAll , getDownloadURL, list} from "firebase/storage";
import { storage } from '../firebase';
import { v4 } from 'uuid';
import Header from "./header";
import "../css/home.css";
import db from "../firebase";
import { collection, getDocs, doc, docs, updateDoc, deleteDoc,onSnapshot , where, query, orderBy , limit } from "firebase/firestore";

function Home(){
	const [imageUpload, setImageUpload] = useState(null);
    const [pic, setPic] = useState("");
	const [stuName, setStuName] = useState("");
	const [gender, setGender] = useState("");
	const [email, setEmail] = useState("");
	const [msv, setMsv] = useState("");
	const [khoa, setKhoa] = useState("");
	const [grade, setGrade] = useState("");
    const [newPic, setNewPic] = useState("");
	const [newStuName, setNewStuName] = useState("");
	const [newGender, setNewGender] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [newMsv, setNewMsv] = useState("");
	const [newKhoa, setNewKhoa] = useState("");
	const [newGrade, setNewGrade] = useState("");
    const [users, setUsers]=useState([]);
	const [notify, setNotify] = useState("");
	const [dataIdToBeUpdated, setDataIdToBeUpdated]= useState("");
    const [students, setStudents]=useState([]);
    const [search, setSearch]=useState("");
    const [filter, setFilter]=useState("");

	const [addBoxState, setAddBoxState] = useState("none");
	const [editBoxState, setEditBoxState] = useState("none");
	const [bgopacity, setBackGroundOpacity] = useState("1");

    const usersCollection = collection(db,"users");
    const studentsCollection = collection(db,"students");

    async function getUsers() {
        const data = await getDocs(usersCollection); 
        var newUser = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
        setUsers(newUser);
    }
    async function getStudents() {
        const dataquery =  query(studentsCollection, orderBy("created", "asc"));
		const data =await getDocs(dataquery);
        var newStudent = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
        setStudents( newStudent);
    }

    useEffect(() => async function() {
        
		await getStudents();
    },[]);

	const filterSubmit = async(e)=>{
		e.preventDefault();
		await getStudents();
		if(filter===""){
			getStudents();
		}
		else{

			const data = query(studentsCollection, where("grade","==",`${filter}`));
			const filterData = onSnapshot(data,(snapshot)=> setStudents(snapshot.docs.map(doc=>({...doc.data(), id:doc.id}))));
			return(filterData);
			// setFilter("");
		}

		// students.orderByValue("grade").equalTo(filter)
        // .then(snapshot => setStudents(snapshot.data()))

	}
    const searchSubmit = async(e)=>{
		e.preventDefault();
		await getStudents();
		if(search===""){
			getStudents();
		}
		else{

			const searchName=students.filter(function(st){ return st.name.includes(search); })
			console.log(searchName);
			setStudents(searchName);
		}
		

    }
	async function closeOnClick(){
		setAddBoxState("none");
		setEditBoxState("none");
		setBackGroundOpacity("1");
		getStudents("");
	}
	async function edithandle(item){
		setEditBoxState("flex");
		setBackGroundOpacity("0.4")
		setNewEmail(item.email);
		setNewGender(item.gender);
		setNewGrade(item.grade);
		setNewKhoa(item.khoa);
		setNewMsv(item.msv);
		setNewPic(item.pic);
		setNewStuName(item.name);
	}
	async function viewhandle(item){
		setPic(item.pic);
		setGender(item.gender);
		setMsv(item.msv);
		setStuName(item.name);
		setEmail(item.email);
		setKhoa(item.khoa);
		setGrade(item.grade);
	}
	
	async function checkIfStuExist() {
		await getStudents();
		for(var i=0; i< students.length; i++){
			console.log(students[i].email)
			if (email === students[i].email ){
				return 1; 
			}
		}
		return 0;
	}
	async function checkIfMsvExist() {
		await getStudents();
		for(var i=0; i< students.length; i++){
			console.log(students[i].msv)
			if (msv === students[i].msv ){
				return 1; 
			}
		}
		return 0;
	}
	const addOnClick =()=>{
		setAddBoxState("flex");
		setBackGroundOpacity("0.4");
	}
	const addData = async(e)=>{
		e.preventDefault();
		const cur2= await checkIfMsvExist();
		if(!stuName ){
			setNotify("Please fill in student name!")
		}
		else if(!email ){
			setNotify("Please fill in email!")
		}
		else if(cur2){
			setNotify("MSV already exist ")
		}
		else if(!khoa ){
			setNotify("Please fill in khoa!")
		}
		else if(!grade ){
			setNotify("Please fill in grade!")
		}
		else{
			const cur = await checkIfStuExist(); 
			if(!cur) {
				await db.collection("students").add({
					name: stuName,
					msv: msv,
					email: email,
					pic: pic,
					gender: e.target.gender_type.value,
					grade:grade,
					khoa: khoa,
					created: serverTimestamp(),
				})
				console.log("success");
				getStudents();
				closeOnClick();
			} 
			else {
				setNotify("Account already exist. Please choose another one!");
			}
		}
		setNotify("");
		setEmail("");
	}
	const updateData =async (e)=>{
		e.preventDefault();
		if(email=== newEmail){
			setNotify("Email already exist. Please choose another one!")
		}
		else{
			const stuDoc = doc(db, "students", dataIdToBeUpdated); 
			await updateDoc(stuDoc,{
				name: newStuName,
				msv: newMsv,
				email: newEmail,
				pic: newPic,
				gender: e.target.newgender_type.value,
				grade:newGrade,
				khoa: newKhoa,
			})
		console.log(" updated")
		getStudents();
		closeOnClick();
		}
		setDataIdToBeUpdated("");
		// getStudents();
	}
    const deleteStudent = async (id)=>{
        const studentDoc = doc(db, "students", id); 
        var result = await confirm("Want to delete?");
        if (result) {
        await deleteDoc(studentDoc);
		getStudents();
        }else{
            console.log("no")
        }
}
    return (
        <div >
            <Header/>
            
            <div className="liststudents-display container-fluid" style={{"opacity":bgopacity}}>
				<div className="liststudents-title">
					<h1>List Students</h1>
				</div>
				<div className="action">
					<div className="add-student">
						<button type="button" class="btn btn-primary" onClick={addOnClick}>
							Add
						</button>
					</div>
					<form onClick={filterSubmit} className="filter-student" >
						<select className="btn" name="grade_filter" onChange={(e)=>setFilter(e.target.value)} value={filter} >
							<option value="" >Select Grade</option>
							<option value="KHMT">KHMT</option>
							<option value="CNTT">CNTT</option>
							<option value="QTKD">QTKD</option>
						</select>
					</form>
					
					<div className="search-student">
						<form onSubmit={searchSubmit} >
							<input onChange={(e) => setSearch(e.target.value)}  value={search} type="text" placeholder="Search" />
							<i onClick={searchSubmit} class="fa-solid fa-magnifying-glass" type="submit" value="search"></i>
							<hr/>
						</form>
					</div>
				</div>
				
				<div className="listusers-table container-fluid">
					<table id="admin">
						<tr>
							<th >STT</th>
							<th >MSV</th>
							<th >Tên</th>
							<th >Giới tính</th>
							<th >Lớp</th>
							<th >Action</th>
						</tr>
					{students && (<>
						{students.map((student, index)=>{
						return(
								<tr >
									<td >{index + 1}</td>
									<td >{student.msv}</td>
									<td >{student.name}</td>
									<td >{student.gender}</td>
									<td >{student.grade}</td>
									<td >
									
										<button onClick = {() => {viewhandle(student); setDataIdToBeUpdated(student.id)}} data-bs-toggle="modal" data-bs-target="#viewModal" ><i class="fa-solid fa-eye"></i></button>
										<button onClick = {() => {edithandle(student); setDataIdToBeUpdated(student.id);}} type="button"  ><i class="fa-solid fa-pen-to-square"></i></button>
										<button onClick={()=>deleteStudent(student.id)}><i class="fa-solid fa-trash-can"></i></button>
										
									</td>
								</tr>
							)
						})}
					</>)}
					
						</table>
				</div>
			</div>
			<div className="add-form" style={{"display":addBoxState}} >
				
					<div class="modal-dialog addModal ">
						<div class="modal-content">
							<div class="modal-header">
								<h4 class="modal-title">Add Student</h4>
								<button type="button" class="btn-close" onClick={closeOnClick}></button>
							</div>
							<div class="modal-body">
								<form onSubmit={addData} >
									<div className="add__form ">
										<input type="text" placeholder="URLpic"  value={pic} onChange={(e) => setPic(e.target.value)}/>
										<hr/>
										<input type="text" placeholder="Student Name"  value={stuName} onChange={(e) => setStuName(e.target.value)}/>
										<hr/>
										<select id="numberToSelect" name="gender_type"  >
											<option value="">Gender</option>
											<option value="Female">Female</option>
											<option value="Male">Male</option>
										</select>
										<hr/>
										<input type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
										<hr/>
										<input type="text" placeholder="MSV"  value={msv} onChange={(e) => setMsv(e.target.value)}/>
										<hr/>
										<input type="text" placeholder="Khoa"  value={khoa} onChange={(e) => setKhoa(e.target.value)}/>
										<hr/>
										<input type="text" placeholder="Grade"  value={grade} onChange={(e) => setGrade(e.target.value)}/>
										<hr/>
										<p class="notify-p">{notify}</p>
									</div>
									<div className="action-add">

									<input type="submit" value="Add" className="button-add"/>
									{/* <button type="button" class="btn btn-danger" onClick={closeOnClick}>Cancel</button> */}
									</div>
								</form>
							</div>
						</div>
					</div>
				
			</div>
			<div className="add-form" style={{"display":editBoxState}} >
				
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h4 class="modal-title">Edit</h4>
								<button type="button" class="btn-close" onClick={closeOnClick}></button>
							</div>
							<div class="modal-body">
								<form onSubmit={updateData} >
									<div className="add__form ">
										<input type="text" placeholder="URLpic"  value={newPic} onChange={(e) => setNewPic(e.target.value)}/>
										<hr/>
										<input type="text" placeholder="Student Name"  value={newStuName} onChange={(e) => setNewStuName(e.target.value)} required/>
										<hr/>
										<select id="numberToSelect" name="newgender_type" >
														<option value="">Gender</option>
														<option value="Female">Female</option>
														<option value="Male">Male</option>
										</select>
										<hr/>
										<input type="email" placeholder="Email"  value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/>
										<hr/>
										<input type="text" placeholder="MSV"  value={newMsv} onChange={(e) => setNewMsv(e.target.value)}/>
										<hr/>
										<input type="text" placeholder="Khoa"  value={newKhoa} onChange={(e) => setNewKhoa(e.target.value)}/>
										<hr/>
										<input type="text" placeholder="Grade"  value={newGrade} onChange={(e) => setNewGrade(e.target.value)}/>
										<hr/>
										<p class="notify-p">{notify}</p>
									</div>
									<div className="action-add">

										<input type="submit" value="Edit" className="button-add"  />
									</div>
										{/* <button type="button" class="btn btn-danger" onClick={closeOnClick}>Cancel</button> */}
								</form>
							</div>
						</div>
					</div>
				
				
			</div>
			<div className="profile-display " >
				<div class="modal fade " id="viewModal">
					<div class="modal-dialog">
						<div class="modal-content profile-modal">
						<div class="modal-header header-profile">
							<h4 class="modal-title ">Profile</h4>
							<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
						</div>
						<div class="modal-body">
							<div className="stu_avatar" >
								<img style={{"height":"170px", "width":"170px"}} src={pic}></img>
							</div>
							<div className="profile_details">
								<p>Mã sinh viên: {msv} </p>
								<hr/>
								<p>Họ tên: {stuName} </p>
								<hr/>
								<p>Giới tính: {gender}</p>
								<hr/>
								<p>Email: {email} </p>
								<hr/>
								<p>Khoa: {khoa} </p>
								<hr/>
								<p>Lớp: {grade} </p>
								<hr/>
							</div>
						</div>

					</div>
				</div>
			</div>

			</div>
        </div>
    );
}
export default Home;