# wei_app_v2

For past ESIR WEIs (Integration Week End) we used to have an android app that could be used to do challenges that would grand points, and then see a leaderboard that would rank every student based on how much points they have. Unfortunately this app wasn't on iOS, which made the app not usable for iPhone users (a lot of students).

I remade the app as a website, hosted on ovh ([link](https://wei.isati.org)) to cancel this problem and reduce costs.

## Building

- set the server url const `DATABASE_SERVER` inside `shared.js` (see [How to use](#howtouse))
- run `npm install`
- then `npm run build`
- In the dist folder, you'll find all the files needed for the site to run. I uploaded those to a simple ovh server.

<a name="howtouse"></a>
## How to use 

This was meant to be used during the 2022 Integration Weekend, organised by ESIR's students.

You must setup a [WEI server first](https://github.com/BDE-ISATI/wei_app_server)
It is recommended to use a cors proxy, as I ran into problems denying me from contacting the server for info (I used [this one](https://github.com/Rob--W/cors-anywhere) deployed on heroku)