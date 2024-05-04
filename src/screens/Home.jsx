import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {
  const [Search, setSearch] = useState('');
  const [foodCategory, setFoodCatogory] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const loadData = async ()=> {
    let response = await fetch("http://localhost:8000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();
    setfoodItem(response[0]);
    setFoodCatogory(response[1]);
    // console.log(response[0], response[1]);

  }

  useEffect(()=>{
    loadData()
  }, [])


  return (
    <>
      <div> <Navbar/> </div>
      <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{objectFit: "contain !important"}}
      >
        <div className="carousel-inner" id="carousal">
          <div className="carousel-caption" style={{zIndex: "10"}}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="Search"
                placeholder="Search"
                aria-label="Search"
                value={Search}
                onChange={(e)=>{setSearch(e.target.value)}}
              />
              {/* <button className="btn btn-outline-success text-white bg-success" type="submit">
                Search
              </button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/300x300/?burger"
              className="d-block w-100"
              style={{ filter: "brightness(40%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/300x300/?pastry"
              className="d-block w-100"
              style={{ filter: "brightness(40%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/300x300/?barbeque"
              className="d-block w-100"
              style={{ filter: "brightness(40%)" }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      <div className='container'> 
        {
          foodCategory != []
          ? foodCategory.map((data) => {
            return (
              <div className='row mb-3'>
                <div key={data._id} className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                {foodItem != []? 
                foodItem.filter((item)=> (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(Search.toLowerCase())))
                .map(filterItems => {
                  return (
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                      <Card foodItem = {filterItems}
                      // options = {filterItems.options[0]}
                      price = {filterItems.price}
                      
                      ></Card>
                    </div>
                  )
                })
                : <div>No such data found</div>}
            </div>
            )
          })
          : ""
        }
      </div>
      <div> <Footer/> </div>
    </>
  )
}


