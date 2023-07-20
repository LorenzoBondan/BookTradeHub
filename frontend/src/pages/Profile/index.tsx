import { User } from 'types';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { getTokenData } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { FaUserEdit } from 'react-icons/fa';
import { FaBookMedical } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';

const Profile = () => {

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
  
    useEffect(() => {
      getUser();
    }, [getUser]);

    return(
        <div className='profile-container'>
            <div className='profile-card base-card'>
                <div className='profile-card-top-container'>
                    <div className='profile-card-top-info'>
                        <ul className='profile-card-info-list'>
                            <li className='info-list-item'>
                                <h5>{user?.myBooks.length}</h5>
                                <p>My Books</p>
                            </li>
                            <li className='info-list-item'>
                                <h5>{user?.wishList.length}</h5>
                                <p>Wish List</p>
                            </li>
                            <li className='info-list-item'>
                                <h5>{user && user?.exchangesCreatedId.length + user?.exchangesReceivedId.length}</h5>
                                <p>Exchanges</p>
                            </li>
                        </ul>
                    </div>
                    <div className='profile-card-top-image'>
                        <img src={user?.imgUrl} alt="" />
                    </div>
                    <div className='profile-card-top-buttons'>
                        <div className='profile-button'>
                            <FaUserEdit className='profile-button-svg'/>
                        </div>
                        <div className='profile-button'>
                            <FaBookMedical className='profile-button-svg'/>
                        </div>
                        <div className='profile-button'>
                            <FaBookmark className='profile-button-svg'/>
                        </div>
                    </div>
                </div>
                <div className='profile-card-user-name'>
                    <h1>{user?.name}</h1>
                    <p>{user?.email}</p>
                </div>
                <div className='profile-card-books-container'>
                    <div className='profile-card-my-books-container base-card'>
                        <h5 className='books-title'>My Books</h5>
                        <div className='books-container'>

                        </div>
                    </div>
                    <div className='profile-card-wish-list-container base-card'>
                        <h5 className='books-title'>Wish List</h5>
                        <div className='books-container'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;