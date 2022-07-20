import React, {useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";
import { confirm } from "react-confirm-box";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import { storage } from '../firebase';
import { v4 } from 'uuid';
import Header from "./header";
import "../css/home.css";
import db from "../firebase";
import Paginator from 'react-hooks-paginator';
import { collection, getDocs, doc, docs, updateDoc, deleteDoc,onSnapshot , where, query, orderBy , limit } from "firebase/firestore";
import {ref, uploadBytes, listAll , getDownloadURL, list, uploadString, deleteObject} from "firebase/storage";

import avatar from "../img/istockphoto-1223671392-170667a.jpg";
function ManageStudents (){
	const [imageUpload, eImageUpload] = useState(null);
    const [pic, setPic] = useState("");
	const [id, setId] = useState("");
	const [stuName, setStuName] = useState("");
	const [gender, setGender] = useState("");
	const [email, setEmail] = useState("");
	const [msv, setMsv] = useState("");
	const [khoa, setKhoa] = useState("");
	const [grade, setGrade] = useState("");
	const [bio, setBio] = useState("");
    const [newPic, setNewPic] = useState("");
	const [newStuName, setNewStuName] = useState("");
	const [newGender, setNewGender] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [newMsv, setNewMsv] = useState("");
	const [newKhoa, setNewKhoa] = useState("");
	const [newGrade, setNewGrade] = useState("");
	const [newBio, setNewBio] = useState("");
    const [users, setUsers]=useState([]);
	const [notify, setNotify] = useState("");
	const [dataIdToBeUpdated, setDataIdToBeUpdated]= useState("");
    const [students, setStudents]=useState([]);
    const [studentsDisplay, setStudentsDisplay]=useState([]);

	const pageLimit = 10;

	const [offset, setOffset] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentData, setCurrentData] = useState([]);

    const [search, setSearch]=useState("");
    const [filter, setFilter]=useState("");

	const [addBoxState, setAddBoxState] = useState("none");
	const [editBoxState, setEditBoxState] = useState("none");
	const [bgopacity, setBackGroundOpacity] = useState("1");

	const [image, setImage] = useState(null);
  	const [url, setURL] = useState("");
	const [data,setData] = useState();

    const usersCollection = collection(db,"users");
    const studentsCollection = collection(db,"students");

    async function getUsers() {
        const data = await getDocs(usersCollection); 
        var newUser = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
        setUsers(newUser);
    }
    async function getStudents() {
		//console.log("got data");
        const dataquery =  query(studentsCollection, orderBy("created", "desc"));
		const data =await getDocs(dataquery);
        const newStudent = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
        setStudents( newStudent);
		setStudentsDisplay(newStudent);
		 return newStudent
    }

    // useEffect(() => async function() {
        
	// 	await getStudents(id);
    // },[]);
	useEffect(() => async function(){
		try {
			await getStudents();
		} catch {
		} finally {
		}
	  }, []);
	useEffect(() => {
		setCurrentData(studentsDisplay.slice(offset, offset + pageLimit));
	  }, [offset, studentsDisplay]);
	async function updateListFilter (gradeFilter){
		// await getStudents();
		if(gradeFilter ===""){
			getStudents();
		}
		else{
			const data = query(studentsCollection, where("grade","==",`${gradeFilter}`));
			const filterData = onSnapshot(data,(snapshot)=> setStudentsDisplay(snapshot.docs.map(doc=>({...doc.data(), id:doc.id}))));
			return(filterData);
		}
	}
	async function updateFilterInput(e){
		var filterValue = e.target.value;
		setFilter(filterValue);
		await updateListFilter(filterValue);
	}
    async function updateListStudent(nameSearch) {
		await getStudents();
		// console.log(students);
		const searchName= await students.filter(function(st){ return st.name.includes(nameSearch); })
		//console.log(searchName);
		setStudentsDisplay(searchName);
    }
	
	async function updateSearchInput(e) {
		var searchValue = e.target.value;
		//console.log(searchValue);
		setSearch(searchValue);
		await updateListStudent(searchValue);
	}
	async function handleChangePic(e){
		// e.preventDefault();
		var picValue = e.target.files[0];
			setImage(picValue);
		await uploadImage(picValue)
	}
	async function uploadImage(namePic){
		const imageRef = ref (storage, `images/${namePic.name + v4()}`);
		
       await uploadBytes(imageRef, namePic).then((snapshot)=>{
            getDownloadURL(snapshot.ref).then((url)=>{
                setData((prev)=>({...prev,pic:url}));
            });
        });
		
	}
	
	async function closeOnClick(){
		setAddBoxState("none");
		setEditBoxState("none");
		setBackGroundOpacity("1");
		getStudents("");
		setNotify("");
		setEmail("");
		setPic("");
		setStuName("");
		setGender("");
		setMsv("");
		setKhoa("");
		setGrade("");
		setBio("");
		setURL("");
		setImage(null);
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
		setNewBio(item.bio);
	}
	async function viewhandle(item){
		setPic(item.pic);
		setGender(item.gender);
		setMsv(item.msv);
		setStuName(item.name);
		setEmail(item.email);
		setKhoa(item.khoa);
		setGrade(item.grade);
		setBio(item.bio);
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
			setNotify("Student ID already exist ")
		}
		else if(!khoa ){
			setNotify("Please fill in department!")
		}
		else if(!grade ){
			setNotify("Please fill in grade!")
		}
		else if(!bio ){
			setNotify("Please fill in bio!")
		}
		else{
			const cur = await checkIfStuExist(); 
			if(!cur) {
				await db.collection("students").add({
					name: stuName,
					msv: msv,
					email: email,
					gender: gender,
					grade:grade,
					khoa: khoa,
					bio:bio,
					created: serverTimestamp(),
					...data,
				})
				console.log("success");
				getStudents();
				closeOnClick();
			} 
			else {
				setNotify("Account already exist. Please choose another one!");
			}
		}
		// setNotify("");
		// setEmail("");
	}
	let navigate = useNavigate();
	async function handleViewDetailStudent(student){
        navigate(`/student/${student.id}`)
    }
	const updateData =async (e)=>{
		e.preventDefault();
		if(email=== newEmail){
			setNotify("Email already exist. Please choose another one!")
		}
		else{
			const stuDoc = doc(db, "students", dataIdToBeUpdated); 
			const updateStu = {name: newStuName,
				msv: newMsv,
				email: newEmail,
				gender: newGender,
				grade:newGrade,
				khoa: newKhoa,
				bio:newBio,
				...data,
			}
		await updateDoc(stuDoc,updateStu);
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
				<div className="liststudents-title ">
					<h1>List Students</h1>
				</div>
				<div className="action-student container-fluid">
					<div className="add-student">
						<button type="button" class="btn btn-primary" onClick={addOnClick}>
							Add
						</button>
					</div>
					<form className="filter-student" >
						<select className="btn" defaultValue="Select Grade" onChange={(e)=>updateFilterInput(e)} value={filter} >
							<option value="" >Select Grade</option>
							<option value="KHMT">KHMT</option>
							<option value="CNTT">CNTT</option>
							<option value="QTKD">QTKD</option>
						</select>
					</form>
					
					<div className="search-student">
						<form>
							<input onChange={(e) => updateSearchInput(e)}  value={search} type="text" placeholder="Search" />
							<i class="fa-solid fa-magnifying-glass" type="submit" value="search"></i>
							<hr/>
						</form>
					</div>
				</div>
				
				<div>
					<div className="listusers-table container-fluid">
						<table id="admin">
							<tr>
								<th >STT</th>
								<th >Student ID</th>
								<th >Student Name</th>
								<th >Gender</th>
								<th >Grade</th>
								<th >Action</th>
							</tr>
						{currentData && (<>
							{currentData.map((student, index)=>{
							return(
									<tr >
										<td >{index + 1}</td>
										<td >{student.msv}</td>
										<td >{student.name}</td>
										<td >{student.gender}</td>
										<td >{student.grade}</td>
										<td >
											<button className="action_button" onClick = {() => handleViewDetailStudent(student) }><i class="fa-solid fa-eye"></i></button>
											<button className="action_button" onClick = {() => {edithandle(student); setDataIdToBeUpdated(student.id);}} type="button"  ><i class="fa-solid fa-pen-to-square"></i></button>
											<button className="action_button" onClick={()=>deleteStudent(student.id)}><i class="fa-solid fa-trash-can"></i></button>
											
										</td>
									</tr>
								)
							})}
						</>)}
						
							</table>
					</div>
					<Paginator
						totalRecords={studentsDisplay.length}
						pageLimit={pageLimit}
						pageNeighbours={2}
						setOffset={setOffset}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
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
										<input type="file" onChange={(e)=>{handleChangePic(e)}} />
										<hr/>
										<input type="text" placeholder="Student Name"  value={stuName} onChange={(e) => setStuName(e.target.value)}/>
										<hr/>
										<select id="numberToSelect" name="gender_type" defaultValue="Gender" onChange={(e)=>setGender(e.target.value)} value={gender}>
											<option value="">Gender</option>
											<option value="Female">Female</option>
											<option value="Male">Male</option>
										</select>
										<hr/>
										<input type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
										<hr/>
										<input type="text" placeholder="Student ID"  value={msv} onChange={(e) => setMsv(e.target.value)}/>
										<hr/>
										<input type="text" placeholder="Department"  value={khoa} onChange={(e) => setKhoa(e.target.value)}/>
										<hr/>
										<input type="text" placeholder="Grade"  value={grade} onChange={(e) => setGrade(e.target.value)}/>
										<hr/>
										<textarea type="text" rows="5" cols="30" placeholder="Bio"  value={bio} onChange={(e) => setBio(e.target.value)}/>
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
										<input type="file" onChange={(e)=>{handleChangePic(e)}} />
										<hr/>
										<input type="text" placeholder="Student Name"  value={newStuName} onChange={(e) => setNewStuName(e.target.value)} required/>
										<hr/>
										<select id="numberToSelect" name="newgender_type" defaultValue="Gender" onChange={(e)=>setNewGender(e.target.value)} value={newGender}>
														<option value="">Gender</option>
														<option value="Female">Female</option>
														<option value="Male">Male</option>
										</select>
										<hr/>
										<input type="email" placeholder="Email"  value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/>
										<hr/>
										<input type="text" placeholder="Student Id"  value={newMsv} onChange={(e) => setNewMsv(e.target.value)}/>
										<hr/>
										<input type="text" placeholder="Department"  value={newKhoa} onChange={(e) => setNewKhoa(e.target.value)}/>
										<hr/>
										<input type="text" placeholder="Grade"  value={newGrade} onChange={(e) => setNewGrade(e.target.value)}/>
										<hr/>
										<textarea type="text" rows="5" cols="30" placeholder="Bio"  value={newBio} onChange={(e) => setNewBio(e.target.value)}/>
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
								<div>
									<p>Student ID: {msv} </p>
									<p>Student Name: {stuName} </p>
									<p>Email: {email} </p>
								</div>
								<div>
									<p>Gender: {gender}</p>
									<p>Department: {khoa} </p>
									<p>Grade: {grade} </p>
								</div>
							</div>
								<p className="modal-detail_bio"> Biography : {bio} </p>
						</div>

					</div>
				</div>
			</div>

			</div>
        </div>
    );
}
export default ManageStudents ;