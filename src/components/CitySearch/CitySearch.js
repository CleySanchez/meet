import { useState } from 'react';
import PropTypes from 'prop-types';

const CitySearch = ( {allLocations, setSelectedCity, setInfoAlert, setErrorAlert}) => {

    const allCitiesString = 'See All Cities';
    
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState(allLocations);

    const handleInputChanged = (event) => {
        let eventValue = event.target.value;

        const regex = /^[a-zA-Z\s'-,]*$/;

        //Tests for acceptable inputs
        if(regex.test(eventValue))
        {
            const filteredLocations = allLocations ? allLocations.filter((location) => {
                return location.toLowerCase().indexOf(eventValue.toLowerCase()) > -1;
            }) : [];

            if(setInfoAlert){
                if(filteredLocations.length === 0) {
                    setInfoAlert('We can not find the city you are looking for.  Please try another city.')
                }else{
                    if(setInfoAlert)
                        setInfoAlert('');
                }
            }
    
            setQuery(eventValue);
            setSuggestions(filteredLocations);
        }else{
            if(setErrorAlert)
                setErrorAlert('Please use letters, spaces, dashes or apostrophies')
            setQuery(query);
        }


    };

    const handleItemClicked = (event) => {
        const eventValue = event.target.textContent;
        setQuery(eventValue);
        setShowSuggestions(false);
        //THIS IS ONLY FOR THE TEST, WE SHOULD ADD TO PROPTYPES
        if(setSelectedCity)
            setSelectedCity(event.target.textContent);
    };

    return (
        <div id="city-search">
            <input
                type="text"
                className="city"
                value={query}
                placeholder="Search for a city"
                onFocus={() => setShowSuggestions(true)}
                onChange={handleInputChanged}
            />
            {showSuggestions ? 
                <ul 
                    className='suggestions'
                >
                    {suggestions.map((suggestion) => {
                        return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
                    })}
                    <li key='See all cities' onClick={handleItemClicked}>
                        <b>{allCitiesString}</b>
                    </li>
                </ul>
                :null}
        </div>
    )

}

 export default CitySearch;

 CitySearch.propTypes = {
    allLocations: PropTypes.array.isRequired,
    setSelectedCity: PropTypes.func,
    setInfoAlert: PropTypes.func,
    setErrorAlert: PropTypes.func
 }