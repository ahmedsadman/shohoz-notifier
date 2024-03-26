import 'dotenv/config';
import yargs from 'yargs';
import Parser from './parser.js';
import mailer from './mailer.js';

(async () => {
    const argv = yargs(process.argv.slice(2))
        .alias('u', 'url')
        .alias('o', 'operator')
        .alias('e', 'email')
        .describe('u', 'URL of the Shohoz.com website to parse')
        .describe('o', 'Bus operator to look for')
        .describe('e', 'Target email to send notifications to')
        .demandOption(['u', 'o', 'e'])
        .help('h')
        .alias('h', 'help')
        .parse();
    const parser = new Parser(argv.url);

    try {
        await parser.parse();

        if (await parser.noResultsFound()){
            console.log('Nothing found');
            parser.close();
            return;
        }
    
        if (await parser.hasBusOperator(argv.operator)) {
            const subject = `Bus ticket for ${argv.operator} is available`;
            const text = 'This is a reminder. Check out the website to book tickets'
            const messageId = await mailer.send(argv.email, subject, text);
            console.log(`Email Sent: ${messageId}`);
        }
    } catch (err) {
        console.log(err);
    } finally {
        parser.close();
        console.log('Check complete');
    }
})();
