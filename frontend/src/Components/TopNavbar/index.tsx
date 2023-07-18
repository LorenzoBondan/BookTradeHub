import { NavLink } from 'react-router-dom';
import { MdAdminPanelSettings } from 'react-icons/md';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbArrowsExchange } from 'react-icons/tb';
import { HiLogout } from 'react-icons/hi';
import { HiLogin } from 'react-icons/hi';
import { useCallback, useContext, useEffect, useState } from 'react';
import { User } from 'types';
import { getTokenData, hasAnyRoles, isAuthenticated } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import './styles.css';
import Notifications from 'Components/Notifications';
import logo from 'assets/images/logo.png';
import { AuthContext } from 'AuthContext';
import { removeAuthData } from 'util/storage';
import history from 'util/history';

const TopNavbar = () => {

    const [user, setUser] = useState<User | null>(null);

    const getUser = useCallback(async () => {
      try {
        const email = getTokenData()?.user_name;
  
        if (email) {
          const params: AxiosRequestConfig = {
            method: "GET",
            url: `/users/email/${email}`,
            withCredentials: true,
          };
  
          const response = await requestBackend(params);
          setUser(response.data);
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    }, []);
  
    const [showNotifications, setShowNotifications] = useState(false);
    
    const openAndCloseNotifications = () => {
        if(showNotifications){
          setShowNotifications(false);
        }
        else{
          setShowNotifications(true);
        }
    }

    useEffect(() => {
      getUser();
    }, [getUser]);

    const { authContextData, setAuthContextData } = useContext(AuthContext);

    useEffect(() => {
        if(isAuthenticated()){
          setAuthContextData({
            authenticated: true,
            tokenData: getTokenData()
          })
        }
        else{
          setAuthContextData({
            authenticated: false,
          })
        }
      }, [setAuthContextData]);

      const handleLogoutClick = (event : React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); 
        
        removeAuthData(); 
    
        setAuthContextData({
          authenticated: false,
        })
    
        history.replace('/'); 
    }

    return(
        <div className='top-navbar-main-container'>
          <div className='tasks-container-navbar'>
              <div className='top-navbar-brand'>
                <img src={logo} alt="" />
                <h4>BookTradeHub</h4>
              </div>
              {authContextData.authenticated ?
              <>
              <div className='tasks-container-second'>
                  <NavLink to="/profile" className='top-navbar-profile-container'>
                      <img src={user?.imgUrl} alt="" />
                      <h1>{user?.name}</h1>
                  </NavLink>
                  <div className='top-navbar-buttons-container'>
                    <p onClick={() => openAndCloseNotifications()}>
                      <IoIosNotificationsOutline className='top-navbar-icon' />
                      {user && user?.notifications.filter(notification => !notification.read).length > 0 && <span className='notification-badge'>{user?.notifications.filter(notification => !notification.read).length}</span>}
                    </p>
                    <NavLink to="/create">
                        <p><AiOutlinePlus className='top-navbar-icon'/></p>
                    </NavLink>
                    <NavLink to="/exchanges">
                        <p><TbArrowsExchange className='top-navbar-icon'/></p>
                    </NavLink>
                    { hasAnyRoles(['ROLE_ADMIN']) && ( 
                      <NavLink to="/admin" className="admin-nav-item">
                          <p><MdAdminPanelSettings className='top-navbar-icon'/></p>
                      </NavLink>
                    )}
                    <NavLink to="/" className="login-nav-item" onClick={handleLogoutClick}>
                      <p><HiLogout className='top-navbar-icon'/></p>
                    </NavLink>
                  </div>
              </div>
              </> : (
                <div className='top-navbar-login-container'>
                    <NavLink to="/auth/login" className="login-nav-item">
                      <p><HiLogin/> Login</p>
                    </NavLink>
                </div>
              )}
          </div>
          {showNotifications && 
            <div className='top-navbar-notifications-container'>
              {user && <Notifications onReadNotification={getUser}/>}
            </div>
          }
        </div>
    );
}

export default TopNavbar;