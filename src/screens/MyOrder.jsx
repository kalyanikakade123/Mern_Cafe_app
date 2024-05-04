import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setorderData] = useState({});

  const fetchMyOrder = async () => {
    // console.log(localStorage.getItem("userEmail"));
    await fetch("http://localhost:8000/api/myorderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setorderData(response);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="row">
          {orderData != {}
            ? Array(orderData).map((data) => {
                return data.orderData
                  ? data.orderData.order_data
                      .slice(0)
                      .reverse()
                      .map((item) => {
                        return item.map((arrayData) => {
                          return (
                            <div>
                              {arrayData.Order_date ? (
                                <div className=" mt-3">
                                  <h4>{(data = arrayData.Order_date)}</h4>
                                  <hr />
                                </div>
                              ) : (
                                <div className="col-12 col-md-6 col-lg-3 text-black">
                                  <div
                                    className="card mt-2 container"
                                    style={{
                                      width: "18rem",
                                      minHeight: "190px",
                                      backgroundImage: "URL(https://img.freepik.com/free-photo/top-close-up-view-vegetables-tomatoes-with-pedicels-garlic-bell-peppers-lemon-oil-onion_140725-72203.jpg)",
                                      
                                    }}
                                  >
                                    {/* <img
                                      src={arrayData.img}
                                      className="card-img-top"
                                      alt="..."
                                      style={{
                                        height: "120px",
                                        objectFit: "fill",
                                      }}
                                    /> */}
                                    <div className="card-body">
                                      <h5 className="card-title">
                                        {arrayData.name}
                                      </h5>
                                      <div
                                        className="container w-100 p-0"
                                        style={{ height: "68px" }}
                                      >
                                        <span className="m-1">
                                          Quantity: {arrayData.qty}
                                        </span>
                                        {/* <span className="m-1">
                                          {arrayData.size}
                                        </span> */}
                                        <div className="m-1">Date: {data}</div>
                                        <div className=" d-inline ms-1 h-100 w-20 fs-5">
                                          Price: ₹{arrayData.price}/-
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        });
                      })
                  : "";
              })
            : ""}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
