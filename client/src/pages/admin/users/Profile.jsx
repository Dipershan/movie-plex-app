


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; // Import the CSS file


const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    bio: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, []);



  const handleEditClick = () => {
    setIsEditing(true);
  };


const handleSaveClick = async () => {
    try {
      const { data } = await axios.put('/api/profile', profile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProfile(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };




  return (
    <div className="container mt-5">
    <div className="row mb-2">
      {/* Profile Info */}
      <div className="col-md-3">
        <div className="border rounded overflow-hidden shadow-sm p-4 text-center">
          <svg
            className="bd-placeholder-img rounded-circle mb-3"
            width="140"
            height="140"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="var(--bs-secondary-color)" />
          </svg>
          <h2>{profile.name}</h2>
          <button className="btn btn-primary mt-3" onClick={handleEditClick}>
            Edit Profile
          </button>
        </div>
      </div>

      {/* Main Profile Content */}
      <div className="col-md-9">
        {/* User Info */}
        <div className="border rounded overflow-hidden shadow-sm p-4">
          <h3>Information</h3>
          {isEditing ? (
            <>
              <p>Name:</p>
              <input
                className="form-control mb-2"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />         
              <p>Email:</p> 
              <input
                className="form-control mb-2"
                name="email"
                type = "email"
                 placeholder="you@example.com"
                value={profile.email}
                onChange={handleChange}
              />                        
              <button className="btn btn-success" onClick={handleSaveClick}>
                Save Changes
              </button>
            </>
          ) : (
            <>
              <p>Name: {profile.name}</p>
              
              <p>Email: {profile.email}</p>
              
              
            </>
          )}
        </div>
      </div>
    </div>
  </div>  );
};

export default Profile;
