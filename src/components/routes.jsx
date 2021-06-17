import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from './homepage';
import Login from './login';
import HotelPage from './hotelpage';
import PackagePage from './packagepage';
import Signup from './signup';
import GetHotelDetails from './gethoteldetails'
import HotelHome from './hotelprofile';
import HotelPackagePage from './hotelspackagepage';
import AdminPanel from './hotelpanel';

  function MyRoutes() {
      return (
          <Router>
            <Routes>
            <Route exact path="/" element={ <HomePage /> }>
           </Route>
            <Route exact path="/hotelprofiles/:id" element={ <HotelHome /> }>
           </Route>
            <Route path="/:hotelname/addpackage" element={ <AdminPanel /> }>
           </Route>
           <Route path="/hotelprofiles/:id/packages/:id" element={ <HotelPackagePage /> }>
           </Route>
            <Route path="/login">
            <Login />
           </Route>
            <Route exact path="/hotels/:index">
            <HotelPage />
           </Route>
            <Route exact path="/signup">
            <Signup />
           </Route>
            <Route path="/signup/hoteldetails">
            <GetHotelDetails />
           </Route>
            <Route path="/hotels/:index/packages/:id">
             <PackagePage />
           </Route>
           </Routes>
          </Router>
              
      )
  }
  
  export default MyRoutes
  