import React, {useState, useEffect} from "react";
import { confirm } from "react-confirm-box";
import Header from "./header";
import "../css/home.css";
import db from "../firebase";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

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
    const [newUserName, setNewUserName]=useState([]);
    const [newPassword, setNewPassword]=useState([]);
	const [notify, setNotify] = useState("");
	const [dataIdToBeUpdated, setDataIdToBeUpdated]= useState("");
    const [searchStudent, setSearchStudent]=useState("");
    const [students, setStudents]=useState([]);

	const [viewProfileState, setViewAddProfileBox]=useState("none");
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

    const searchSubmit = async()=>{
        console.log("search");
    }
	async function closeOnClick(){
		
		setEditProfileBox("none");
		setAddProfileBox("none");
		setViewAddProfileBox("none");
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
	async function addhandle(item){
		setAddProfileBox("flex");
	}
	async function viewhandle(item){
		setViewAddProfileBox("flex");
	}
	async function showInfoHandle(item){
		setInfoBox("flex");
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
			await updateDoc(stuDoc,{
				name: newStuName,
				msv: newMsv,
				email: newEmail,
				pic: newPic,
				gender: e.target.newgender_type.value,
				grade:newGrade,
				khoa: newKhoa,
			})
		console.log("password updated")
		}
		setDataIdToBeUpdated("");
	}
    const deleteStudent = async (id)=>{
        const studentDoc = doc(db, "students", id); 
        var result = await confirm("Want to delete?");
        if (result) {
        await deleteDoc(studentDoc);
        }else{
            console.log("no")
        }
}
    return (
        <div>
            <Header/>
            
            <div className="liststudents-display">
				<h1>List Students</h1>
				<div className="search_student">
					<input onChange={(e) => setSearchStudent(e.target.value)} type="text" placeholder="Search" />
					<i onClick={searchSubmit} class="fa-solid fa-magnifying-glass" type="submit" value="search"></i>
				</div>
				<div className="add-student">
					<button onClick={addhandle}><i class="fa-solid fa-plus"></i></button>
					
				</div>
				<div className="listusers-table">
					<table id="admin">
						<tr>
							<th >STT</th>
							<th >MSV</th>
							<th >Tên</th>
							<th >Email</th>
							<th >Action</th>
						</tr>
					{students.map((student, index)=>{
						return(
								<tr >
									<td >{index + 1}</td>
									<td >{student.msv}</td>
									<td >{student.name}</td>
									<td >{student.email}</td>
									<td >
										
										<button onClick = {() => {viewhandle(student); setDataIdToBeUpdated(student.id)}} ><i class="fa-solid fa-eye"></i></button>
										<button onClick = {() => {edithandle(student); setDataIdToBeUpdated(student.id)}} ><i class="fa-solid fa-pen-to-square"></i></button>
										<button onClick={()=>deleteStudent(student.id)}><i class="fa-solid fa-trash-can"></i></button>
										
									</td>
								</tr>
							)
						})}
						</table>
				</div>
			</div>
			<div className="add-form" style={{"display":addProfileState}}>
				<div>
				<p>Add Student</p>
				<button class="close-button" onClick={closeOnClick}  >X</button>
				</div>
				<form onSubmit={addData} >
					<div className="add__form ">
						<input type="text" placeholder="URLpic"  value={pic} onChange={(e) => setPic(e.target.value)}/>
						<input type="text" placeholder="Student Name"  value={stuName} onChange={(e) => setStuName(e.target.value)} required/>
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
						<input type="submit" value="Add" />
					</div>
				</form>
			</div>
			<div className="edit-form" style={{"display":editProfileState}}>
				<p>Edit profile</p>
				<button class="close-button" onClick={closeOnClick} >X</button>
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
						<input type="submit" value="Edit" />
					</div>
				</form>
			</div>
			<div className="profile-display" style={{"display":viewProfileState}}>
						ha
			</div>
        </div>
    );
}
export default Home;