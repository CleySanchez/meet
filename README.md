# meet
# Meet App

## Project Overview
The Meet App is a serverless, progressive web application (PWA) built with React, utilizing a test-driven development (TDD) approach. The app uses the Google Calendar API to fetch upcoming events, and allows users to search for events by city, view event details, specify the number of events, use the app offline, add a shortcut to their home screen, and visualize event details through charts.

## Objectives
- Build a serverless PWA using React.
- Implement TDD to ensure high-quality code.
- Utilize the Google Calendar API for fetching event data.
- Deploy the app using GitHub Pages.
- Incorporate data visualization to display event details.

## User Stories and Scenarios

### Feature 1: Filter Events By City

#### User Story
As a user, I should be able to filter events by city so that I can see relevant events.

#### Scenarios
1. **Given** the user hasn’t searched for a city, **then** show upcoming events from all cities.
2. **Given** the user searches for a city, **when** they type in the search box, **then** show a list of suggestions.
3. **Given** the user selects a city from the suggested list, **then** show events for that city.

### Feature 2: Show/Hide Event Details

#### User Story
As a user, I should be able to view more details of an event so that I can get complete information.

#### Scenarios
1. **Given** an event is collapsed by default, **when** the user clicks on the event, **then** the event details should expand.
2. **Given** the event details are expanded, **when** the user clicks on the event again, **then** the event details should collapse.

### Feature 3: Specify Number of Events

#### User Story
As a user, I should be able to specify the number of events to view so that I can manage the amount of information displayed.

#### Scenarios
1. **Given** the user hasn’t specified a number, **then** 32 events should be shown by default.
2. **Given** the user specifies a number, **then** the specified number of events should be displayed.

### Feature 4: Use the App When Offline

#### User Story
As a user, I should be able to use the app offline so that I can access information without an internet connection.

#### Scenarios
1. **Given** the user is offline, **then** show cached data.
2. **Given** the user changes search settings while offline, **then** show an error.

### Feature 5: Add an App Shortcut to the Home Screen

#### User Story
As a user, I should be able to add the app to my home screen so that I can quickly access it.

#### Scenarios
1. **Given** the user is using the app, **when** they select the option to add to the home screen, **then** the app should be added as a shortcut.

### Feature 6: Display Charts Visualizing Event Details

#### User Story
As a user, I should be able to see visual data of events so that I can easily understand event distributions and trends.

#### Scenarios
1. **Given** the user views event details, **then** show a chart with the number of upcoming events in each city.

## Development and Deployment Tasks

### Create React App
1. **Initialize the project using Create React App:**
   ```bash
   npx create-react-app meet --template cra-template-pwa --use-npm

### Deploy to GitHub Pages
- Configure the project for deployment using GitHub Pages.
- Verify the deployment by accessing the live URL.

### AWS Account Creation
- Follow the tutorial steps to create an AWS account for future use in serverless functions and deployment.

## Additional Notes
- Ensure the app meets all technical requirements such as compatibility with major browsers, responsive design, offline functionality, and PWA compliance.
- Utilize TDD by writing tests before implementing features to ensure code quality and reliability.
- Use data visualization libraries like Chart.js or D3.js for implementing charts in the app.

## Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone https://github.com/CleySanchez/meet.git
   cd meet
