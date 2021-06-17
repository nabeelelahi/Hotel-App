import React from 'react'
import { useLocation } from 'react-router'
import Nav from './Nav'
import PackageTop from './packagetop'
import PackageDetails from './packagedetails'
import Footer from './footer'


function PackagePage() {
    const location = useLocation()
    const mypackage = location.state
    console.log(mypackage)
    return (
        <div>
            <Nav />
            <PackageTop mypackage={mypackage} />
            <PackageDetails />
            <Footer />
        </div>
    )
}

export default PackagePage
