import { useState, useEffect } from 'react';
import './App.css';
import { extractLocations, getEvents } from './api';
import CitySearch from './components/CitySearch/CitySearch';
import EventList from './components/EventList/EventList';
import NumberOfResults from './components/NumberOfResults/NumberOfResults';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert/Alert'; 
import CityEventChart from './components/CityEventsChart/CityEventsChart';
import ChartPie from './components/ChartPie/ChartPie';

function App() {

    const [numberOfResults, setNumberOfResults] = useState(32);
    const [selectedCity, setSelectedCity] = useState('');
    const [events, setEvents] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [infoAlert, setInfoAlert] = useState('');
    const [errorAlert, setErrorAlert] = useState('');
    const [onlineWarningAlert, setOnlineWarningAlert] = useState('');

    const fetchInitialData = async () => {
        setIsLoading(true);
        const allEvents = await getEvents();
        setLocations(await extractLocations(allEvents));
        setEvents(allEvents);
        setIsLoading(false);
    };

    const fetchData = async() => {
        const allEvents = await getEvents();
        setLocations(await extractLocations(allEvents));
        setEvents(allEvents);
    }

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [setOnlineWarningAlert])

    //TODO: Put a permanent OnlineStatus rather than the event box
    let offlineMessage = 'Currently Offline - Jump online for the newest events!'
    window.addEventListener('online', () => {setOnlineWarningAlert('')});
    window.addEventListener('offline', () => {
        // seOnlineWarningAlert has a useEffect, so this avoids double-loading
        if(!isLoading)
            setOnlineWarningAlert(offlineMessage);
    });


    return (
        isLoading?
            (
                <div>
                    <LoadingScreen />
                </div>
            ):(
                <>
                    
                    <div className="App">
                        {/* TiITLE */}
                        <h1 className='title'>Meet App</h1>
                        {/* ALERT */}
                        <div className='alerts-container'>
                            { errorAlert.length ?
                                <ErrorAlert text={errorAlert} />
                            : onlineWarningAlert.length ?
                                <WarningAlert text={onlineWarningAlert} />
                            : infoAlert.length ? 
                                <InfoAlert text={infoAlert} />
                            : null}
                        </div>
                        {/* SEARCH BAR - CITY */}
                        <CitySearch 
                            allLocations = {locations}
                            setSelectedCity = {setSelectedCity}
                            setInfoAlert = {setInfoAlert}
                            setErrorAlert = {setErrorAlert}
                        />
                        {/* INPUT - # of CITIES */}
                        <NumberOfResults
                            setNumberOfResults = {setNumberOfResults}
                        />
                        {/* CHARTS */}
                        <div className='charts-container'>
                            <CityEventChart 
                                allLocations={locations}
                                events={events}
                            />
                            <ChartPie 
                                events={events}                 
                            />
                        </div>
                        {/* EVENTS */}
                        <EventList 
                            events = {events}
                            numberOfResults = {numberOfResults}
                            selectedCity = {selectedCity}
                            setInfoAlert = {setInfoAlert}
                        />
                        
                    </div>
                </>
            )
    );
}

export default App;
