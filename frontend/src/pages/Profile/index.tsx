import { Book, User } from 'types';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { getTokenData } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { FaUserEdit } from 'react-icons/fa';
import { FaBookMedical } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import BookCard from './BookCard';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Tooltip as ReactTooltip } from 'react-tooltip';

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

    /**/

    const [userModalIsOpen, setUserModalIsOpen] = useState(false);

    function openUserModal(){
        setUserModalIsOpen(true);
    }
  
    function closeUserModal(){
        setUserModalIsOpen(false);
    }
  
    const { register: registerUser, handleSubmit: handleSubmitUser, setValue } = useForm<User>();
  
    useEffect(() => {
      if(user){
        requestBackend({url:`/users/${user?.id}`, withCredentials:true})
          .then((response) => {
              const user = response.data as User;
  
              setValue('name', user.name);
              setValue('imgUrl', user.imgUrl);
              setValue('password', user.password);
              setValue('email', user.email);
              setValue('exchangesCreatedId', user.exchangesCreatedId);
              setValue('exchangesReceivedId', user.exchangesReceivedId);
              setValue('myBooks', user.myBooks);
              setValue('notifications', user.notifications);
              setValue('wishList', user.wishList);
              setValue('roles', user.roles);
        })  
      }
    }, [user, setValue]);
  
    const onSubmitUser = (formData : User) => {
      const params : AxiosRequestConfig = {
          method:"PUT",
          url : `/users/${user?.id}`,
          data: formData,
          withCredentials: true
      };
  
      requestBackend(params)
          .then(response => {
              console.log('success', response.data);
              closeUserModal();
              getUser();
          })
    };

    /* */

    const [myListModalIsOpen, setMyListModalIsOpen] = useState(false);

    function openMyListModal(){
        setMyListModalIsOpen(true);
    }
  
    function closeMyListModal(){
        setMyListModalIsOpen(false);
    }
  
    const { register: registerBook, handleSubmit: handleSubmitBook, formState: {errors} } = useForm<Book>();

    const onSubmitMyListBook = (formData : Book) => {
        if(user){
            const params : AxiosRequestConfig = {
                method:"POST",
                url : `/books`,
                data: formData,
                withCredentials: true
            };
        
            requestBackend(params)
                .then(response => {
                    updateUserMyList(response.data);
                    toast.info("Book added to your list!");
                })
        }
    };

    const updateUserMyList = (book : Book) => {
        const params : AxiosRequestConfig = {
            method:"PUT",
            url : `/users/${user?.id}/addToMyList/${book.id}`,
            withCredentials: true
        };
    
        requestBackend(params)
            .then(response => {
                console.log('success', response.data);
                closeMyListModal();
                getUser();
            })
    }

    /* */

    const [wishListModalIsOpen, setWishListModalIsOpen] = useState(false);

    function openWishListModal(){
        setWishListModalIsOpen(true);
    }
  
    function closeWishListModal(){
        setWishListModalIsOpen(false);
    }

    const onSubmitWishListBook = (formData : Book) => {
        if(user){
            const params : AxiosRequestConfig = {
                method:"POST",
                url : `/books`,
                data: formData,
                withCredentials: true
            };
        
            requestBackend(params)
                .then(response => {
                    updateUserWishList(response.data);
                    toast.info("Book added to your wish list!");
                })
        }
    };

    const updateUserWishList = (book : Book) => {
        const params : AxiosRequestConfig = {
            method:"PUT",
            url : `/users/${user?.id}/addToWishList/${book.id}`,
            withCredentials: true
        };
    
        requestBackend(params)
            .then(response => {
                console.log('success', response.data);
                closeWishListModal();
                getUser();
            })
    }

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
                            <FaUserEdit className='profile-button-svg' onClick={openUserModal} data-tooltip-content="Edit Profile" data-tooltip-id="profile-tooltip"/>
                            <ReactTooltip id="profile-tooltip" place="bottom" />
                            <Modal 
                                isOpen={userModalIsOpen}
                                onRequestClose={closeUserModal}
                                contentLabel="Example Modal"
                                overlayClassName="modal-overlay"
                                className="modal-content"
                                >
                                <form onSubmit={handleSubmitUser(onSubmitUser)} className="my-books-form">
                                    <h4>Edit Profile</h4>
                                    <div className='my-books-input-container'>
                                        <label htmlFor="">Img Url</label>
                                        <input 
                                            {...registerUser("imgUrl", {
                                                required: 'Campo obrigatório',
                                                pattern: { 
                                                value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                                                message: 'Insira uma URL válida'
                                                }
                                            })}
                                            type="text"
                                            className={`form-control text-dark base-input ${errors.imgUrl ? 'is-invalid' : ''}`}
                                            placeholder="URL of user's image"
                                            name="imgUrl"
                                        />
                                    </div>
                                    <div className="my-books-buttons">
                                        <button onClick={closeUserModal} className="btn">Close</button>
                                        <button className="btn">Submit</button>
                                    </div>
                                </form>
                            </Modal>
                        </div>
                        <div className='profile-button'>
                            <FaBookMedical onClick={openMyListModal} className='profile-button-svg' data-tooltip-content="Add Book to My List" data-tooltip-id="profile-tooltip"/>
                            <Modal 
                                isOpen={myListModalIsOpen}
                                onRequestClose={closeMyListModal}
                                contentLabel="Example Modal"
                                overlayClassName="modal-overlay"
                                className="modal-content"
                                >
                                <form onSubmit={handleSubmitBook(onSubmitMyListBook)} className="my-books-form">
                                    <h4>Add Book to My List</h4>
                                    <div className='my-books-input-container'>
                                        <label htmlFor="">Title</label>
                                        <input 
                                            {...registerBook("title", {
                                                required: 'Campo obrigatório',
                                            })}
                                            type="text"
                                            className={`form-control text-dark base-input ${errors.title ? 'is-invalid' : ''}`}
                                            placeholder="Title"
                                            name="title"
                                        />
                                        <label htmlFor="">Author</label>
                                        <input 
                                            {...registerBook("author", {
                                                required: 'Campo obrigatório',
                                            })}
                                            type="text"
                                            className={`form-control text-dark base-input ${errors.author ? 'is-invalid' : ''}`}
                                            placeholder="Author"
                                            name="author"
                                        />
                                        <label htmlFor="">Year</label>
                                        <input 
                                            {...registerBook("year", {
                                                required: 'Campo obrigatório',
                                            })}
                                            type="text"
                                            className={`form-control text-dark base-input ${errors.year ? 'is-invalid' : ''}`}
                                            placeholder="Year"
                                            name="year"
                                        />
                                        <label htmlFor="">Img Url</label>
                                        <input 
                                            {...registerBook("imgUrl", {
                                                required: 'Campo obrigatório',
                                                pattern: { 
                                                value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                                                message: 'Insira uma URL válida'
                                                }
                                            })}
                                            type="text"
                                            className={`form-control text-dark base-input ${errors.imgUrl ? 'is-invalid' : ''}`}
                                            placeholder="URL of book's image"
                                            name="imgUrl"
                                        />
                                    </div>
                                    <div className="my-books-buttons">
                                        <button onClick={closeMyListModal} className="btn">Close</button>
                                        <button className="btn">Submit</button>
                                    </div>
                                </form>
                            </Modal>
                        </div>
                        <div className='profile-button'>
                            <FaBookmark onClick={openWishListModal} className='profile-button-svg' data-tooltip-content="Add Book to Wish List" data-tooltip-id="profile-tooltip"/>
                            <Modal 
                                isOpen={wishListModalIsOpen}
                                onRequestClose={closeWishListModal}
                                contentLabel="Example Modal"
                                overlayClassName="modal-overlay"
                                className="modal-content"
                                >
                                <form onSubmit={handleSubmitBook(onSubmitWishListBook)} className="my-books-form">
                                    <h4>Add Book to Wish List</h4>
                                    <div className='my-books-input-container'>
                                        <label htmlFor="">Title</label>
                                        <input 
                                            {...registerBook("title", {
                                                required: 'Campo obrigatório',
                                            })}
                                            type="text"
                                            className={`form-control text-dark base-input ${errors.title ? 'is-invalid' : ''}`}
                                            placeholder="Title"
                                            name="title"
                                        />
                                        <label htmlFor="">Author</label>
                                        <input 
                                            {...registerBook("author", {
                                                required: 'Campo obrigatório',
                                            })}
                                            type="text"
                                            className={`form-control text-dark base-input ${errors.author ? 'is-invalid' : ''}`}
                                            placeholder="Author"
                                            name="author"
                                        />
                                        <label htmlFor="">Year</label>
                                        <input 
                                            {...registerBook("year", {
                                                required: 'Campo obrigatório',
                                            })}
                                            type="text"
                                            className={`form-control text-dark base-input ${errors.year ? 'is-invalid' : ''}`}
                                            placeholder="Year"
                                            name="year"
                                        />
                                        <label htmlFor="">Img Url</label>
                                        <input 
                                            {...registerBook("imgUrl", {
                                                required: 'Campo obrigatório',
                                                pattern: { 
                                                value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                                                message: 'Insira uma URL válida'
                                                }
                                            })}
                                            type="text"
                                            className={`form-control text-dark base-input ${errors.imgUrl ? 'is-invalid' : ''}`}
                                            placeholder="URL of user's image"
                                            name="imgUrl"
                                        />
                                    </div>
                                    <div className="my-books-buttons">
                                        <button onClick={closeWishListModal} className="btn">Close</button>
                                        <button className="btn">Submit</button>
                                    </div>
                                </form>
                            </Modal>
                        </div>
                    </div>
                </div>
                <div className='profile-card-user-name'>
                    <h1>{user?.name}</h1>
                    <p>{user?.email}</p>
                </div>
                <div className='profile-card-books-container'>
                    <div className='profile-card-my-books-container base-card'>
                        <h5 className='books-title'><AiOutlineUnorderedList style={{marginRight:"3px"}}/> My Books <h6>({user?.myBooks.length})</h6></h5>
                        <div className='books-container'>
                            {user?.myBooks.map(book => (
                                <BookCard book={book} user={user} onDelete={getUser} key={book.id}/>
                            ))}
                        </div>
                    </div>
                    <div className='profile-card-wish-list-container base-card'>
                        <h5 className='books-title'><AiOutlineUnorderedList style={{marginRight:"3px"}}/> Wish List <h6>({user?.wishList.length})</h6></h5>
                        <div className='books-container'>
                            {user?.wishList.map(book => (
                                <BookCard book={book} user={user} onDelete={getUser} key={book.id}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;