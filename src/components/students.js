import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./header";
import "../css/students.css";
import "../css/home.css";
import db from "../firebase";
import { confirm } from "react-confirm-box";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import { collection, getDocs, doc, docs, updateDoc, deleteDoc,onSnapshot , where, query, orderBy , limit } from "firebase/firestore";

function Students(props) {
    const [imageUpload, eImageUpload] = useState(null);
    const [pic, setPic] = useState("");
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

    const [search, setSearch]=useState("");
    const [filter, setFilter]=useState("");

	const [addBoxState, setAddBoxState] = useState("none");
	const [editBoxState, setEditBoxState] = useState("none");
	const [bgopacity, setBackGroundOpacity] = useState("1");

    const usersCollection = collection(db,"users");
    const studentsCollection = collection(db,"students");

    async function getStudents() {
        const data = await getDocs(studentsCollection); 
        var newStudent = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
        setStudents(newStudent);
        setStudentsDisplay(newStudent);
    }
    useEffect(() => async function() {
		await getStudents();
    },[]);
    let navigate = useNavigate();
    async function handleViewDetailStudent(student){
        navigate(`/student/${student.id}`)
    }
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
					pic: pic,
					gender: gender,
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
		// setNotify("");
		// setEmail("");
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
				gender: newGender,
				grade:newGrade,
				khoa: newKhoa,
				bio:bio,
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
    const CardProfile = ()=>{
        return(
            studentsDisplay.map((student, index)=>
                (
                    <div className=" profile-display">
                        <div className="profile-content">
                            <div className="stu_avatar " >
                                    <img className="rounded-circle" style={{"height":"80px", "width":"80px"}} src={student.pic}></img>
                            </div>
                            <div className="stu-info ">
                                <p className="stu-name">{student.name}</p>
                                <p>{student.gender}</p>
                                <p>{student.msv}</p>
                                <p>{student.grade}</p>
                                
                            </div>
                            <div className="stu-action">
                                <button onClick = {() => handleViewDetailStudent(student) }><i class="fa-solid fa-eye"></i></button>
                                <button onClick = {() => {edithandle(student); setDataIdToBeUpdated(student.id);}} type="button"  ><i class="fa-solid fa-pen-to-square"></i></button>
								<button onClick={()=>deleteStudent(student.id)}><i class="fa-solid fa-trash-can"></i></button>
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
            <div className="liststudents-gridview container-fluid">
                <CardProfile></CardProfile>
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
										<input type="text" placeholder="URLpic"  value={newPic} onChange={(e) => setNewPic(e.target.value)}/>
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
        </div>
    );
}

export default Students;