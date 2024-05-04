import React from 'react'
import {useCart, useDispatchCart} from '../components/ContextReducer.jsx';
import { FaTrash } from 'react-icons/fa';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
      return (
        <div>
            <div className='m-5 w-100 text-center fs-3'>Your Cart is Empty!</div>
        </div>
      )
    }

    const handleCombinedAction = () => {
      handleCheckOut();
      paymentHandler();
    }

    const handleCheckOut = async() => {
      let userEmail = localStorage.getItem("userEmail");
      let response = await fetch("http://localhost:8000/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });
      console.log("Order Response:", response)
      if(response.status === 200) {
        dispatch({type: "DROP"})
      }
    }
    
    let totalPrice = data.reduce((total, food) => (total + food.price), 0);
    console.log(totalPrice)
    const currency = "INR";
    const receiptId = "receipt#1";
    let amount = totalPrice*100;
    
    const paymentHandler = async() => {
      const response = await fetch("http://localhost:8000/order", {
        method: "POST",
        body: JSON.stringify({
          amount,
          currency,
          receipt: receiptId,
        }),
        headers: {
          "Content-Type": "application/json",
        }
      });
      const order = await response.json();
      // console.log(order);

      const options = {
        key: "rzp_test_G881fHk9XTGgAT", 
        amount, 
        currency,
        name: "F3 CAFE", 
        description: "Test Transaction",
        image: "../vite.svg",
        order_id: order.id, 
        config: {
          display: {
            hide: [
              {
                method: 'paylater'
              }
            ],
            preferences: {
              show_default_blocks: true,
            },
          },
        },
        handler: async function (response) {
          const body = {
            ...response,
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
      // e.preventDefault();
    };

  
  return (

    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-3'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              {/* <th scope='col' >Option</th> */}
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                {/* <td>{food.size}</td> */}
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"><FaTrash onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCombinedAction} > Check Out </button>
        </div>
      </div>

    </div>
  )

}