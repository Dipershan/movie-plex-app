import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getUser, updateUser } from '../../../slices/userSlice';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const userId = pathname.split("/")[3]; 

  const { user, status, error } = useSelector((state) => state.users);

  const [payload, setPayload] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  


  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    } else {
      const authUser = JSON.parse(localStorage.getItem("currentUser"));
      dispatch(getUser(authUser.id));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setPayload({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUpdateError('');
    try {
      const authUser = JSON.parse(localStorage.getItem("currentUser"));

      const userId = authUser.id
      await dispatch(updateUser({ id: userId, payload })).unwrap();
      setSuccess('Profile updated successfully!');
      dispatch(getUser(authUser.id));
      setIsEditing(false)
      
    } catch (err) {
      setUpdateError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          
            <img
              className="bd-placeholder-img rounded-circle mb-3"
              width="140"
              height="140"
              src="https://image.freepik.com/free-vector/businessman-profile-cartoon_18591-58479.jpg"
              alt="Profile"
            />
            <h2>{payload.name || 'N/A'}</h2>
            <button className="btn btn-primary mt-3" onClick={handleEditClick}>
              Edit Profile
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <div className="border rounded overflow-hidden shadow-sm p-4">
            <h3>Information</h3>
            {updateError && <div className="alert alert-danger">{updateError}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            {isEditing ? (
              <form onSubmit={handleSaveClick}>
                <div className="mb-2">
                  <p>Name:</p>
                  <input
                    className="form-control"
                    name="name"
                    value={payload.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <p>Email:</p>
                  <input
                    className="form-control"
                    name="email"
                    type="email"
                    value={payload.email}
                    onChange={handleChange}
                  />
                </div>
                <button className="btn btn-success" type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </form>
            ) : (
              <>
                <p>Name: {payload.name || 'N/A'}</p>
                <p>Email: {payload.email || 'N/A'}</p>
                <p>Roles: {user?.roles?.join(', ') || 'N/A'}</p>
                <p>Email Verified: {user?.isEmailVerified ? 'Yes' : 'No'}</p>
                <p>Account Active: {user?.isActive ? 'Yes' : 'No'}</p>
                <p>Created At: {formatDate(user?.createdAt)}</p>
                <p>Updated At: {formatDate(user?.updatedAt)}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
