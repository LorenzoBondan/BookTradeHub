import { NavLink, useHistory } from 'react-router-dom';
import { MdAdminPanelSettings } from 'react-icons/md';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbArrowsExchange } from 'react-icons/tb';
import { HiLogout } from 'react-icons/hi';
import { HiLogin } from 'react-icons/hi';
import { AiOutlineSearch } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
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
import { Tooltip as ReactTooltip } from 'react-tooltip';
import Modal from 'react-modal';
import CreateExchange from 'Components/CreateExchange';

const TopNavbar = () => {

  const { authContextData, setAuthContextData } = useContext(AuthContext);
  const [user, setUser] = useState<User | null>(null);

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

    useEffect(() => {
      if (authContextData.authenticated) {
        getUser();
      }
    }, [authContextData.authenticated, getUser]);

    const handleLogoutClick = (event : React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault(); 
      
      removeAuthData(); 
  
      setAuthContextData({
        authenticated: false,
      })
  
      history.replace('/'); 
    }

    const [showNotifications, setShowNotifications] = useState(false);
    
    const openAndCloseNotifications = () => {
        if(showNotifications){
          setShowNotifications(false);
        }
        else{
          setShowNotifications(true);
        }
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModal(){
      setModalIsOpen(true);
    }
  
    function closeModal(){
      setModalIsOpen(false);
    }

    const history = useHistory();

    const handlePush = () => {
      history.push("/exchanges");
      closeModal();
    };

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
                  <ReactTooltip id="top-navbar-tooltip" place="bottom" />
                  <NavLink to="/profile" className='top-navbar-profile-container'>
                      <img src={user?.imgUrl} alt=""/>
                      <h1>{user?.name}</h1>
                  </NavLink>
                  <div className='top-navbar-buttons-container'>
                    { hasAnyRoles(['ROLE_ADMIN']) && ( 
                      <NavLink to="/admin" className="admin-nav-item">
                          <p data-tooltip-content="Admin" data-tooltip-id="top-navbar-tooltip"><MdAdminPanelSettings className='top-navbar-icon'/></p>
                      </NavLink>
                    )}
                    <p onClick={() => openAndCloseNotifications()} data-tooltip-content="Notifications" data-tooltip-id="top-navbar-tooltip">
                      <IoIosNotificationsOutline className='top-navbar-icon' />
                      {user && user?.notifications.filter(notification => !notification.read).length > 0 && <span className='notification-badge'>{user?.notifications.filter(notification => !notification.read).length}</span>}
                    </p>
                    <p onClick={openModal} data-tooltip-content="New Exchange" data-tooltip-id="top-navbar-tooltip"><AiOutlinePlus className='top-navbar-icon'/></p>
                      <Modal 
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        overlayClassName="modal-overlay"
                        className="modal-content"
                      >
                        <CreateExchange onSubmitForm={handlePush} onCancelForm={closeModal}/>
                      </Modal>
                    <NavLink to="/disponibleExchanges">
                        <p data-tooltip-content="Disponible Exchanges" data-tooltip-id="top-navbar-tooltip"><AiOutlineSearch className='top-navbar-icon'/></p>
                    </NavLink>
                    <NavLink to="/exchanges">
                        <p data-tooltip-content="My Exchanges" data-tooltip-id="top-navbar-tooltip"><TbArrowsExchange className='top-navbar-icon'/></p>
                    </NavLink>
                    <NavLink to="/" className="login-nav-item" onClick={handleLogoutClick}>
                      <p data-tooltip-content="Logout" data-tooltip-id="top-navbar-tooltip"><HiLogout className='top-navbar-icon'/></p>
                    </NavLink>
                  </div>
              </div>
              </> : (
                <div className='top-navbar-login-container'>
                    <NavLink to="/auth/login" className="login-nav-item">
                      <p style={{color:"#FF1493"}}><HiLogin/> Sign In</p>
                    </NavLink>
                    <NavLink to="/auth/signup" className="login-nav-item">
                      <p style={{color:"#00FFFF"}}><AiOutlineEdit/> Sign Up</p>
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