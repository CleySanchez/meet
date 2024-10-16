/* eslint-env node */

const {google} = require('googleapis');
const calendar = google.calendar('v3');
const SCOPES = ['https://www.googleapis.com/auth/calendar.events.public.readonly'];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = [
    'https://sean-andrew-stanek.github.io/letsmeet'
];

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    redirect_uris[0]
);

module.exports.getAuthURL = async () => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    
    return { 
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            authUrl,
        }),
    };
};

module.exports.getAccessToken = async (event) => {
    //Decode from the URL query
    const code = decodeURIComponent(`${event.pathParameters.code}`);

    return new Promise((resolve, reject) => {
        /*
        *   Exchange the AuthCode for the AccessToken with a callback after the exchange
        *   either throwing a error or sending the response
        */

        oAuth2Client.getToken(code, (error, response) => {
            if (error) {
                console.log('oAuth2Client error');
                return reject(error);
            }
            console.log('oAuth2Client successful');
            return resolve(response);
        });
    }).then((results) => {
        //Respond with the OAuth token
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(results),
        };
    }).catch((error) => {
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    });


};

module.exports.getCalendarEvents = async (event) => {
    console.log('inside get Calendar Events');
    const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
    
    oAuth2Client.setCredentials({access_token});

    return new Promise((resolve, reject) => {
        calendar.events.list(
            {
                calendarId: CALENDAR_ID,
                auth: oAuth2Client,
                timeMin: new Date().toISOString(),
                singleEvents: true,
                orderBy: 'startTime',
            },
            (error, response) => {
                if (error) {
                    console.log('calendar error');
                    return reject(error);
                } 
                console.log('calendar successs');
                return resolve(response);
            }
        );
    }).then((results) => {
        console.log(results);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({events: results.data.items}),
        };
    }).catch((error) =>{
        console.log('get calendar error');
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    });
};