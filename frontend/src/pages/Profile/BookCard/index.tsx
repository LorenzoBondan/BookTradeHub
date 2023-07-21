import { Book, User } from 'types';
import './styles.css';
import { AiFillDelete } from 'react-icons/ai';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { toast } from 'react-toastify';

type Props = {
    book: Book;
    onDelete: Function;
    user: User;
}

const BookCard = ({book, user, onDelete} : Props) => {

    const removeBook = (list : string) => {
    
        if(!window.confirm("Are you sure that you want to remove this book from your list?")){ 
          return;
        }
    
        const params : AxiosRequestConfig = {
          method:"PUT",
          url: `/users/${user.id}/removeFrom${list}/${book.id}`,
          withCredentials: true
        }
    
        requestBackend(params).then(() => {
          onDelete();
          toast.info("Book removed from your list!");
        })
    }

    return(
        <div className='book-card-container'>
            <div className='book-card-border'></div>
            <div className='book-card-content'>
                <img src={book?.imgUrl} alt="" />
                <div className='book-info'>
                    <h2>{book?.title}</h2>
                    <p>{book?.author}</p>
                </div>
            </div>
            <div className='book-card-buttons'>
                {user.myBooks.includes(book) && 
                    <AiFillDelete className='book-delete' onClick={() => removeBook('MyList')}/>
                }
                {user.wishList.includes(book) && 
                    <AiFillDelete className='book-delete' onClick={() => removeBook('WishList')}/>
                }
            </div>
        </div>
    );
}

export default BookCard;