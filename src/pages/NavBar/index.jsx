import React, { useEffect, useState } from 'react'
import "./NavBar.scss";
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const NavBar = ({ companyNotFound }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;


  const handleLogout = () => {
    navigate("/login")
  };

  const [selectedMenu, setSelectedMenu] = useState("")
  const handleMenu = (menu) => {
    navigate(`/${menu.toLowerCase()}`);
    setSelectedMenu(menu)
  }

  useEffect(() => {
    if (pathname === '/') setSelectedMenu("")
    if (pathname === '/operations') setSelectedMenu("operations")
  }, [pathname])
  return (
    <div className='navbar-wrapper'>
      <div className='NavBar'>
        <div className='navbar-container'>
          <div className='nav-menu-bar'>
            <h1>Seating-Arrangement</h1>
            {
              !companyNotFound &&
            <div className='nav-menu-lists'>
                <div className='nav-menu-container'>
                  <h3 className='nav-menu' onClick={() => handleMenu("")}>All Layouts</h3>
                   <div className={selectedMenu === "" && 'nav-menu-hr'}></div>
                </div>
               <div className='nav-menu-container'>
                  <h3 className='nav-menu' onClick={() => handleMenu("operations")}>Operations</h3>
                  <div className={selectedMenu === "operations" && 'nav-menu-hr'}></div>
                </div>
            </div>
            }
          </div>
            <button className='logout-btn' onClick={() => handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
              Logout
            </button>
        </div>
      </div>
    </div >
  )
}

export default NavBar