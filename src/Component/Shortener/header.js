import './Nav.css';
import { withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';
import { NavSidebar } from "./Sidebar";

import BodyWrapper from './bodyWrapper';
const cookies = new Cookies();
const USER_DETAILS=cookies.get('user_details')
const DashboardLayout = ({children}) => (
    <>
    <header className='navbar'>
        <div className='navbar__title navbar__item'>
        <i className="fa fa-link pr-2 " ></i> URL SHORTNER
        </div>
        <div className='navbar__item'><div className="user"></div><span style="color:#fff;">Welcome {USER_DETAILS.firstname +' '+ USER_DETAILS.lastname}</span></div>        
    </header>
    <BodyWrapper>
      <div className="flex h-screen bg-gray-200">
        <NavSidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="content">
            <section className="sm:flex-row flex flex-col flex-1">
              <div
                className="content-box"
                style={{ flexGrow: 2, flexBasis: "0%" }}
              >
                {children}
              </div>
            </section>
          </main>
        </div>
      </div>
    </BodyWrapper>
    </>
  

    
   
);

export default withRouter(DashboardLayout)
