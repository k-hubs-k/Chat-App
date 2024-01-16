import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import image from "../assets/fdl.jpg"

const Profile = () => {
  // return <div className="profile">See your profile here...</div>;
  const {id} = useParams()
  const [user,setuser] = useState([])
  useEffect(()=>{
      axios.get('http://localhost:8081/profil/'+id)
      .then(res => {
          console.log(res.data);
          setuser(res.data[0])
      })
      .catch(err => console.log(err))
  }, [])

  return (
      <>
        <div className="wrapper">
            <div className="profil-top">
              <div className="profilImg">
                  <NavLink to={'../editprofil'} className="edit">Edit</NavLink>
                </div>
            </div>
            <div className="profil-bottom">
              <div className="profil-info">
                <div className="main-info">
                  <h3>{user.username}</h3>
                  <p className="age grey">26</p>
                </div>
                <p className="email">{user.email}</p>
                <p className="ville">Madagascar</p>
              </div>
              <div className="profil-stats">
                <div className="stats-item">
                  <p className="stat">38k</p>
                  <p className="grey">followers</p>
                </div>
                <div className="stats-item">
                  <p className="stat">20k</p>
                  <p className="grey">follow</p>
                </div>
                <div className="stats-item">
                  <p className="stat">1.8k</p>
                  <p className="grey">post</p>
                </div>
              </div>
            </div>
        </div>
        <div style={{display:"none"}}>
            <h2>user Detail</h2>
            <img src={image} alt="" className="profilImg" />
            <h2>{user.username}</h2>
            <h2>{user.email}</h2>
            <NavLink to={'../editprofil'} className="btn btn-info">Edit</NavLink>
            {/* <NavLink to={`/editprofil/${user.id}`} className="btn btn-info">Edit</NavLink> */}
        </div>
      </>
  );
};

export default Profile;
