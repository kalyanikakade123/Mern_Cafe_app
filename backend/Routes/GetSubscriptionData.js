const express = require('express');
const Subscription = require('../models/Subscription');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/subscriptionData', async (req, res) => {
    try {
        const data = await Subscription.find({});
        if (!data) {
            return res.status(404).json({message: "No Subscriptions Found"});
        }
        return res.status(200).json(data);
    }catch (error) {
        res.status(404).send(error.message);
    }
})

router.get('/findUserSubscription', async (req, res) => {
    try {
        const userId = req.query.userId;
        const user = await Subscription.findOne({userId, endDate: { $gt: Date.now() },})
        // console.log("to findUserSubscription", userId)
        if (!user) {
            return res.status(404).json({message: "No Subscription Found"});
        }
        return res.status(200).json(user);
    }catch (error) {
        res.status(404).send(error.message);
    }
})

module.exports = router;