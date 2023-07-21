import { Controller, useForm } from 'react-hook-form';
import './styles.css';
import { Book, Exchange, User } from 'types';
import { useHistory } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import { getTokenData } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { toast } from 'react-toastify';
import Select from "react-select";

type Props = {
    onSubmitForm: Function;
    onCancelForm: Function;
}

const CreateExchange = ({onSubmitForm, onCancelForm} : Props) => {

    const {handleSubmit , control} = useForm<Exchange>();

    const history = useHistory();

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
            console.log("User:", response.data);
        }
        } catch (error) {
        console.log("Error: " + error);
        }
    }, []);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const onSubmit = async (formData: Exchange) => {
        if (user) {
          formData.creator = user;
          formData.status = "DISPONIBLE";
          const startDate = new Date();
          startDate.setHours(startDate.getHours() - 3);
          formData.creationTime = startDate.toISOString();
          formData.bookReceived = null;
          formData.receiver = null;
    
          console.log(formData);
    
          try {
            const params: AxiosRequestConfig = {
              method: "POST",
              url: "/exchanges",
              data: formData,
              withCredentials: true,
            };
    
            await requestBackend(params);
            history.push("/exchanges");
            toast.success("Exchange created!");
            onSubmitForm();
          } catch (error) {
            console.log("Error: " + error);
          }
        }
    };

    const handleCancel = () => {
        history.push("/exchanges");
        onCancelForm();
    };

    return(
        <div className='create-exchange-container'>
            <h1>Create new Exchange</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-inputs-container'>
                <Controller
                    name="bookOffered"
                    rules={{ required: false }}
                    control={control}
                    render={({ field }) => (
                    <Select
                        {...field}
                        options={user?.myBooks?.sort((a, b) =>
                          a.title > b.title ? 1 : -1
                        )}
                        classNamePrefix="my-books-select"
                        placeholder="My books"
                        getOptionLabel={(b: Book) => b.title}
                        getOptionValue={(b: Book) => b.id.toString()}
                      />
                    )}
                />
                </div>
                <div className="form-buttons-container">
                <button
                  className="btn btn-outline-secondary post-crud-buttons"
                  onClick={handleCancel}
                >
                  CANCEL
                </button>
                <button
                  className="btn btn-primary text-white post-crud-buttons"
                  onClick={handleSubmit(onSubmit)}
                >
                  SAVE
                </button>
              </div>
            </form>
        </div>
    );
}

export default CreateExchange;