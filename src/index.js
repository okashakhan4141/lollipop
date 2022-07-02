require('dotenv').config({ path: '../.env' })

const express = require('express');
const { json } = require('body-parser');

const { initializeApp } = require("firebase/app");
const { firebaseConfig } = require("./config/firebase")
const { login } = require("./routes/login")
const { userType } = require("./routes/user-type")

const app = express();

app.set('trust proxy', true);
app.use(json());

app.use(login);
app.use(userType);

app.all('*', async (req, res) => {
    res.status(404).send({
        "errors": [
            {
                "message": 'Not Found!'
            }
        ]
    })
});

const start = async () => {
    try {
        initializeApp(firebaseConfig);
        console.log(process.env.SERVICE_NAME + ' - Connected to Firebase');
    } catch (err) {
        console.error(err);
    }

    app.listen(process.env.PORT, () => {
        console.log(process.env.SERVICE_NAME + ' - Listening on port ' + process.env.PORT);
    });
};

start();
