
import './LoadingScreen.css';

const LoadingScreen = () => {

    return(
        <div className='main-container'>
            <div className='presentation-text' aria-hidden='true' >
                Welcome to
            </div>
            <h1>
                LetsMeet
            </h1>
            <br />
            <h2>
                Loading Data...
            </h2>
        </div>
    );

}


export default LoadingScreen;