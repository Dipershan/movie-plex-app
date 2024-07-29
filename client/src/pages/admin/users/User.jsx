import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../../../slices/userSlice";

const User = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = pathname.split("/")[3];

  const { user, status, error } = useSelector((state) => state.users);

  const [payload, setPayload] = useState({
    name: user?.name || "",
    email: user?.email || "",
    isActive: user?.isActive || true,
  });
  
  const [updateError, setUpdateError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    setUpdateError("");
    try {
      await dispatch(updateUser({ id: userId, payload })).unwrap();
      setSuccess("User updated successfully!");
      
      navigate("/admin/users");
    } catch (err) {
      setUpdateError("Failed to update user. Please try again.");
      
    }
  };

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    setPayload({
      name: user?.name || "",
      email: user?.email || "",
      isActive: user?.isActive || true,
    });
  }, [user]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="container">
        <div className="py-5 text-center">
          <h2>User Details</h2>
        </div>
        <div className="row">
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">User Information</h4>
            {updateError && <div className="alert alert-danger">{updateError}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form className="needs-validation" onSubmit={handleUpdate}>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label>First name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={payload.name}
                    onChange={(e) => {
                      setPayload((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }));
                    }}
                    required
                  />
                  <div className="invalid-feedback">Valid name is required.</div>
                </div>
              </div>
              <div className="mb-3">
                <label>
                  Email <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                  value={payload.email}
                  onChange={(e) => {
                    setPayload((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                />
                <div className="invalid-feedback">
                  Please enter a valid email address.
                </div>
              </div>
              <div className="d-block my-3">
                <select
                  className="form-select"
                  value={payload.isActive}
                  onChange={(e) => {
                    setPayload((prev) => ({
                      ...prev,
                      isActive: e.target.value === "true",
                    }));
                  }}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              <hr className="mb-4" />
              <button
                className="btn btn-primary btn-lg btn-block"
                type="submit"
                
              >
                
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
