import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProfil() {
    const {id} = useParams()
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get('http://localhost:8081/profil/'+id)
        .then(res => {
            console.log(res.data)
            setname(res.data[0].username)
            setemail(res.data[0].email)
            setpass(res.data[0].password)
        })
        .catch(err => console.log(err)) 
    }, [])

    const hundlUpdate = (e)=> {
        e.preventDefault()
        axios.put('http://localhost:8081/edit', {name, email, pass})
        .then(res => {
            console.log(res)
            navigate('/chatApp/profile')
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
                    onChange={e => setname(e.target.value)}
                    value={name}
                    label="Username"
                    variant="outlined"
                />
                
                <TextField
                    className="field"
                    id="email"
                    required
                    onChange={e => setemail(e.target.value)}
                    value={email}
                    type="email"
                    label="Email"
                    variant="outlined"
                />

                <TextField
                    className="field"
                    required
                    onChange={e => setpass(e.target.value)}
                    value={pass}
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