import React from 'react'
import Nav from './Nav';
import HomeSection from './homesection';
import HomeBody from './homebody';
import HomeAbout from './homeabout';
import Footer from './footer';


function HomePage() {
    return (
        <div>
            <Nav />
            <HomeSection />
            <HomeBody />
            <HomeAbout />
            <Footer />
        </div>
    )
}

export default HomePage
