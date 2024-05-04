const express = require("express");
const User = require("../models/User");
const Order = require('../models/Orders');
const router = express.Router();

router.route('/users').get(getAllUsers = async(req, res) => {
    try {
        const users = await User.find( { role: { $ne: 'admin' }}, {password: 0, role: 0} );
        if (users.length === 0) {
            return res.status(404).json({message: "No Users Found"})
        }
        return res.status(200).json(users);
    } catch (error) {
        res.status(404).send(error.message)
    }
});


router.get('/userorders', async (req, res) => {
    try {
        const myData = await Order.find({});
        if (!myData) {
            return res.status(404).json({message: "No Orders Found"});
        }
        return res.status(200).json(myData);
    } catch (error) {
        res.status(404).send(error.message);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;

