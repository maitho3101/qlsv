import React, {useState, useEffect} from 'react';
import {ref, uploadBytes, listAll , getDownloadURL, list} from "firebase/storage";
import { storage } from '../firebase';
import { v4 } from 'uuid';
import Header from './header';
import "../css/welcome.css";
function Welcome(props) {
    // const storage = getStorage();
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);

    const imageListRef = ref(storage, "images/ ");
    const uploadImage =() =>{
        
        if(imageUpload == null) return;
        const imageRef = ref (storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot)=>{
            getDownloadURL(snapshot.ref).then((url)=>{
                setImageList((prev)=>[...prev, url]);
            });
        });
    };
    useEffect(()=>{
        listAll(imageListRef)
        .then((res)=>{
            res.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                    setImageList((prev)=>[...prev, url ]);
                });
            });
        });
    },[]);
    return (
        <div >
            <Header/>
            {/* <div className='welcome'>
                <h1 className='welcome-title' > WELCOME</h1>
            </div> */}
            {/* test upload file */}
                <div className="App">
                    <center>
                        <input type="file" onChange={(e)=>{setImageUpload(e.target.files[0]);}} />
                        <button onClick={uploadImage}>Upload</button>
                    </center>
                    {imageList.map((url)=>{
                        return <img src={url}/>
                    })}
                </div>
            {/* test upload file */}
        </div>
    );
}

export default Welcome;