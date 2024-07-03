import { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import { instance } from "../utils/axios";

const VerifyPassword = () => {
  const {state} = useLocation();
  const navigate =  useNavigate();
  const [msg , setMsg]= useState("");
  const [error , setError]= useState("");


  const [payload ,  setPayload]= useState({
    email : state?.email || "",
    otp:"",
    newPassword:"",
  })

    const handleImageError =async (e) => {
        e.target.src = "https://pixlr.com/images/index/ai-image-generator-one.webp";
      };

    const handleFPChange = async(e)=>{
        e.preventDefault();
        try {
            const {data} =  await instance.post("/users/forget-password" , payload);
            const {data: status , msg} = data;

            setMsg(msg);
            if(status){
              setTimeout(()=>{
                navigate("/login" , {replace:true})
              } ,2000);
            }
          
        } catch (err) {
          const errMsg = 
          err?.response?.data?.msg || "Something wwent wrong. try again!";
          setError(errMsg);
        }
        finally{
          setTimeout(()=>{
            setError("");
            setMsg("")
          },3000)

        }

      }

    useEffect(()=>{
      if(!state?.email){
        navigate("/login" , {replace: true});
      }
    },[navigate , state?.email])
  return (
    <div className="flex d-flex justify-content-center align-items-center vh-100">
    <div className="card shadow-lg mb-5" style={{ width: "450px" }}>
      <div className="card-body">
        <div className="text-center">
        <img src={Logo} alt="Movie Logo" onError={handleImageError} width="200px" />
        </div>
        <h1 className="text-center">Verify Password</h1>
    
        
        <form onSubmit={(e)=>handleFPChange(e)}>
            <div className="mb-3">
              <label  className="form-label">Email address</label>
              <input  className="form-control" disabled value={state?.email}/>
             
            </div>
            <div className="mb-3">
              <label  className="form-label">Token</label>
              <input type="text" className="form-control"
               onChange={(e)=>{
                setPayload((prev) =>{
                  return {...prev , otp: e.target.value};
                })
              }} 
              minLength="6"
              maxLength="6"
              required
              />
              <div className="form-text">Token is sent to email</div>
            </div>
            <div className="mb-3">
                <label  className="form-label"> New Password</label>
                <input type="text" className="form-control" 
                required
                onChange={(e)=>{
                  setPayload((prev) =>{
                    return {...prev , newPassword: e.target.value};
                  })
                }}
                />
              </div>
            
            <hr/>
            
            <button type="submit" className="btn btn-primary">Reset Password</button>
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

export default VerifyPassword