import { Exchange, User } from 'types';
import { useState, useEffect } from 'react';
import './styles.css';
import { IoArrowRedo } from 'react-icons/io5';
import { IoArrowUndo } from 'react-icons/io5';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { MdDone } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { FcCancel } from 'react-icons/fc';
import { toast } from 'react-toastify';

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

    const [totalExchangesCompleted, setTotalExchangesCompleted] = useState<number>(0); // Inicialize o estado com 0
  
    useEffect(() => {
      const calculateTotalExchangesCompleted = (exchangesId: number[]) => {
        let sum = 0;
  
        exchangesId.forEach((exchangeId) => {
          const params: AxiosRequestConfig = {
            method: 'GET',
            url: `/exchanges/${exchangeId}`,
            withCredentials: true,
          };
  
          requestBackend(params)
            .then((response) => {
              if (response.data.status === 'COMPLETED') {
                sum = sum + 1;
                setTotalExchangesCompleted(sum);
              }
            })
            .catch((error) => {
              console.log('Error: ', error);
            });
        });
      };

      calculateTotalExchangesCompleted([
        ...exchange.creator.exchangesCreatedId,
        ...exchange.creator.exchangesReceivedId,
      ]);
    }, [exchange.creator.exchangesCreatedId, exchange.creator.exchangesReceivedId]);

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

    return(
        <>
        <div className='exchange-card-container base-card'>
            <div className='border-colored' style={{height:"100%", width:"3px", backgroundColor: color}}></div>
            <div className='exchange-card-content-container'>
                <div className='exchange-card-creator-container'>
                    <div className='creator-container'>
                        <div className='creator-info'>
                            <h4>Creator</h4>
                            <div className="image-wrapper">
                                <img src={exchange.creator.imgUrl} alt="" />
                            </div>
                            <h5>{exchange.creator.name}</h5>
                            <p>{exchange.creator.email}</p>
                            <p>Total Exchanges Completed: <strong>{totalExchangesCompleted}</strong></p>
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
                </div>
                {exchange.receiver && 
                    <div className='exchange-card-receiver-container'>
                        <div className='receiver-container'>
                            {exchange.bookReceived && 
                                <div className='receiver-book-info'>
                                    <h4>Book Received</h4>
                                    <div className="book-image-wrapper">
                                        <img src={exchange.bookReceived.imgUrl} alt="" />
                                    </div>
                                    <h5>{exchange.bookReceived.title}</h5>
                                    <p>{exchange.bookReceived.author}</p>
                                    <p>{exchange.bookReceived.year}</p>
                                </div>
                            }
                            <IoArrowUndo style={{color: color, fontSize:"2rem", margin:"10px"}}/>
                            <div className='receiver-info'>
                                <h4>Receiver</h4>
                                <div className="image-wrapper">
                                    <img src={exchange.receiver.imgUrl} alt="" />
                                </div>
                                <h5>{exchange.receiver.name}</h5>
                                <p>{exchange.receiver.email}</p>
                                <p>Total Exchanges Completed: <strong>{totalExchangesCompleted}</strong></p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
        {status === "DISPONIBLE" && exchange.creator.id !== user.id && 
            <div className='exchange-card-buttons-container'>
                <div className='buttons base-card'>
                    <p>DISPONIBLE</p>
                </div>
            </div>
        }
        {status === "PENDING" && exchange.creator.id === user.id &&
            <div className='exchange-card-buttons-container'>
                <div className='buttons base-card'>
                    <p className='exchange-card-button accept-button' onClick={acceptOffer}><MdDone/> Accept Exchange</p>
                    <p className='exchange-card-button reject-button'><IoMdClose/> Reject Exchange</p>
                    <p className='exchange-card-button cancel-button'><FcCancel/> Cancel Exchange</p>
                </div>
            </div>
        }
        {status === "ACCEPTED" && 
            <div className='exchange-card-buttons-container'>
                <div className='buttons'>
                    <p>ACCEPTED</p>
                </div>
            </div>
        }
        {status === "REJECTED" && 
            <div className='exchange-card-buttons-container'>
                <div className='buttons'>
                    <p>REJECTED</p>
                </div>
            </div>
        }
        </>
    );
}

export default ExchangeCard;