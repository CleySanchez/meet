
import {useState} from 'react';
import PropTypes from 'prop-types';

const NumberOfResults = ({setNumberOfResults}) => {

    const [inputText, setInputText] = useState(32);


    const handleInputChanged = (event) => {
        
        const eventValue = event.target.value;
        let returnValue = parseInt(eventValue, 10);

        if(!returnValue)
            returnValue = 0;
        if(setNumberOfResults)
            setNumberOfResults(returnValue);
        setInputText(returnValue);
    }

    return (
        <form id="number-of-results" onSubmit={(e)=>e.preventDefault()}>
            <label>Number of Results</label><br/>
            <input 
                type='text'
                className='numOfResults'
                value={inputText}
                placeholder='32'
                onChange={handleInputChanged}
            >
            </input>
        </form>
    );
}

NumberOfResults.propTypes = {
    setNumberOfResults: PropTypes.func
}

export default NumberOfResults;
