import Logo from "../assets/logo.png";
import { Link  } from 'react-router-dom';

const VerifyEmail = () => {
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
        <h1 className="text-center">Verify Email</h1>
    
        
          <form>
            <div className="mb-3">
              <label  className="form-label">Email</label>
              <input  className="form-control"/>
             
            </div>
            <div className="mb-3">
              <label  className="form-label">Token</label>
              <input type="text" className="form-control" />
            </div>
            
         
           
            
            <button type="submit" className="btn btn-primary">Verify my account</button>


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

export default VerifyEmail