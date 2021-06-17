import React, { useContext } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Nav from './Nav'
import HotelAbout from './hotelabout'
import HotelPackages from './hotelpackages'
import Footer from './footer'
import { HotelContext } from './homebody'

function HotelPage(props) {
    const { index } = useParams()
    const location = useLocation()
    const hotel = location.state
    return (
        <div>
            <Nav />
            <HotelAbout hotel={hotel} />
            <HotelPackages id={index} />
            <Footer />
        </div>
    )
}

export default HotelPage
