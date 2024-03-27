import puppeteer from 'puppeteer';

class Parser {
    BUS_TICKETS_ROW_SELECTOR = '#bus_tckt_rows';

    constructor(url) {
        this.url = url;
        this.browser = null;
        this.page = null;
    }

    _ensurePage() {
        if (!this.page) {
            throw new Error('Page not found. Make sure you parsed the page by calling .parse');
        }
    }

    async parse() {
        this.browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
        const page = await this.browser.newPage();

        await page.goto(this.url);
        await page.waitForSelector(this.BUS_TICKETS_ROW_SELECTOR);
        this.page = page;
    }

    async noResultsFound() {
        this._ensurePage();
        const noResultsNode = await this.page.$('.bold_ticket_text');
        return Boolean(noResultsNode);
    }

    async getBusOperatorNames() {
        this._ensurePage();
        const elements = await this.page.$$('.op_name');
        const operators = await Promise.all(elements.map(el => el.evaluate(e => e.textContent)));
        return operators;
    }

    async hasBusOperator(operator) {
        this._ensurePage();
        const operators = await this.getBusOperatorNames();
        return operators.findIndex(op => op === operator) >= 0;
    }

    close() {
        if (this.browser) {
            this.browser.close();
            this.browser = null;
            this.page = null;
        }
    }
}

export default Parser;
