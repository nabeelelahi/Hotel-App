import React from 'react'
import { Grid, Paper, Container, makeStyles, Button, withStyles } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import Hotel1 from '../assets/hotel1.jpg'
import Hotel2 from '../assets/hotel2.jpg'
import Hotel3 from '../assets/hotel3.jpg'
import Hotel4 from '../assets/hotel4.jpg'
import Hotel5 from '../assets/hotel5.jpg'
import Hotel6 from '../assets/hotel6.jpg'

const BootstrapButton = withStyles({
    root: {
        marginLeft:'40%',
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
    }
})



const popularHotels = [
    { photo: Hotel1, name: 'Single Special', price: "200" },
    { photo: Hotel2, name: 'Double Delure', price: "300" },
    { photo: Hotel3, name: 'Family Room', price: "500" },
    { photo: Hotel4, name: 'Double Luxury Room', price: "600" },
    { photo: Hotel5, name: 'Family Deluxe', price: "1000" },
    { photo: Hotel6, name: 'Single Person', price: "100" },
]


function HotelPackages({ id }) {
    const classes = useStyles()
    const navigate = useNavigate()

    return (
        <div style={{ backgroundColor: '#c9c9a3', padding: '2%', marginTop: '-1%' }}>
            <h3 style={{ color: '#1c1c15', fontFamily: "unset",textAlign:'center' }}>Packages</h3>
            <Container>
                <Grid container spacing={2}>
                    {
                        popularHotels.map((hotel , index) => {
                            return (
                                <Grid key={index.toString()} item lg={4} md={4} sm={6} xs={12}>
                                    <Paper className={classes.paper}>
                                        <img src={hotel.photo} style={{ width: '100%', height: '60%' }} alt="" />
                                        <p style={{ colour: '#1c1c15', fontSize: '14px', fontFamily: 'unset',textAlign:'center' }}>{hotel.name}</p>
                                        <p style={{ flexDirection: 'row', fontSize: '12px', color: '#575741', fontFamily: 'unset',textAlign:'center' }}>
                                            $ {hotel.price} /day
                                        </p>
                                        <BootstrapButton 
                                        variant="contained" 
                                        color="primary" 
                                        disableRipple 
                                        className={classes.margin}
                                        onClick={() => navigate(`/hotels/${id}/packages/${index}`, {state: {...hotel}})}>
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
    )
}

export default HotelPackages
