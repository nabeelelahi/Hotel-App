import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import Hotel2 from '../assets/hotel2.jpg'
import Location from '../assets/location.png'

const useStyles = makeStyles({
    about: {
        backgroundColor: '#ebebc0',
        color: '#1c1c15',
        fontFamily: 'unset',
    },
})

function HotelAbout({ hotel }) {
    const classes = useStyles()

    return (
        <div>
            <Grid container>
                <Grid item lg={6} sm={12} md={6}>
                    <img src={hotel.photo} alt="" style={{width:'100%',height:'500px'}} /> 
                </Grid>
                <Grid className={classes.about} item lg={6} sm={12} md={6}>
                       <h1 style={{textAlign:'left',marginTop:'20%',marginLeft:'4.5%'}}>{hotel.name}</h1>
                       <div style={{marginLeft:'5%',textAlign:'left', flexDirection: 'row', fontSize: '20px', color: '#1c1c15', fontFamily: 'unset',margin: '10px' }}>
                       <img style={{height:'17px',width:'19px'}} src={Location} alt="" />
                                           {hotel.location}
                                        </div>
                       <p style={{textAlign:'left',marginTop:'3%',marginLeft:'5%'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </Grid>
            </Grid>
        </div>
    )
}

export default HotelAbout
