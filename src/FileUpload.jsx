import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function FileUpdate() {
    const [file, setFile] = useState()
    const [data, setData] = useState([])
    const navigate = useNavigate();

    useEffect( () => {
        axios.get('http://localhost:8081/')
        .then(res => {
            setData(res.data)
            console.log(res.data); 
        })
        .catch(err => console.log(err));
    }, [])

    const hundlUpload = () => {
        const formdata = new FormData();
        formdata.append('image',file)
        axios.post('http://localhost:8081/upload', formdata, { headers: {'Content-Type': 'multipart/form-data'}})
        .then(res => {
            if (res.data.Status === "Succes") {
                console.log("succes");
                navigate('/chatApp/profile')
            } else {
                console.log("failed");
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <>
            <div className='container'>
                <input 
                    filename={file}
                    type="file"
                    onChange={e => setFile(e.target.files[0])}
                    accept="image/*"
                />
                <button onClick={hundlUpload}>upload</button>
            </div>
            <br />
        </>
    )
}

export default FileUpdate