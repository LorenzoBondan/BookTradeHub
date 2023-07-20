import { Book, Exchange, User } from 'types';
import { useState, useEffect } from 'react';
import './styles.css';
import { IoArrowRedo } from 'react-icons/io5';
import { IoArrowUndo } from 'react-icons/io5';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { MdDone } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { FcCancel } from 'react-icons/fc';
import { MdOutlineChangeCircle } from 'react-icons/md';
import { AiOutlineCalendar } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import Select from "react-select";
import { convertDateTime } from 'helpers';

type Props = {
    exchange: Exchange;
    onChangeStatus: Function;
    color: string;
    user: User;
}

const ExchangeCard = ({ exchange, onChangeStatus, color, user }: Props) => {

    const [status, setStatus] = useState<string>();

    useEffect(() => {
        setStatus(exchange.status);
    }, [exchange]);

    // DISPONIBLE 

    const [bookId, setBookId] = useState<number | undefined>();

    const handleSelectChange = (selectedOption: Book | null) => {
        setBookId(selectedOption ? selectedOption.id : undefined);
    };

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(){
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    const offerExchange = () => {

        const params : AxiosRequestConfig = {
            method:"PUT",
            url: `/exchanges/${exchange.id}/offerBook/${bookId}`,
            withCredentials:true
          }
          requestBackend(params) 
            .then(response => {
                console.log(response.data);
                
                toast.success("Offer maded!")
            })
    }

    // PENDING 
    const acceptOffer = () => {
        if(!window.confirm("Are you sure that you want to accept the exchange?")){ 
            return;
        }

        const params : AxiosRequestConfig = {
            method:"PUT",
            url: `/exchanges/${exchange.id}/acceptOffer`,
            withCredentials:true
          }
          requestBackend(params) 
            .then(response => {
                onChangeStatus();
                toast.success("Exchanged accepted!")
            })
    }

    const rejectOffer = () => {
        if(!window.confirm("Are you sure that you want to reject the exchange?")){ 
            return;
        }

        if(window.confirm("Do you want to offer this user a new exchange possibility?")){ 
            const params : AxiosRequestConfig = {
                method:"PUT",
                url: `/exchanges/${exchange.id}/rejectOfferAndPendingAgain`,
                withCredentials:true
              }
              requestBackend(params) 
                .then(response => {
                    onChangeStatus();
                    toast.success("Exchanged is now pending again!")
                })
        }

        const params : AxiosRequestConfig = {
            method:"PUT",
            url: `/exchanges/${exchange.id}/rejectOfferAndCancel`,
            withCredentials:true
          }
          requestBackend(params) 
            .then(response => {
                onChangeStatus();
                toast.success("Exchanged canceled!")
            })
    }

    const cancelOffer = () => {
        if(!window.confirm("Are you sure that you want to cancel the exchange?")){ 
            return;
        }

        const params : AxiosRequestConfig = {
            method:"PUT",
            url: `/exchanges/${exchange.id}/cancelExchange`,
            withCredentials:true
          }
          requestBackend(params) 
            .then(response => {
                onChangeStatus();
                toast.success("Exchanged canceled!")
            })
    }

    return(
        <>
        <div className='exchange-card-container base-card'>
            <div className='border-colored' style={{height:"100%", width:"3px", backgroundColor: color}}></div>
            <div className='exchange-card-content-container'>
                <div className='exchange-card-creator-and-receiver-container'>
                    <div className='creator-container'>
                        <div className='creator-info'>
                            <h4>Creator</h4>
                            <div className="image-wrapper">
                                <img src={exchange.creator.imgUrl} alt="" />
                            </div>
                            <h5>{exchange.creator.name}</h5>
                            <p>{exchange.creator.email}</p>
                        </div>
                        <IoArrowRedo style={{color: color, fontSize:"2rem", margin:"10px"}}/>
                        <div className='creator-book-info'>
                            <h4>Book Offered</h4>
                            <div className="book-image-wrapper">
                                <img src={exchange.bookOffered.imgUrl} alt="" />
                            </div>
                            <h5>{exchange.bookOffered.title}</h5>
                            <p>{exchange.bookOffered.author}</p>
                            <p>{exchange.bookOffered.year}</p>
                        </div>
                    </div>
                    {exchange.receiver ? ( 
                        <div className='receiver-container'>
                            {exchange.bookReceived ? ( 
                                <div className='receiver-book-info'>
                                    <h4>Book Received</h4>
                                    <div className="book-image-wrapper">
                                        <img src={exchange.bookReceived.imgUrl} alt="" />
                                    </div>
                                    <h5>{exchange.bookReceived.title}</h5>
                                    <p>{exchange.bookReceived.author}</p>
                                    <p>{exchange.bookReceived.year}</p>
                                </div>
                            ) : (
                                <div className='receiver-book-info'>
                                    <h5>Waiting for an offer...</h5>
                                </div>
                            )}
                            <IoArrowUndo style={{color: color, fontSize:"2rem", margin:"10px"}}/>
                            <div className='receiver-info'>
                                <h4>Receiver</h4>
                                <div className="image-wrapper">
                                    <img src={exchange.receiver.imgUrl} alt="" />
                                </div>
                                <h5>{exchange.receiver.name}</h5>
                                <p>{exchange.receiver.email}</p>
                            </div>
                        </div>
                ) : (
                    <div className='receiver-container'>
                        <h5>Waiting for an offer...</h5>
                    </div>
                )}
                </div>
                <div className='exchange-card-date-container'>
                    <span><AiOutlineCalendar style={{marginRight:"2px"}}/> Created at {convertDateTime(exchange.creationTime)}</span>
                </div>
            </div>
        </div>
        {status === "DISPONIBLE" && exchange.creator.id !== user.id && 
            <div className='exchange-card-buttons-container'>
                <div className='buttons base-card'>
                    <p className='exchange-card-button offer-button' onClick={openModal}><MdOutlineChangeCircle/> Offer Exchange</p>
                    <Modal 
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        overlayClassName="modal-overlay"
                        className="modal-content"
                    >
                        <form onSubmit={offerExchange} className="my-books-form">
                            <h4>Offer Exchange</h4>
                            <div className="my-books-input-container">
                                <label htmlFor="">Your Books</label>
                                <Select 
                                    options={user.myBooks}
                                    classNamePrefix="my-books-select"
                                    placeholder="Your Books"
                                    getOptionLabel={(book: Book) => book.title}
                                    getOptionValue={(book: Book) => book.id.toString()}
                                    onChange={handleSelectChange}
                                />    
                            </div>
                            <div className="my-books-buttons">
                                <button onClick={closeModal} className="btn">Close</button>
                                <button className="btn">Submit</button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
        }
        {status === "PENDING" && (exchange.creator.id === user.id ? ( 
            <div className='exchange-card-buttons-container'>
                <div className='buttons base-card'>
                    <p className='exchange-card-button accept-button' onClick={acceptOffer}><MdDone/> Accept Exchange</p>
                    <p className='exchange-card-button reject-button' onClick={rejectOffer}><IoMdClose/> Reject Exchange</p>
                    <p className='exchange-card-button cancel-button' onClick={cancelOffer}><FcCancel/> Cancel Exchange</p>
                </div>
            </div>
        ) : (
            <div className='exchange-card-buttons-container'>
                <div className='buttons base-card'>
                    <p>Waiting for the other user awnser</p>
                </div>
            </div>
        ))}
        {status === "COMPLETED" && 
            <div className='exchange-card-buttons-container'>
                <div className='buttons'>
                    <p>COMPLETED</p>
                </div>
            </div>
        }
        </>
    );
}

export default ExchangeCard;