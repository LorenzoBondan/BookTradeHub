import { Exchange } from 'types';
import { useState, useEffect } from 'react';
import './styles.css';
import { IoArrowRedo } from 'react-icons/io5';
import { IoArrowUndo } from 'react-icons/io5';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

type Props = {
    exchange: Exchange;
    onChangeStatus: Function;
    color: string;
}

const ExchangeCard = ({ exchange, onChangeStatus, color }: Props) => {
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

    return(
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
                        <div className='creator-book-info'>
                            <h4>Book Offered</h4>
                            <img src={exchange.bookOffered.imgUrl} alt="" />
                            <h5>{exchange.bookOffered.title}</h5>
                            <p>{exchange.bookOffered.author}</p>
                            <p>{exchange.bookOffered.year}</p>
                        </div>
                    </div>
                    <div className="arrow-rigth"><IoArrowRedo style={{color: color, fontSize:"3rem"}}/></div>
                </div>
                {exchange.receiver && 
                    <div className='exchange-card-receiver-container'>
                        <div className='receiver-container'>
                            <div className='receiver-info'>
                                <h4>Receiver</h4>
                                <div className="image-wrapper">
                                    <img src={exchange.creator.imgUrl} alt="" />
                                    <div className="border-overlay"></div>
                                </div>
                                <h5>{exchange.receiver.name}</h5>
                                <p>{exchange.receiver.email}</p>
                                <p>Total Exchanges Completed: <strong>{totalExchangesCompleted}</strong></p>
                            </div>
                            {exchange.bookReceived && 
                                <div className='receiver-book-info'>
                                    <h4>Book Received</h4>
                                    <img src={exchange.bookReceived.imgUrl} alt="" />
                                    <h5>{exchange.bookReceived.title}</h5>
                                    <p>{exchange.bookReceived.author}</p>
                                    <p>{exchange.bookReceived.year}</p>
                                </div>
                            }
                        </div>
                        <div className="arrow-left"><IoArrowUndo style={{color: color, fontSize:"3rem"}}/></div>
                    </div>
                }
            </div>
        </div>
    );
}

export default ExchangeCard;