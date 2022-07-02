const express = require('express');
const { body } = require('express-validator');
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { validateRequest } = require('../middlewares/validateRequest')

const router = express.Router();

router.post(
    '/api/lolipop/login',
    [
        body('email').exists().withMessage('Provide Email').bail().isEmail().withMessage('Invalid Email').bail(),
        body('password').exists().withMessage('Provide Password').bail().isString().withMessage('Invalid Password').bail(),
    ],
    validateRequest,
    async (req, res) => {

        try {

            const { email, password } = req.body;

            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            res.status(200).send({
                results: {
                    message: `OK|SUCCESS`,
                    data: user
                },
            });

        } catch (err) {
            res.status(400).send({
                "errors": [
                    {
                        "message": err.message
                    }
                ]
            })
        }
    }
);

module.exports.login = router;