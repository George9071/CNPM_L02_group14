import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PiNotePencilDuotone } from 'react-icons/pi';
import { FaProjectDiagram, FaRegUser, FaHome  } from 'react-icons/fa';

import { GiTeamUpgrade } from 'react-icons/gi';
import { BiLogOut, BiChat, BiX, BiChevronRight, BiChevronDown } from 'react-icons/bi';
import './ESidebar.scss';
import { getPersonnelByAccountId } from '../../components/services/apiService';
import { useSelector } from 'react-redux';

function ESidebar({ personnel }) {
  const [expanded, setExpanded] = useState(true);

  const [projectDropdown, setProjectDropdown] = useState(false);

  const [isLogoHidden, setIsLogoHidden] = useState(false); // Trạng thái checkbox để ẩn logo

  // const {user} = useSelector((state) => state);
  // const [personnel, setPersonnel] = useState(null);
  // const [errorMessage, setErrorMessage] = useState("");

  // const fetchPersonnel = async () => {
  //   try {
  //     if (user) {
  //         let response = await getPersonnelByAccountId(user.accountId);
  //         if(response && response?.data?.data){
  //           // console.log("response >>>", response.data.data)
  //           setPersonnel(response.data.data);
  //         }
          
  //     }
  //   } catch (err) {
  //       setErrorMessage(err.message); // Log error
  //       console.error("Error fetching personnel:", err);
  //   }
  // };

  // useEffect(() => {
  //   fetchPersonnel();
  // }, [])

  useEffect(() => {
    console.log("Sidebar personnel >>>", personnel); // Logs whenever personnel changes
  }, []);

  const toggleProjectDropdown = () => {
    setProjectDropdown((prev) => !prev);
  };

  return (
    <div className={`sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
     <div className="sidebar-header">
        <div className="header-row">
          <span className={`logo ${isLogoHidden ? 'hide-text' : ''}`}>BK-MANARATE</span>
          <button onClick={() => setExpanded((prev) => !prev)} className="toggle-btn" aria-label="Toggle Sidebar">
            {expanded ? 'X' : '>'}
          </button>
        </div>
        <div className="user-info">
          <img className="avatar rounded-circle" src="https://randomuser.me/api/portraits/women/1.jpg" alt="User Avatar" />
          {expanded && <span className="user-name">{personnel?.firstName ? personnel.firstName : "Loading..."}</span>}
        </div>
      </div>

      <div className="nav-links">
          <NavLink to="/" className="nav-link-side" activeClassName="active-link">
            <FaHome />
            <span className={`link-text ${expanded ? 'show' : ''}`}>Trang chủ</span>
          </NavLink>

          <NavLink to="infor" className="nav-link-side" activeClassName="active-link">
            <FaRegUser />
            <span className={`link-text ${expanded ? 'show' : ''}`}>Thông tin</span>
          </NavLink>
          
          <NavLink to="attendance" className="nav-link-side" activeClassName="active-link">
            <PiNotePencilDuotone />
            <span className={`link-text ${expanded ? 'show' : ''}`}>Chấm công</span>
          </NavLink>

            {/* Project Dropdown */}
            <div className="nav-link-side dropdown" onClick={toggleProjectDropdown}>
              <FaProjectDiagram />
              <span className={`link-text ${expanded ? 'show' : ''}`}>Dự án</span>
              {expanded && <BiChevronDown className={`dropdown-icon ${projectDropdown ? 'open' : ''}`} />}
            </div>
            {expanded && projectDropdown && (
              <div className="dropdown-content">
                <NavLink to="participation" className="dropdown-item" activeClassName="active-link">
                  Các dự án tham gia
                </NavLink>
                <NavLink to="submittask" className="dropdown-item" activeClassName="active-link">
                  Nộp task
                </NavLink>
              </div>
            )}

            <NavLink to="training" className="nav-link-side" activeClassName="active-link">
              <GiTeamUpgrade />
              <span className={`link-text ${expanded ? 'show' : ''}`}>Đào tạo</span>
            </NavLink>
            <NavLink to="chat" className="nav-link-side" activeClassName="active-link">
              <BiChat />
              <span className={`link-text ${expanded ? 'show' : ''}`}>Tin nhắn</span>
            </NavLink>
            <NavLink to="logout" className="nav-link-side" activeClassName="active-link">
              <BiLogOut />
              <span className={`link-text ${expanded ? 'show' : ''}`}>Đăng xuất</span>
            </NavLink>
      </div>
    </div>
  );
}

export default ESidebar;
