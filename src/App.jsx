import React from 'react';
// import './App.css'
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
// import '../node_modules/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screens/Signup.jsx';
import { CartProvider } from './components/ContextReducer.jsx';
import MyOrder from './screens/MyOrder.jsx';
import AdminHome from './screens/AdminHome.jsx';
import Subscription from './screens/Subscription.jsx';
import AdminUserOrders from './screens/AdminUserOrders.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <div> 
          <Routes>
            <Route exact path = "/" element= {<Home/>}/>
            <Route exact path = "/login" element= {<Login/>}/>
            <Route exact path = "/createuser" element= {<Signup/>}/>
            <Route exact path = "/myOrder" element= {<MyOrder/>}/>
            <Route exact path = "/admin" element= {<AdminHome/>}/>
            <Route exact path = "/subscribe" element= {<Subscription/>}/>
            <Route exact path = "/userorders" element= {<AdminUserOrders/>}/>
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
