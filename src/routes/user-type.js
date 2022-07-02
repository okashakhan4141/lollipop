const express = require('express');
const { param } = require('express-validator');
const { validateRequest } = require('../middlewares/validateRequest')
const { getDatabase, ref, child, get } = require("firebase/database");

const router = express.Router();

router.get(
    '/api/lolipop/user-type/:userId',
    [
        param('userId').notEmpty().withMessage('Provide User ID').bail().isString().withMessage('Invalid Format').bail()
    ],
    validateRequest,
    async (req, res) => {

        try {

            const { userId } = req.params;

            const dbRef = ref(getDatabase());
            const snapshot = await get(child(dbRef, `Users/${userId}`));

            const user = snapshot.exists() ? snapshot.val() : {};

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

module.exports.userType = router;