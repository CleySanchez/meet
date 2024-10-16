
import puppeteer from "puppeteer";

describe('Show / Hide Event Details', () => {

    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 100, //ms
            timeout: 0 //hours
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    })

    afterAll(() => {
        browser.close();
    })

    test('An event element is collapsed by default', async () => {

        // if your event's details have a different selector, use it instead of .event .details
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();

    });

    test('User can expand an event to see its details', async() => {

        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined();

    });

    test('User can collapse an event to hide details', async() => {
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    })
    
});