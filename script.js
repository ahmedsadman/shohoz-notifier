import 'dotenv/config';
import yargs from 'yargs';
import Parser from './parser.js';
import mailer from './mailer.js';

(async () => {
    const argv = process.argv.slice(2);
    const [url, operator, email] = argv;
    const parser = new Parser(url);

    try {
        await parser.parse();

        if (await parser.noResultsFound()){
            console.log('Nothing found');
            parser.close();
            return;
        }
    
        if (await parser.hasBusOperator(operator)) {
            const subject = `Bus ticket for ${operator} is available`;
            const text = 'This is a reminder. Check out the website to book tickets'
            await mailer.emitSend(email, subject, text);
        }
    } catch (err) {
        console.log(err);
    } finally {
        parser.close();
        console.log(`Script complete: ${new Date().toUTCString()}`);
    }
})();
