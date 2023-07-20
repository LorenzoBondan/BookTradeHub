import { useForm } from 'react-hook-form';
import {ReactComponent as SearchIcon} from 'assets/images/search-icon.svg';

export type ExchangeFilterData = {
    title : string;
}

type Props = {
    onSubmitFilter : (data: ExchangeFilterData) => void;
}

const ExchangeFilter = ( {onSubmitFilter} : Props ) => {

    const { register, handleSubmit, setValue } = useForm<ExchangeFilterData>();

    const onSubmit = (formData : ExchangeFilterData) => {
        onSubmitFilter(formData);
    };

    const handleFormClear = () => {
        setValue('title', '');
    }

    return(
        <div className="base-card user-filter-container">
            <form onSubmit={handleSubmit(onSubmit)} className='user-filter-form'>
                <div className='user-filter-name-container'>
                    <input 
                        {...register("title")}
                        type="text"
                        className={`form-control text-dark`}
                        placeholder="Book offered title"
                        name="title"
                    />
                    <button className='user-filter-button-search-icon'>
                        <SearchIcon/>
                    </button>
                </div>
                <div className='user-filter-bottom-container'>
                    <button onClick={handleFormClear} className='btn btn-outline-secondary btn-user-filter-clear'>
                        CLEAR <span className='btn-user-filter-word'>FILTER</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ExchangeFilter;