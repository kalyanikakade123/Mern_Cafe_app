const express = require('express')
const app = express()
const port = 8000
const mongoose = require('./db.js');
const Subscription = require('../backend/models/Subscription.js')
const cors = require("cors");
require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', require("./Routes/CreateUser.js"));
app.use('/api', require("./Routes/DisplayData.js"));
app.use('/api', require("./Routes/OrderData.js"));
app.use('/api', require("./Routes/GetSubscriptionData.js"));
app.use('/api/admin', require("./Routes/AdminRoutes.js"));
app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_ID_KEY,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);
    console.log(order);
    if (!order) {
      return res.status(500).send("Error");
    }

    res.json(order);

  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.post("/order/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, receipt, email, id } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }
  console.log(req.body)
  try {
    if (receipt === "#2MealSubscription" || receipt === "#1MealSubscription") {
      try {
            if (receipt === "#2MealSubscription") {
                const newSubscription = await Subscription.create({
                userId: id,
                email: email,
                type: '2 meals/day',
                paymentId: razorpay_payment_id, 
                startDate: Date.now(),  
                endDate: new Date(Date.now() + 26 * 24 * 60 * 60 * 1000),
              });
            }
            if (receipt === "#1MealSubscription") {
              const newSubscription = await Subscription.create({
              userId: id,
              email: email,
              type: '1 meal/day',
              paymentId: razorpay_payment_id, 
              startDate: Date.now(),  
              endDate: new Date(Date.now() + 26 * 24 * 60 * 60 * 1000),
            });
          }
            
      } catch (error) {
        console.log(error);
        res.json({success: false}); 
      }
      console.log("Subscription payment successful!");
    }
  }catch(error) {
    console.log(error);
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });


});
``
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
