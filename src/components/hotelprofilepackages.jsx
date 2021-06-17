import React, {useState, useEffect} from 'react'
import { Grid, Paper, Container, makeStyles, Button, withStyles } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Nav from './Nav'
import Footer from './footer'
import Slider from './corusal'
import Hotel1 from '../assets/hotel1.jpg'
import Hotel2 from '../assets/hotel2.jpg'
import Hotel3 from '../assets/hotel3.jpg'
import Hotel4 from '../assets/hotel4.jpg'
import Hotel5 from '../assets/hotel5.jpg'
import { firebase } from "./firebaseconfig";

const BootstrapButton = withStyles({
    root: {
        marginLeft: '40%',
        margin: "1px",
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: "11px",
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#1c1c15',
        borderColor: '#ebebc0',
        color: '#ebebc0',
        fontFamily: 'unset',
        '&:hover': {
            backgroundColor: '#ebebc0',
            borderColor: '#1c1c15',
            color: '#1c1c15',
            boxShadow: 'none',
        },
    },
})(Button);

const useStyles = makeStyles({
    paper: {
        backgroundColor: '#ebebc0',
        width: '95%',
        height: '300px',
    },
    paper2: {
        backgroundColor: '#ebebc0',
        width: '75%',
        height: '200px',
        margin: '10%'
    }
})



const popularHotels = [
    { photo: Hotel1, name: 'Single Special', price: "200" },
    { photo: Hotel2, name: 'Double Delure', price: "300" },
    { photo: Hotel3, name: 'Family Room', price: "500" },
    { photo: Hotel4, name: 'Double Luxury Room', price: "600" },
    { photo: Hotel5, name: 'Family Deluxe', price: "1000" },
]


function HotelProfilePackages({ id, hotelname }) {
    const classes = useStyles()
    const navigate = useNavigate()

    const [packages,setPackages] = useState([])

    const getPackages = ()=>{
        firebase
        .database()
        .ref(`Packages/${JSON.parse(localStorage.getItem("User")).id}`).on("value",(packages)=>{
            
            let tempPackages = []

            packages.forEach(hotelPackage=>{
                tempPackages.push(hotelPackage.val())
            })

            setPackages(tempPackages)
        })
    }
    
    useEffect(()=>{
        getPackages()
    },[])

    return (
        <>
        <div style={{ backgroundColor: '#c9c9a3', padding: '2%', marginTop: '-1%' }}>
            <h3 style={{ color: '#1c1c15', fontFamily: "unset", textAlign: 'center' }}> Your Packages</h3>
            <Container>
                <div style={{position: "sticky",top:'85%',marginLeft:'90%',zIndex:1}}>
                   <AddCircleIcon  onClick={() => navigate(`/${hotelname}/addpackage`)} style={{color:'#1c1c15',fontSize: '60px',}}/>
                </div>
                <Grid container spacing={2}>
                    {
                        packages?.map((hotel, index) => {
                            return (
                                <Grid key={index.toString()} item lg={4} md={4} sm={6} xs={12}>
                                    <Paper className={classes.paper}>
                                        <Slider urls={hotel.packageImages} height='200px' />
                                         <p style={{ colour: '#1c1c15', fontSize: '14px', fontFamily: 'unset', textAlign: 'center' }}>{hotel.name}</p>
                                        <p style={{ flexDirection: 'row', fontSize: '12px', color: '#575741', fontFamily: 'unset', textAlign: 'center' }}>
                                            $ {hotel.Charges} /day
                                        </p>
                                        <BootstrapButton
                                            variant="contained"
                                            color="primary"
                                            disableRipple
                                            className={classes.margin}
                                           onClick={() => navigate(`/hotelprofiles/:${JSON.parse(localStorage.getItem("User")).id}/packages/${hotel.packageId}`,  {state: {...hotel}})}
                                           >
                                            Details
                                        </BootstrapButton>
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
        </>
    )
}

export default HotelProfilePackages
