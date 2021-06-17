import React from 'react'
import { useParams } from 'react-router'
import Nav from './Nav'
import HotelProfileAbout from './hotelprofileabout'
import Footer from './footer'
import HotelProfilePackages from './hotelprofilepackages'

function Hotelhome() {
    const { hotelname } = useParams()

    return (
        <div>
            <Nav />
            <HotelProfileAbout />
            <HotelProfilePackages hotelname={hotelname} />
            <Footer />
        </div>
    )
}

export default Hotelhome
