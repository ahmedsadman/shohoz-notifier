import Parser from './parser.js';

(async () => {
    const url = 'https://www.shohoz.com/booking/bus/search?fromcity=Dhaka&tocity=Rangpur&doj=28-Mar-2024&dor=';
    const url2 = 'https://www.shohoz.com/booking/bus/search?fromcity=Dhaka&tocity=Rangpur&doj=10-May-2024&dor='

    const parser = new Parser(url);
    await parser.parse();

    if (await parser.noResultsFound()){
        console.log('Nothing found');
        parser.close();
        return;
    }

    const operators = await parser.getBusOperatorNames();
    console.log(operators);
    console.log(await parser.hasBusOperator('S.R Travels (Pvt) Ltd'));

    parser.close();
})();
