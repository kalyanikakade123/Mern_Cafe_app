import React, { useEffect, useState, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  let options = props.options;
  const [qty, setQty] = useState(1);

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        console.log(food)
        break;
      }
    }
    console.log(data.length)
      if (food != []) {
        if (food.name === props.foodItem.name) {
          await dispatch({type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: parseInt(qty)});
          return;
        }
        else if (food.name !== props.foodItem.name) {
          await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: parseInt(qty) });
          return;
        }
      }
      await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: parseInt(qty) });
      return;
    }
    
    let finalPrice = qty * props.price;
  
  return (
    <div>
        <div 
          className="card mt-3"
          style={{ width: "16.3rem", maxHeight: "460px" }}
        >
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height: "160px", objectFit: "fill"}}/>
          <div className="card-body">
            <h5 className="card-title text-center">{props.foodItem.name}</h5>
            <div className="container w-100">
              <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })} 
              </select>

              {/* <select className="m-2 h-100 bg-success rounded" ref={priceRef} >
                {prizeOptions.map((data)=>{
                    return (<option key={data} value={data}>{data}</option>);
                })}
              </select>  */}

              <div className="d-inline ms-2 h-100 fs-5">
                ₹{finalPrice}/-
              </div>
              <hr />
                <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
            </div>
            
          </div>
        </div>
    </div>
  );
}
