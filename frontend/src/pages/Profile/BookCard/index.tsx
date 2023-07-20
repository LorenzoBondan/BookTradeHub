import { Book } from 'types';
import './styles.css';
import { AiFillDelete } from 'react-icons/ai';

type Props = {
    book: Book;
    onDelete: Function;
}

const BookCard = ({book, onDelete} : Props) => {

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
                <AiFillDelete className='book-delete'/>
            </div>
        </div>
    );
}

export default BookCard;