/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import { Navigation } from "react-minimal-side-navigation";
import { useHistory, useLocation } from "react-router-dom";
import Icon from "awesome-react-icons";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import React, { useState } from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export const NavSidebar = () => {
  const history = useHistory();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <React.Fragment>
      {/* Sidebar Overlay */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 z-20 block transition-opacity bg-black opacity-50 lg:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      />
      <div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
      >

        <Navigation
          activeItemId={location.pathname}
          onSelect={({ itemId }) => {
            history.push(itemId);
          }}
          items={[
            {
              title: "Dashboard",
              itemId: "/dashboard",
              // Optional
              elemBefore: () => <Icon name="coffee" />
            },
            {
              title: "URL Shortner",
              itemId: "/url",
              elemBefore: () => <Icon name="search" />,
              
            }
           
          ]}
        />
        <Navigation
            // activeItemId={location.pathname}

          items={[
            {
              title: "Logout",
              itemId: "",
              elemBefore: () => <Icon name="log-out" />
            }
          ]}
          onSelect={({ itemId }) => {
            console.log(itemId)
            cookies.remove('user_token')
            cookies.remove('user_details')
              
             
            history.push('/')
            window.location.reload(false);
          }}
        />
        
       
      </div>
    </React.Fragment>
  );
};
