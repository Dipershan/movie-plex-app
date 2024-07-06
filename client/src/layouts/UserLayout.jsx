import React from 'react';
import { Outlet } from 'react-router-dom';
import UserNavbar from "./UserNavbar";
import UserFooter from "./UserFooter";


const UserLayout = () => {
  return (
    <div className="container-fluid">
      <div>
        <UserNavbar/>
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <UserFooter />
      </div>
    </div>
  )
}

export default UserLayout