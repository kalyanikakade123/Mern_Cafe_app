import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Subscription() {
  const userEmail = localStorage.getItem("userEmail");
  const userId = localStorage.getItem("id");
  const handleTwoMeal = async () => {
    const response = await fetch("http://localhost:8000/order", {
      method: "POST",
      body: JSON.stringify({
        amount: 4800 * 100,
        currency: "INR",
        receipt: "#2MealSubscription",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    const options = {
      key: "rzp_test_G881fHk9XTGgAT",
      amount: 4800 * 100,
      currency: "INR",
      name: "F3 CAFE",
      description: "Test Transaction",
      image: "../vite.svg",
      order_id: order.id,
      config: {
        display: {
          hide: [
            {
              method: "paylater",
            },
          ],
          preferences: {
            show_default_blocks: true,
          },
        },
      },
      handler: async function (response) {
        const body = {
          ...response,
          receipt: "#2MealSubscription",
          email: userEmail,
          id: userId,
        };
        const validateRes = await fetch(
          "http://localhost:8000/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        name: "kkkkkkkkkk",
        email: "kkkkkkkkkkkkkkkk@example.com",
        contact: "9000000000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#198754",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };

  const handleOneMeal = async () => {
    const response = await fetch("http://localhost:8000/order", {
      method: "POST",
      body: JSON.stringify({
        amount: 2600 * 100,
        currency: "INR",
        receipt: "#1MealSubscription",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();

    const options = {
      key: "rzp_test_G881fHk9XTGgAT",
      amount: 2600 * 100,
      currency: "INR",
      name: "F3 CAFE",
      description: "Test Transaction",
      image: "../vite.svg",
      order_id: order.id,
      config: {
        display: {
          hide: [
            {
              method: "paylater",
            },
          ],
          preferences: {
            show_default_blocks: true,
          },
        },
      },
      handler: async function (response) {
        const body = {
          ...response,
          receipt: "#1MealSubscription",
          email: userEmail,
          id: userId,
        };
        const validateRes = await fetch(
          "http://localhost:8000/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        name: "kkkkkkkkkk",
        email: "kkkkkkkkkkkkkkkk@example.com",
        contact: "9000000000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#198754",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };

  const [subscription, setSubscription] = useState({});

  const fetchSubscriptions = async () => {
    await fetch(
      `http://localhost:8000/api/findUserSubscription?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(async (response) => {
      let data = await response.json();
      // console.log(data);
      await setSubscription(data);
    });
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const calculateRemainingDays = (eDate) => {
    const currentDate = new Date();
    const endDate = new Date(eDate);
    const timeDifference = endDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    // console.log(currentDate.getTime());
    // console.log(endDate.getTime());
    // console.log(daysRemaining);
    return daysRemaining;
  };

  return (
    <>
      <div>
        <div>
          <Navbar />
        </div>

        <div action="/subscribe">
          <div>
            {Object.keys(subscription).length > 0 ? (
              subscription.endDate > subscription.startDate &&
              calculateRemainingDays(subscription.endDate) !== 0 ? (
                <div className="card text-dark bg-warning m-3 text-center">
                  <div className="card-body">
                    <h5 className="card-title text-white">
                      Congrats! You have buy a Subscription of{" "}
                      {subscription.type}{" "}
                    </h5>
                    <p className="card-text fw-bold">
                      REMAINING DAYS:{" "}
                      {calculateRemainingDays(subscription.endDate)}
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )
            ) : (
              <p>No subscription found.</p>
            )}
          </div>

          <div className="text-success m-3 text-center fst-italic fs-3">
            <h3>Get Monthly Subscription Offer</h3>
          </div>
          <div
            className="card container mt-3"
            style={{
              width: "20rem",
              backgroundImage:
                'url("https://media.istockphoto.com/id/1198380802/vector/food-background-vegetables-seamless-pattern-healthy-eating-tomato-garlic-carrot-pepper.jpg?s=612x612&w=0&k=20&c=jHB3uTWZrakPyAgqSQfOApxSq_jIwHRx00LiOV2YHEk=")',
              backgroundSize: "cover",
            }}
          >
            <img
              src="https://t3.ftcdn.net/jpg/04/97/28/94/360_F_497289420_mVRWSAlBWYQlfvKJG0xmAPtMZgzIsk1E.jpg"
              className="card-img-top mt-2 rounded border border-3 border-dark rounded-3g"
              alt="..."
            />
            <div className="card-body w-100">
              {/* <h5 className="card-title  text-center text-success">Get Monthly Subscription</h5>
              <hr /> */}
              <button
                className="card-text btn btn-success justify-center ms-2 mb-3 text-white fw-bold"
                onClick={handleTwoMeal}
              >
                <div> 2 Meals/Day- only at ₹4800/-</div>
                <div>(₹92/meal - 52 Meals)</div>
              </button>
              <button
                className="card-text btn btn-success justify-center ms-2 text-white fw-bold"
                onClick={handleOneMeal}
              >
                <div>1 Meals/Day- only at ₹2600/-</div>
                <div>(₹100/meal - 26 Meals)</div>
              </button>
            </div>

            {/* <div className="text-black text-center fs-3 fw-bold">
          <h2>Get Additional 10% Discount for first 20 Bookings</h2>
          </div>
          <div className="text-black text-center m-2 ms-1 me-1 fs-2 fst-italic m-2 w-100%">
          <h3 className="p-2">For monthly Corporate Lunch subscription at special price. Please Contact - 7020574311</h3>
          </div> */}
          </div>

          <div className="text-white mt-2 text-center fs-3">
            <h3>Get Additional 10% Discount for first 20 Bookings</h3>
          </div>
          <div className="text-warning text-center mt-3 fs-2 fst-italic w-100%">
            <h4 className="p-2">
              For monthly Corporate Lunch subscription at special price. Please
              Contact - 7020574311
            </h4>
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
