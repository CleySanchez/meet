
import testEventData from './testEventData.js';

/*
*   REQ_PARAM:  List of events
*   MAPS:       events
*   TO ARRAY:   locations
*   ERASING:    duplicates
*   RETURNING   remaining event locations
*/
export const extractLocations = async(eventsPromise) => {
    const events = eventsPromise;
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];
    return locations;
};

export const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');

    const tokenCheck = accessToken && (await checkToken(accessToken))

    if(!accessToken || tokenCheck.error) {
        await localStorage.removeItem('access_token');
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get('code');
        const getAuthURL = 'https://iiyc8mchcj.execute-api.ap-northeast-3.amazonaws.com/dev/api/get-auth-url';
        if (!code) {
            const response = await fetch(getAuthURL);
            const result = await response.json();
            const { authUrl } = result;
            return (window.location.href = authUrl);
        }
        return code && getToken(code);
    }
    return accessToken;
};

const checkToken = async (accessToken) => {
    try{
        const response = await fetch(
            `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
        );
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error checking token', error);
        return { error: 'Failed to check token'};
    }

};

const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(`https://iiyc8mchcj.execute-api.ap-northeast-3.amazonaws.com/dev/api/token/${encodeCode}`);
    const { access_token } = await response.json();
    access_token && localStorage.setItem('access_token', access_token);

    return access_token;
};

export const getTestEvents = async () => {
    return testEventData;
}

/*
*   FETCH:      data
*   FROM:       testEventData.js
*/
export const getEvents = async () => {
    
    if(window.location.href.startsWith('http://localhost')) {
        return testEventData;
    }

    if(!navigator.onLine) {
        const events = localStorage.getItem('offlineEvents');
        return events?JSON.parse(events):[]
    }
    
    const token = await getAccessToken();

    if(token) {
        removeQuery();
        const response = await fetch(`https://iiyc8mchcj.execute-api.ap-northeast-3.amazonaws.com/dev/api/get-calendar-events/${token}`);
        if(!response.ok) {
            console.error('Error while fetching events:', response.statusText);
            return null;
        }        
        const result = await response.json();
        if(result) {
            localStorage.setItem("offlineEvents", JSON.stringify(result.events));
            return result.events;
        }else{
            return null;
        }
    }
};

const removeQuery = () => {
    let newURL;
    if(window.history.pushState && window.location.pathname) {
        newURL = 
            window.location.protocol + 
            '//' + 
            window.location.host +
            window.location.pathname;
        window.history.pushState('', '', newURL);
    }else{
        newURL = 
            window.location.protocol +
            '//' +
            window.location.host;
        window.history.pushState('', '', newURL);
    }
};
