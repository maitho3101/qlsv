import { confirm } from "react-confirm-box";
import db from "../firebase";
import { collection, getDocs, doc, docs, updateDoc, deleteDoc,onSnapshot , where, query, orderBy , limit } from "firebase/firestore";

const studentsCollection = collection(db,"students");

export async function getDataStudents() {
    const dataquery =  query(studentsCollection, orderBy("created", "desc"));
    const data =await getDocs(dataquery);
    const newStudent = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
    
     return newStudent
}