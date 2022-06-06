# Coding Challenge for Backend Engineers

- [Coding Challenge for Backend Engineers](#coding-challenge-for-backend-engineers)
  - [Requirements](#requirements)
  - [Current Limitations](#current-limitations)
  - [How to run locally](#how-to-run-locally)
    - [How to create a gmail app password](#how-to-create-a-gmail-app-password)
  - [Instructions](#instructions)

## Requirements
- Node.JS 
- Express.JS 
- Passport.JS: https://www.passportjs.org/packages/
- MongoDB 

You have 7 days upon receiving this test to complete and submit it back to us.

## Current Limitations

1. Only implemented gmail to send email using nodemailer
2. Work with self-signed certificate
3. MongoDB is connected using user:password

## How to run locally

1. Clone the repository
2. Install a mongodb or create a cluster using mongodb atlas
3. Copy example.env as .env
4. Insert mongodb connection string as MONGOCONNECTIONURL in .env
5. Generate a server key & server certificate
```
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr
openssl x509 -req -days 366 -in server.csr -signkey server.key -out server.crt
```
5. Insert the whole path into .env as KEY & CERT
6. Create a gmail app password and paste it into .env as MAILUSER & MAILPASS
7. Generate a random string or a private key as PUB_KEY
8. npm run start

### How to create a gmail app password

1. Go to your google account at https://myaccount.google.com/
2. Go to Security
3. In "Signing in to Google" section choose 2-Step Verification - here you have to verify yourself, in my case it was with phone number and a confirmation code send as text message. After that you will be able to enabled 2-Step Verification
4. Back to Security in "Signing in to Google" section choose App passwords
5. From the Select app drop down choose Other (Custom name) and put a name e.g. nodemailer
6. A modal dialog will appear with the password. Copy that password and paste it in the .env.

---

## Instructions
The purpose of this coding challenge is to set up a Node.JS app that serves a simple CRUD API and can send welcome emails. Familiarity with Node.JS is assumed, however, no prior knowledge of `nodemailer` is required. Besides completing the task according to the set of instructions below, we are looking for well written code and a demonstration of understanding the best practices around Node.JS and Express.JS.

1. Clone this repository and create your own GitHub repository.
2. Push your git repository to GitHub.
3. Initialize a new Node.JS project.
4. Set up `passport` for email and password authentication. 
5. Follow the `nodemailer` SDK setup guide to Initialize it in your Node.JS app: https://nodemailer.com/about/
6. Add an endpoint to create a new user. Requirements: 
    - Method `POST` and path `/users`.
    - Request: email and password.
    - Make sure the password is valid.
    - Make sure the email is deliverable and valid and send a welcome email using nodemailer to that email address.
    - User data should be saved in a MongoDB document.
    - Response: the response should return a JWT.
7. Add an endpoint to update an existing user. Requirements: 
    - Method `PUT`, path `/users/{id}`.
    - Request: username and JWT.
    - Make sure the username is valid.
    - Use a JWT to ensure only the owner of the account is able to update the user data.
    - User data should be saved in a MongoDB document.
    - Response: the response should return a success or error status.
8. Add an endpoint to get an existing user. Requirements: 
    - Method `GET`, path `/users/{id}`.
    - Request: email and password. 
    - Make sure the email and password are valid.
    - Response: the response should return the user data.
9. Add an endpoint to delete an existing user. Requirements: 
    - Method `DELETE`, path `/users/{id}`.
    - Request: JWT. 
    - Make sure the email and password are valid.
    - Use a JWT to ensure only the owner of the account is able to delete the user data.
    - Response: the response should return a success or error status.
10. Deploy the Node.JS app. You can use Vercel, Heroku, AWS free tier or digital ocean (enter promo code DROPLET10 for free credits).
11. When you are done, send us the link to your GitHub repository with a clear README file and any other details required for us to run the app.
12. Final testing and assessment of your app will be done via Postman


