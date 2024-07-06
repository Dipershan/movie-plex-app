import { Route ,  Routes } from "react-router-dom";
import  ErrorPage   from "./pages/ErrorPage";

import  Login   from "./pages/Login";
import  Register  from "./pages/Register";


//Admin Routes
import Dashboard from "./pages/admin/Dashboard";
import ForgetPassword from "./pages/ForgetPassword";
import VerifyPassword from "./pages/VerifyPassword";
import VerifyEmail from "./pages/VerifyEmail";

//Layouts
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

//User Pages
import Home from "./pages/user/Home";
import Cart from "./pages/user/Cart";
import MovieDetail from "./pages/user/MovieDetail";
import Order from "./pages/user/Order";

const App =() =>{
  return( 
  <>

    <Routes>
      {/* General Routes */}
      <Route path="/login" element={<Login />}></Route> 
      <Route path="/register" element={<Register />}></Route> 
      <Route path="/forget-password" element={<ForgetPassword />}></Route> 
      <Route path="/verify-password" element={<VerifyPassword />}></Route> 
      <Route path="/verify-email" element={<VerifyEmail />}></Route>

      {/* User Routes */}
      <Route path="/" element={<UserLayout />} >
      <Route path="movies/:slug" element={<MovieDetail />} />
      <Route index element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="order" element={<Order />} />
      </Route>

      {/* Admin Routes */}
      
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  
  </>

);
};
export default App;



