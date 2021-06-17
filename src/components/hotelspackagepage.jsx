import React from 'react'
import { useLocation } from 'react-router'
import Nav from './Nav'
import HotelPackageTop from './hotelspackagetop'
import HotelPackageDetails from './hotelpackagedetails'
import Footer from './footer'


function HotelPackagePage() {
    const location = useLocation()
    const mypackage = location.state
    return (
        <div>
            <Nav />
            <HotelPackageTop mypackage={mypackage} />
            <HotelPackageDetails mypackage={mypackage} />
            <Footer />
        </div>
    )
}

export default HotelPackagePage
