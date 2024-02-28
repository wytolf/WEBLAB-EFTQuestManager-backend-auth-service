require('dotenv').config();
const express = require('express');

const initializeApp = require('firebase/app');
const admin = require('firebase-admin');
const cerdentials = require('./' + process.env.FIREBASE_AUTH_PRIVATE_KEY)

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

function main() {
    const server = express();
    server.use(express.json())

    admin.initializeApp({
        credential: admin.credential.cert(cerdentials)
    });


    server.listen(process.env.PORT, () => {
        console.log('Auth Server is listening....');
    });

    server.post('/api/register', async (req, res) => {
        console.log(`Auth Service: POST /register wurde aufgerufen.`);
        const {email, password, username} = req.body;

        admin.auth().createUser({
            email: email,
            password: password,
            emailVerified: false,
            disabled: false,
            displayName: username
        }).then((result) => {
            const user = result.user;
            console.log(user);
            res.status(200).send("Auth Service: POST /api/register -> User registriert: " + username);
        }).catch((error) => {
            const errorMessage = error.message;
            console.log("Auth Service: POST /api/register -> Fehler beim registrieren: " + errorMessage);
            res.status(500).send("Auth Service: POST /api/register -> Fehler beim registrieren:" + errorMessage);
        });
    });

    ///Login wird vom admin SDK nicht mehr angeboten, das login soll direkt vom Browser ohne admin SDK erfolgen.
    // server.post('/api/login', async (req, res) => {
    //     console.log(`Auth Service: POST /api/login wurde aufgerufen.`);
    //     const {email, password} = req.body;
    //
    //     admin.auth().
    //
    //     signInWithEmailAndPassword(auth, email, password).then((result) => {
    //         const user = result.user;
    //         console.log(user);
    //     }).catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // ..
    //     });
    // });
}

main();