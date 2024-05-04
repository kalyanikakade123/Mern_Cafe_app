import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function AdminNavbar() {

    const navigate = useNavigate();
    const handleLogout = ()=> {
    localStorage.removeItem("authToken");
    navigate('/login');
    }

    const onClick = () => {
      navigate('/userorders');
    }

    const myStyles = {
      display: location.pathname === '/userorders' ? 'none' : 'inline-block', 
    };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success position-static"
        style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10",padding: "0 !important", width: "100%" }}>
          <div className="container-fluid">
            <Link className="navbar-brand fs-1 fst-italic fw-bold" to="/admin">
              F3 CAFE
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2">
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/admin">
                    Home
                  </Link>
                </li>
                {(localStorage.getItem('authToken')) ?
                  <li className="nav-item"> 
                    <Link className="nav-link active fs-5" aria-current="page" to="/userorders" onClick={onClick} style={myStyles}>User Orders</Link>
                  </li>
                  : ""
                }
              </ul>
              {!(localStorage.getItem('authToken'))?
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
              </div>
              : 
              <div>
                <div className="btn bg-danger text-white mx-1" onClick={handleLogout} >
                  Logout
                </div>
              </div>
              }
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
