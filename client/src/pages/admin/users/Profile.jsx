import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../../../slices/profileSlice';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, error, status } = useSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState({});

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    setEditableProfile(profile);
  }, [profile]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await dispatch(updateProfile(editableProfile));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile({ ...editableProfile, [name]: value });
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleString() : 'N/A';
  };

  return (
    <div className="container mt-5">
      <div className="row mb-2">
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
            <h2>{profile.name || 'N/A'}</h2>
            <button className="btn btn-primary mt-3" onClick={handleEditClick}>
              Edit Profile
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <div className="border rounded overflow-hidden shadow-sm p-4">
            <h3>Information</h3>
            {isEditing ? (
              <>
                <div className="mb-2">
                  <p>Name:</p>
                  <input
                    className="form-control"
                    name="name"
                    value={editableProfile.name || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  <p>Email:</p>
                  <input
                    className="form-control"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={editableProfile.email || ''}
                    onChange={handleChange}
                  />
                </div>
                <button className="btn btn-success" onClick={handleSaveClick}>
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <p>Name: {profile.name || 'N/A'}</p>
                <p>Email: {profile.email || 'N/A'}</p>
                <p>Roles: {profile.roles ? profile.roles.join(', ') : 'N/A'}</p>
                <p>Email Verified: {profile.isEmailVerified ? 'Yes' : 'No'}</p>
                <p>Account Active: {profile.isActive ? 'Yes' : 'No'}</p>
                <p>Created At: {formatDate(profile.createdAt)}</p>
                <p>Updated At: {formatDate(profile.updatedAt)}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;








// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProfile, updateProfile } from '../../../slices/userSlice';
// import './Profile.css';

// const Profile = () => {
//   const dispatch = useDispatch();
//   const { profile, error } = useSelector((state) => state.profile);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editableProfile, setEditableProfile] = useState({});

//   useEffect(() => {
//     dispatch(getProfile()); // Assuming you need to pass an ID, adjust as necessary
//   }, [dispatch]);

//   useEffect(() => {
//     setEditableProfile(profile);
//   }, [profile]);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = async () => {
//     try {
//       await dispatch(updateProfile({ id: profile.id, payload: editableProfile }));
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating profile', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditableProfile({ ...editableProfile, [name]: value });
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row mb-2">
//         {/* Profile Info */}
//         <div className="col-md-3">
//           <div className="border rounded overflow-hidden shadow-sm p-4 text-center">
//             <svg
//               className="bd-placeholder-img rounded-circle mb-3"
//               width="140"
//               height="140"
//               xmlns="http://www.w3.org/2000/svg"
//               role="img"
//               aria-label="Placeholder"
//               preserveAspectRatio="xMidYMid slice"
//               focusable="false"
//             >
//               <title>Placeholder</title>
//               <rect width="100%" height="100%" fill="var(--bs-secondary-color)" />
//             </svg>
//             <h2>{profile.name}</h2>
//             <button className="btn btn-primary mt-3" onClick={handleEditClick}>
//               Edit Profile
//             </button>
//           </div>
//         </div>

//         {/* Main Profile Content */}
//         <div className="col-md-9">
//           <div className="border rounded overflow-hidden shadow-sm p-4">
//             <h3>Information</h3>
//             {isEditing ? (
//               <>
//                 <div className="mb-2">
//                   <p>Name:</p>
//                   <input
//                     className="form-control"
//                     name="name"
//                     value={editableProfile.name || ''}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <p>Email:</p>
//                   <input
//                     className="form-control"
//                     name="email"
//                     type="email"
//                     placeholder="you@example.com"
//                     value={editableProfile.email || ''}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <button className="btn btn-success" onClick={handleSaveClick}>
//                   Save Changes
//                 </button>
//               </>
//             ) : (
//               <>
//                 <p>Name: {profile.name}</p>
//                 <p>Email: {profile.email}</p>
//                 <p>Roles: {profile.roles && profile.roles.join(', ')}</p>
//                 <p>Email Verified: {profile.isEmailVerified ? 'Yes' : 'No'}</p>
//                 <p>Account Active: {profile.isActive ? 'Yes' : 'No'}</p>
//                 <p>Created At: {new Date(profile.createdAt).toLocaleString()}</p>
//                 <p>Updated At: {new Date(profile.updatedAt).toLocaleString()}</p>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;



