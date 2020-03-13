# Ramen Empire

The project our group selected to build is a Food Web App. It allows the client/user to order menu items, insert information to a payment form, and then redirect to a confirmation page. 
On the confirmation page, they will see their order confirmation and how long it will take for them to travel to the restaurant. There is also a Google Map that shows the fastest route 
reach the restaurant via different travel methods, such as driving, cycling or walking. We also implemented Twilio, which sends a text to the restaurant after a order submission, 
which then the restaurant can send a text back telling the client how long it will take for the order to be completed. 


## Final Product

!["Screenshot of Landing Page showing 2 order items added to food cart"](https://github.com/rahomohamed/foodpickup/blob/master/docs/Screen%20Shot%202020-03-13%20at%203.34.47%20PM.png?raw=true)
!["Screenshot of Payment Page form with order summary"](https://github.com/rahomohamed/foodpickup/blob/master/docs/Screen%20Shot%202020-03-13%20at%203.36.02%20PM.png?raw=true)
!["Screenshot of Confirmation Page with the Google Map API used to show distance, route & time from client's address to restaurant"](https://github.com/rahomohamed/foodpickup/blob/master/docs/Screen%20Shot%202020-03-13%20at%203.36.30%20PM.png?raw=true)




## Dependencies
- Node.js
- AJAX
- jQuery
- HTML5
- CSS3
- Nodemon
- Morgan
- Chalk
- Body-Parser
- pg
- pg-native
- Twilio
- Semantic-UI
- Express
- EJS
- Node-Sass-Middleware
- Dotenv

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`


