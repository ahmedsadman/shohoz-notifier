import puppeteer from 'puppeteer';

(async () => {
    const url = 'https://www.shohoz.com/booking/bus/search?fromcity=Dhaka&tocity=Rangpur&doj=28-Mar-2024&dor=';
    const url2 = 'https://www.shohoz.com/booking/bus/search?fromcity=Dhaka&tocity=Rangpur&doj=10-May-2024&dor='
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('#bus_tckt_rows');
    const noResultsNode = await page.$('.bold_ticket_text');
    
    if (noResultsNode) {
        console.log('noting found');
        browser.close();
        return;
    }
    
    const elements = await page.$$('.op_name');
    const operators = await Promise.all(elements.map(el => el.evaluate(e => e.textContent)));
    // console.log(operators);
    browser.close();
})();
