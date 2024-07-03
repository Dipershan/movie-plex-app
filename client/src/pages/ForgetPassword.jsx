import { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate  } from 'react-router-dom';
import {instance}  from '../utils/axios';
import { Notify } from '../components/Notify';

const ForgetPassword = () => {
  const navigate =  useNavigate();
  const [email , setEmail]= useState("");
  const [msg , setMsg]= useState("");
  const [error , setError]= useState("");


  const handelFP = async(e)=>{
    try {
      e.preventDefault();  
      const {data}   =  await instance.post("/users/forget-password-token" , {email});
      const {data: status , msg} = data;

      setMsg(msg);
      if(status){
        setTimeout(()=>{
          navigate("/verify-password" , {state : {email}})
        } ,2000)
      }
    } catch (err) {
      const errMsg =  
      err?.response?.data?.msg || "Something went wrong.Try again!";
      setError(errMsg);      
    }
    finally{
      setTimeout(()=>{
        setError("");
        setMsg("")
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
        <h1 className="text-center">Forget Password</h1>
        {error && <Notify message={error} />}
        {msg && <Notify variant="sucess" message={msg}/>}
    
        
          <form onSubmit={(e)=>handelFP(e)}>
            <div className="mb-3">
              <label  className="form-label">Email</label>
              <input  className="form-control" type="email"
              onChange={(e)=> setEmail(e.target.value)} 
              required />
             
            </div>           
            <button type="submit" className="btn btn-primary">Get Token</button>


      </form >
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

export default ForgetPassword