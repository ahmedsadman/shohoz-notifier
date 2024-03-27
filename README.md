## Shohoz Notifier
A simple script that enables you to send email when a certain bus operator is available on Shohoz.com at your preferred journey date

### Usage
A CRON job can be used to execute the following command
```
docker run -v ${PWD}/timer.txt:/home/node-app/timer.txt -e POSTMARK_API_KEY=<API_KEY> -e MIN_DELAY_THRESHOLD=<TIME_IN_MS> ahmedsadman/shohoz-notifier <SHOHOZ_URL> <OPERATOR> <EMAIL>
```

Let's break this down.

`${PWD}/timer.txt:/home/node-app/timer.txt`: The timer.txt file should exist in the directory before running the above command. This file will be used to track last email sending time.

`POSTMARK_API_KEY`: API Key for SMTP server. I'm using Postmark here

`MIN_DELAY_THRESHOLD`: Time to wait before sending the next email. It will keep sending the email in given threshold delays until you turn off the CRON job

`<SHOHOZ_URL>`: The URL you get on your browser after applying your trip info

`<OPERATOR>`: The bus operator you're looking for. Has to be exact match

`<EMAIL>`: The email address to send notifications to

Here's an example:
```
docker run -v ${PWD}/timer.txt:/home/node-app/timer.txt -e POSTMARK_API_KEY="my-key" -e MIN_DELAY_THRESHOLD="60000" ahmedsadman/shohoz-notifier "https://www.shohoz.com/booking/bus/search?fromcity=Dhaka&tocity=Rangpur&doj=28-Mar-2024&dor=" "S.R Travels (Pvt) Ltd" test@email.com 
```
