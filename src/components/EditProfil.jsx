import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProfil() {
    const {id} = useParams()
    const [values, setValues] = useState({
        name:'',
        email:'',
        pass:''
    })
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get('http://localhost:8081/profil/'+id)
        .then(res => {
            console.log(res.data)
            setValues({...values, name: res.data[0].username, email: res.data[0].email, pass: res.data[0].password})
        })
        .catch(err => console.log(err))
    }, [])

    const hundlUpdate = (e)=> {
        e.preventDefault()
        axios.put('http://localhost:8081/edit/'+id, values)
        .then(res => {
            console.log(res)
            navigate('/profil')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <form onSubmit={hundlUpdate} className="login">
                <h1>Update Profil</h1>
                <TextField
                    className="field"
                    id="name"
                    required
                    onChange={e => setValues({...values, name: e.target.value})}
                    value={values.name}
                    label="Username"
                    variant="outlined"
                />
                
                <TextField
                    className="field"
                    id="email"
                    required
                    onChange={e => setValues({...values, email: e.target.value})}
                    value={values.email}
                    type="email"
                    label="Email"
                    variant="outlined"
                />

                <TextField
                    className="field"
                    required
                    onChange={e => setValues({...values, pass: e.target.value})}
                    value={values.pass}
                    type="password"
                    label="Password"
                    variant="outlined"
                />
                
                <Button type="submit" variant="contained">
                    Update
                </Button>
            </form>
        </div>
    );
}

export default EditProfil;