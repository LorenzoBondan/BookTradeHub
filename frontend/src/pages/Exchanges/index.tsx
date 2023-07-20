import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './styles.css';
import { Exchange, SpringPage, User } from 'types';
import { getTokenData } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { BsListTask } from 'react-icons/bs';
import ExchangeCard from './ExchangeCard';

type StatusOption = {
    value: string;
    label: string;
    color?: string;
};

const Exchanges = () => {

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

    const [exchanges, setExchanges] = useState<SpringPage<Exchange>>();
    const [status, setStatus] = useState<string>('DISPONIBLE');
    const [backgroundColor, setBackgroundColor] = useState<string>('#00FFFF');

    const allStatus: StatusOption[] = [
        { value: 'DISPONIBLE', label: 'Disponible' , color:'#00FFFF'},
        { value: 'PENDING', label: 'Pending' , color:'#FFFF00'},
        { value: 'COMPLETED', label: 'Completed' , color:'#00FF00'},
        { value: 'CANCELED', label: 'Canceled' , color: '#FF1493'},
      ];

    const getExchangesByStatus = useCallback(async () => {
        const params: AxiosRequestConfig = {
            method: "GET",
            url: `/exchanges/status/${status}`,
            withCredentials: true
          }
    
          requestBackend(params)
            .then(response => {
                setExchanges(response.data);
            })
            .catch(error => {
              console.log("erro: " + error);
            });
    }, [status]);

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedStatus = event.target.value;
        setStatus(selectedStatus);

        // changing color
        const selectedStatusOption = allStatus.find((statusOption) => statusOption.value === selectedStatus);
        if (selectedStatusOption?.color) {
            setBackgroundColor(selectedStatusOption.color);
        } else {
            setBackgroundColor('#00FFFF');
        }
    };

    useEffect(() => {
        getExchangesByStatus();
    }, [getExchangesByStatus]);


    return(
        <div className='exchanges-container'>
            <div className='exchanges-filter-container'>
                <h2>Status</h2>
                <select className='status-input' value={status} onChange={handleSelectChange} style={{color: backgroundColor}}>
                    {allStatus.map((status) => (
                    <option key={status.value} value={status.value}>
                        {status.label}
                    </option>
                ))}
                </select>
            </div>
            <div className='separator'></div>
            <div className='user-exchanges-container'>
                <div className='exchanges-status'>
                    <div className='exchanges-status-top' style={{backgroundColor: backgroundColor }}></div>
                    <div className='exchanges-status-title'>
                      <h3>Exchanges {status.toLowerCase()}</h3>
                      <h3><BsListTask style={{marginRight:"3px"}}/>{exchanges?.numberOfElements}</h3>
                    </div>
                    {exchanges?.numberOfElements !== 0 && 
                      <div className='exchanges-zone'>
                        {user && exchanges?.content.map(exchange => (
                          <div className='exchange-column' key={exchange.id}>
                            <ExchangeCard exchange={exchange} user={user} onChangeStatus={getExchangesByStatus} color={backgroundColor}/>
                          </div>
                        ))}
                      </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Exchanges;