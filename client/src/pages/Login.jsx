import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.png";
import { useEffect, useState } from 'react';
import { instance } from '../utils/axios';
import { setToken } from '../utils/storage';

import { Notify } from '../components/Notify';

const Login = () => {
  const navigate =  useNavigate();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleImageError = (e) => {
    e.target.src = "https://pixlr.com/images/index/ai-image-generator-one.webp";
  };

  const handleLogin = async (e) => {
    
    try {
      e.preventDefault();
      const { data } = await instance.post("/users/login", payload);
      const { data: userInfo , msg } = data;
      setMsg(msg);
      setToken("access_token", userInfo?.token);
      setToken ("currentUser",{
        name: userInfo?.name,
        email: userInfo?.email,
        id: userInfo?.id,
      });
      if(localStorage.getItem("redirectUrl")){
        navigate(localStorage.getItem("redirectUrl"));
      }else{
        navigate("admin");
      }
    } catch (err) {
      const errMsg = err?.response?.data?.msg || 'Something went wrong.Try again!';
      setError(errMsg);
    } finally {
      setTimeout(() => {
        setError("");
        setMsg("");
      }, 3000);
    }
  };

  useEffect(()=>{
    const token =  localStorage.getItem("access_token");
    console.log(token);
    if(token){
      navigate("/admin" , {replace:true});
    }
  },[navigate]);
  
  return (
    <div className="flex d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg mb-5" style={{ width: "450px" }}>
        <div className="card-body">
          <div className="text-center">
            <img src={Logo} alt="Movie Logo" onError={handleImageError} width="200px" />
          </div>
          <h1 className="text-center">LOGIN</h1>
          {error && <Notify message={error} />}
          {msg && <Notify variant="success" message={msg} />}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                required
                className="form-control"
                onChange={(e) => setPayload((prev) => ({ ...prev, email: e.target.value }))}
              />
              <div id="emailHelp" className="form-text">We will never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                required
                className="form-control"
                onChange={(e) => setPayload((prev) => ({ ...prev, password: e.target.value }))}
              />
            </div>
            <Link
              className="flex d-flex flex-row-reverse"
              to="/forget-password"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              Forgot password?
            </Link>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <hr />
        <div className="text-center">
          <Link
            className="flex"
            style={{ textDecoration: "none", cursor: "pointer" }}
            to="/register"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
