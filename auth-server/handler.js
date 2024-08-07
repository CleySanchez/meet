'use strict';

const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'https://CleySanchez.github.io/meet/'
);

module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.readonly'],
  });
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ authUrl }),
  };
};

module.exports.getAccessToken = async (event) => {
  const code = decodeURIComponent(`${event.pathParameters.code}`);
  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
    .then((results) => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(results.tokens),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};

module.exports.getCalendarEvents = async (event) => {
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
    calendar.events.list(
      {
        calendarId: process.env.CALENDAR_ID,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  })
    .then((results) => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ events: results.data.items }),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};
