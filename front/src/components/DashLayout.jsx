import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import NewNavbar from './NewNavbar';
//import DashHeader from './DashHeader'
//import DashFooter from './DashFooter'

const DashLayout = () => {
  return (
    <>
      {/* <DashHeader /> */}
      <NewNavbar />
      <div className="dash-container">
        <Outlet />
      </div>
      {/* <DashFooter /> */}
    </>
  );
};
export default DashLayout;
