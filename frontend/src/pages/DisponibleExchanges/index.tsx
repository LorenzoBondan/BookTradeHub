import { useCallback, useEffect, useState } from 'react';
import './styles.css';
import { Exchange, SpringPage, User } from 'types';
import { getTokenData } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import ExchangeCard from 'pages/Exchanges/ExchangeCard';

const DisponibleExchanges = () => {

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

    const [exchangesDisponible, setExchangesDisponible] = useState<SpringPage<Exchange>>();

    const getDisponibleExchanges = useCallback(async () => {
        const params: AxiosRequestConfig = {
            method: "GET",
            url: `/exchanges/disponible`,
            withCredentials: true
          }
    
          requestBackend(params)
            .then(response => {
                setExchangesDisponible(response.data);
            })
            .catch(error => {
              console.log("erro: " + error);
            });
    }, []);

    useEffect(() => {
        getDisponibleExchanges();
    }, [getDisponibleExchanges]);

    return (
      <div className='exchanges-container'>
          <div className='user-exchanges-container'>
              <div className='exchanges-status'>
              {user && exchangesDisponible && exchangesDisponible.content.length > 0 && 
                <div className='exchanges-waiting-header'>
                  <h2 className='exchanges-waiting'>Exchanges waiting for an offer</h2>
                </div>
                }
                  <div className='exchanges-status-top'></div>
                  <div className='exchanges-zone'>
                    {user && exchangesDisponible && exchangesDisponible.content.length > 0 ? (
                        exchangesDisponible.content.map(exchange => (
                          <div className='exchange-column' key={exchange.id}>
                            <ExchangeCard exchange={exchange} user={user} onChangeStatus={getDisponibleExchanges} color='#00FFFF' />
                          </div>
                        ))
                    ) : (
                        <div className='exchanges-avaliable-message'>
                            <h2>There are no exchanges available</h2>
                        </div>
                    )}
                  </div>
              </div>
          </div>
      </div>
  );
  
}

export default DisponibleExchanges;