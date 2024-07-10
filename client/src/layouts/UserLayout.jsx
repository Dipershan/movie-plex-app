
import { Outlet } from 'react-router-dom';
import UserNavbar from "./UserNavbar";
import UserFooter from "./UserFooter";



const UserLayout = () => {
  return (
    <div>
      <div>
        <UserNavbar/>
      </div>
      <main style={{minHeight:"60vh"}}>
        <Outlet />
      </main>
      <div>
        <UserFooter />
      </div>
    </div>
  )
}

export default UserLayout