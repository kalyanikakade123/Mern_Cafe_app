import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';

export default function AdminUserOrders() {

  const [orders, setOrders] = useState({});

  const fetchUserOrders = async() => {
    await fetch("http://localhost:8000/api/admin/userorders", {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      },
    }).then(async (response) => {
      let data = await response.json();
      // console.log(data)
      await setOrders(data);
    })
  }

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <>
      <div><AdminNavbar/></div>
      <div className='m-3 rounded border-2'>
        <h2 className='text-center text-success'>User Orders</h2>
        {/* {console.log(orders)} */}
      <ol>{orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className='container mt-3'>
              <li>
              <div>UserID: {order._id ? order._id : "N/A"}</div>
              <div>Email: {order.email ? order.email : "N/A"}</div>
              <ul>
              {
                 order.order_data ? 
                 order.order_data.slice(0).reverse().map((item, idx) => (
                  <li key={idx}>
                    <div className="date">{item[0].Order_date}</div>
                    {
                      <ul>
                        {
                          item ? item.map((data,idxi)=> {
                            if(idxi == 0){
                               return ("")
                          }else {
                            return (
                            <div key={idxi}>
                              <li><div>Name :{data.name}</div></li>
                              <li><div>Quantity : {data.qty}</div></li>
                              <li><div>Type: {data.size}</div> </li>
                              <li><div>Price : ₹{data.price}/-</div></li>
                            </div>
                            )
                          }
                        }): <div>Done</div>
                        }
                      </ul>
                    }
                  </li>
                 )) 
                 : <div key={idx}>no date</div>
              }
              </ul>
              
             
              <hr />
              </li>
            </div>
            
          ))
        ) : (
          <p>Nothing in orders</p>
        )}
        </ol>
      </div>
      <div><Footer/></div>
    </>
  )
}
