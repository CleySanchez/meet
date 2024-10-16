
import puppeteer from 'puppeteer-core'
import { executablePath } from 'puppeteer'

describe('End-to-End testing for Meet app', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true, // You can set to true for headless mode
      slowMo: 50, // Slow down actions for clarity
      executablePath: executablePath(),
      ignoreDefaultArgs: ['--disable-extensions'],
      timeout: 50000
      });
      
    page = await browser.newPage();
    await page.goto('http://localhost:3000'); // Ensure the correct URL for your local server
    await page.waitForSelector('.event');     // Wait for the event list to be rendered
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details'); // Query for event details
    expect(eventDetails).toBeNull();                      // Ensure details are hidden
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .show-details');             // Click 'show details' button
    const eventDetails = await page.$('.event .details'); // Query for event details
    expect(eventDetails).toBeDefined();                   // Ensure details are visible
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .hide-details');             // Click 'hide details' button
    const eventDetails = await page.$('.event .details'); // Query for event details
    expect(eventDetails).toBeNull();                      // Ensure details are hidden
  });

  test('User can change the number of events displayed', async () => {
    await page.type('.number-of-events', '1');            // Change number of events to 1
    const eventCount = await page.$$eval('.event', events => events.length); // Count events
    expect(eventCount).toBe(1);                           // Ensure only 1 event is displayed
  });
});
