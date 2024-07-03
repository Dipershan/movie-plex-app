import { useRef, useState } from "react";
import Logo from "../assets/logo.png";
import { instance } from '../utils/axios';
import { Notify } from '../components/Notify';
import { Link  ,  useNavigate} from 'react-router-dom';

const Register = () => {
    const navigate =  useNavigate();
    const [msg , setMsg] =  useState("");
    const [error , setError] =  useState("");
    const registerRef =  useRef();


    const handleRegister = async(e)=>{
      try {
        e.preventDefault();
        const form = registerRef.current;
        const payload =  new FormData(form);
       const {data} =  await instance.post("/users/register" , payload);
       setMsg(data?.msg);
       setTimeout(()=>{
          navigate("/login"); //redirect to email verification page
       } , 2000)

        
      } catch (err) {
       const errMsg = err?.response?.data?.msg || "Something went wrong!";
        setError(errMsg);
        
      }
      finally{
        setTimeout(()=>{
          setError("");
          setMsg();

        } , 3000)
      }
  
    }

    const handleImageError = (e) => {
        e.target.src = "https://pixlr.com/images/index/ai-image-generator-one.webp";
      };

  return (
    
    <div className="flex d-flex justify-content-center align-items-center vh-100">
    <div className="card shadow-lg mb-5" style={{ width: "450px" }}>
      <div className="card-body">
        <div className="text-center">
          <img src={Logo} alt="Movie Logo" onError={handleImageError} width="200px" />
        </div>
        <h1 className="text-center">Register</h1>
        {error && <Notify message={error} />}
          {msg && <Notify variant="success" message={msg} />}
        
        <form onSubmit={(e)=> handleRegister(e)} ref={registerRef}>
            <div className="mb-3">
              <label  className="form-label">Name</label>
              <input  className="form-control" name="name" required/>
             
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                required
                className="form-control"
                name="email"
                 />
              <div id="emailHelp" className="form-text">We will never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label  className="form-label">Password</label>
              <input type="password" className="form-control" name="password"  required/>
            </div>
            <div className="mb-3">
              <label  className="form-label">Profile Pictures</label>
              <input type="file" className="form-control" name="profile" />
            </div>

             <a 
             className="flex d-flex flex-row-reverse"
             style={{textDecoration: "none" , cursor:"pointer"}}

            >Forgot password?</a>
            <hr/>
            <div className="text-center">
              <a 
              className="flex"
             style={{textDecoration: "none" , cursor:"pointer"}}
             href="./register.html" 
             >Login </a>
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
      </div>
      <hr />
      <div className="text-center">
        <Link
          className="flex"
          style={{ textDecoration: "none", cursor: "pointer" }}
          to="/login"
        >
          Login
        </Link>
      </div>
    </div>
  </div>

  )
}

export default Register;