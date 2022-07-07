import React, {useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";
import { confirm } from "react-confirm-box";
import Header from "./header";
import "../css/home.css";
import db from "../firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc,onSnapshot , where, query, orderBy , limit } from "firebase/firestore";

function Home(){
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
    const [search, setSearch]=useState("");
    const [students, setStudents]=useState([]);

	const [viewProfileState, setViewProfileBox]=useState("none");
	const [addProfileState, setAddProfileBox]=useState("none");
	const [editProfileState, setEditProfileBox]=useState("none");
	const [infoState, setInfoBox] = useState("none");

    const usersCollection = collection(db,"users");
    const studentsCollection = collection(db,"students");

    async function getUsers() {
        const data = await getDocs(usersCollection); 
        var newUser = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
        setUsers(newUser);
    }
    async function getStudents() {
        const data = await getDocs(studentsCollection); 
        var newStudent = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
        setStudents(newStudent);
    }

    useEffect(() => async function() {
        
		await getStudents();
    },[]);

	let navigate = useNavigate();
    const searchSubmit = async(e)=>{
		e.preventDefault();
        
    }
	async function closeOnClick(){
		
		setEditProfileBox("none");
		setAddProfileBox("none");
		setViewProfileBox("none");
		getStudents();
	}
	async function edithandle(item){
		setEditProfileBox("flex");
		setNewEmail(item.email);
		setNewGender(item.gender);
		setNewGrade(item.grade);
		setNewKhoa(item.khoa);
		setNewMsv(item.msv);
		setNewPic(item.pic);
		setNewStuName(item.name);
	}
	async function viewhandle(item){
		setViewProfileBox("flex");
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
			if (email === students[i].email ){
				return 1; 
			}
		}
		return 0;
	}
	const addData = async(e)=>{
		e.preventDefault();
		if(!email ){
			setNotify("Please fill in email!")
		}
		// else if (!userName ){
		// 	setNotify("Please fill in userName!")
		// }
		// else if (!msv ){
		// 	setNotify("Please fill in msv!")
		// }
		// else if (!password ){
		// 	setNotify("Please fill in password!")
		// }
		// else if (password !== confPassword) {
		// 	setNotify("Password doesn't match!")
		// }
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
				})
				console.log("success");
				closeOnClick();
				// window.location.href = '/login';
			} 
			else {
				console.log("Account already exist. Please choose another one!");
			}
		}
	}
	const updateData =async (e)=>{
		e.preventDefault();
		if(email=== "a@gmail.com"){
			console.log("fff")
		}
		else{
			const stuDoc = doc(db, "students", dataIdToBeUpdated); 
			console.log(stuDoc);
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
            
            <div className="liststudents-display container-fluid">
				<h1>List Students</h1>
				<form onSubmit={searchSubmit}>
					<input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder="Search" />
					{/* <i onClick={searchSubmit} class="fa-solid fa-magnifying-glass" type="submit" value="search"></i> */}
				</form>
				<div className="add-student">
					<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
						Add
					</button>
				</div>
				
				<div className="listusers-table container-fluid">
					<table id="admin">
						<tr>
							<th >STT</th>
							<th >MSV</th>
							<th >Tên</th>
							<th >Giới tính</th>
							<th >Khoa</th>
							<th >Action</th>
						</tr>
					{students.map((student, index)=>{
						return(
								<tr >
									<td >{index + 1}</td>
									<td >{student.msv}</td>
									<td >{student.name}</td>
									<td >{student.gender}</td>
									<td >{student.khoa}</td>
									<td >
									
										<button onClick = {() => {viewhandle(student); setDataIdToBeUpdated(student.id)}} data-bs-toggle="modal" data-bs-target="#viewModal" ><i class="fa-solid fa-eye"></i></button>
										<button onClick = {() => {edithandle(student); setDataIdToBeUpdated(student.id)}} type="button"  data-bs-toggle="modal" data-bs-target="#editModal" ><i class="fa-solid fa-pen-to-square"></i></button>
										<button onClick={()=>deleteStudent(student.id)}><i class="fa-solid fa-trash-can"></i></button>
										
									</td>
								</tr>
							)
						})}
						</table>
				</div>
			</div>
			<div className="add-form" >
				<div class="modal fade" id="addModal">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h4 class="modal-title">Add Student</h4>
								<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
							</div>
							<div class="modal-body">
								<form onSubmit={addData} >
									<div className="add__form ">
										<input type="text" placeholder="URLpic"  value={pic} onChange={(e) => setPic(e.target.value)}/>
										<input type="text" placeholder="Student Name"  value={stuName} onChange={(e) => setStuName(e.target.value)}/>
										<select id="numberToSelect" name="gender_type" onchange="selectNum()">
														<option value="">Gender</option>
														<option value="Female">Female</option>
														<option value="Male">Male</option>
										</select>
										<input type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
										<input type="text" placeholder="MSV"  value={msv} onChange={(e) => setMsv(e.target.value)}/>
										<input type="text" placeholder="Khoa"  value={khoa} onChange={(e) => setKhoa(e.target.value)}/>
										<input type="text" placeholder="Grade"  value={grade} onChange={(e) => setGrade(e.target.value)}/>
										<p class="notify-p">{notify}</p>
									</div>
									<input type="submit" value="Add" class="btn btn-danger" data-bs-dismiss="modal" />
									<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="edit-form" >
				<div class="modal fade" id="editModal">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h4 class="modal-title">Edit</h4>
								<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
							</div>
							<div class="modal-body">
								<form onSubmit={updateData} >
									<div className="add__form ">
										<input type="text" placeholder="URLpic"  value={newPic} onChange={(e) => setNewPic(e.target.value)}/>
										<input type="text" placeholder="Student Name"  value={newStuName} onChange={(e) => setNewStuName(e.target.value)} required/>
										<select id="numberToSelect" name="newgender_type" onchange="selectNum()">
														<option value="">Gender</option>
														<option value="Female">Female</option>
														<option value="Male">Male</option>
										</select>
										<input type="email" placeholder="Email"  value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/>
										<input type="text" placeholder="MSV"  value={newMsv} onChange={(e) => setNewMsv(e.target.value)}/>
										<input type="text" placeholder="Khoa"  value={newKhoa} onChange={(e) => setNewKhoa(e.target.value)}/>
										<input type="text" placeholder="Grade"  value={newGrade} onChange={(e) => setNewGrade(e.target.value)}/>
										<p class="notify-p">{notify}</p>
									</div>
										<input type="submit" value="Edit" class="btn btn-danger" data-bs-dismiss="modal" />
										<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
								</form>
							</div>
						</div>
					</div>
				</div>
				
			</div>
			<div className="profile-display" >
				<div class="modal fade" id="viewModal">
					<div class="modal-dialog">
						<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title">Profile</h4>
							<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
						</div>
						<div class="modal-body">
							<div className="stu_avatar" >
								<img src="#"/>
							</div>
							<div className="profile_details">
								<p>Mã sinh viên: {msv} </p>
								<p>Họ tên: {stuName} </p>
								<p>Giới tính: {gender}</p>
								<p>Email: {email} </p>
								<p>Khoa: {khoa} </p>
								<p>Lớp: {grade} </p>
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