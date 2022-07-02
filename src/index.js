require('dotenv').config({ path: '../.env' })

const express = require('express');
const { json } = require('body-parser');

const app = express();

app.set('trust proxy', true);
app.use(json());

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
        console.log(process.env.SERVICE_NAME + ' - Connected to MongoDb');
    } catch (err) {
        console.error(err);
    }

    app.listen(process.env.PORT, () => {
        console.log(process.env.SERVICE_NAME + ' - Listening on port ' + process.env.PORT);
    });
};

start();
