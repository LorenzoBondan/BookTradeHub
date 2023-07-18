import ColorfulText from './ColorfulText';
import './styles.css';
import logo from 'assets/images/logo.png';

const Home = () => {
    return(
        <div className='home-container'>
            <div className='home-content-container'>
                <h1>BookTradeHub</h1>
                <ColorfulText/>
                <div className="arrow-container">
                    <div className="arrow-created"></div>
                    <div className="arrow"></div>
                </div>
            </div>
            <div className='home-image-container base-card'>
                <img src={logo} alt="" />
            </div>
        </div>
    );
}

export default Home;