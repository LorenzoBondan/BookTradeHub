import { Exchange } from 'types';
import './styles.css';
import { BsArrowLeft } from 'react-icons/bs';
import { BsArrowRight } from 'react-icons/bs';

type Props = {
    exchange: Exchange;
    onChangeStatus: Function;
    color: string;
}

const ExchangeCard = ({exchange, onChangeStatus, color} : Props) => {
    return(
        <div className='exchange-card-container base-card'>
            <div className='border-colored' style={{height:"100%", width:"3px", backgroundColor: color}}></div>
            <div className='exchange-card-content-container'>
                <div className='exchange-card-creator-container'>
                    <div className='creator-container'>
                        <div className='creator-info'>
                            <h4>Creator</h4>
                            <img src={exchange.creator.imgUrl} alt="" />
                            <h5>{exchange.creator.name}</h5>
                            <p>{exchange.creator.email}</p>
                        </div>
                        <div className='creator-book-info'>
                            <h4>Book Offered</h4>
                            <img src={exchange.bookOffered.imgUrl} alt="" />
                            <h5>{exchange.bookOffered.title}</h5>
                            <p>{exchange.bookOffered.author}</p>
                            <p>{exchange.bookOffered.year}</p>
                        </div>
                    </div>
                    <div className="arrow-rigth"><BsArrowRight style={{color: color, fontSize:"3rem"}}/></div>
                </div>
                <div className='exchange-card-receiver-container'>

                </div>
            </div>
        </div>
    );
}

export default ExchangeCard;