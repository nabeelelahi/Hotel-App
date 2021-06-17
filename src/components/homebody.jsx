import {React, useState, useEffect} from 'react'
import { Grid, Paper, Container, makeStyles, Button, withStyles } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import Hotel1 from '../assets/hotel1.jpg'
import Hotel2 from '../assets/hotel2.jpg'
import Hotel3 from '../assets/hotel3.jpg'
import Hotel4 from '../assets/hotel4.jpg'
import Hotel5 from '../assets/hotel5.jpg'
import Hotel6 from '../assets/hotel6.jpg'
import Location from '../assets/location.png'
import {firebase} from './firebaseconfig'



const BootstrapButton = withStyles({
    root: {
        marginLeft: '40%',
        margin: "1px",
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: "13px",
        padding: '8px 16px',
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
    { photo: Hotel1, name: 'Burj Hotel', location: "Dubai" },
    { photo: Hotel2, name: 'Regent Hotel', location: "Karachi" },
    { photo: Hotel3, name: 'IDK Hotel', location: "Tokyo" },
    { photo: Hotel4, name: 'Luxury Hotel', location: "Jeddah" },
    { photo: Hotel5, name: 'XOXO Hotel', location: "Singapore" },
    { photo: Hotel6, name: 'Whatever Hotel', location: "Las Vegas" },
]

function HomeBody() {
    const navigate = useNavigate()
    const classes = useStyles()
    const [hotels, setHotels] = useState([])

    
    const getHotels = ()=>{
        firebase.database().ref(`Users`).on("value",(allUsers)=>{
            let tempHotels = []
            allUsers.forEach(user=>{
                 if(user.val().Type === "Hotel"){
                     tempHotels.push(user.val())
                 }
            })
            setHotels(tempHotels)
        })
    }
    
    useEffect(()=>{
        getHotels()
    },[])
    
    return (
        <div style={{ backgroundColor: '#c9c9a3', padding: '2%', marginTop: '-1%' }}>
            <h3 style={{ color: '#1c1c15', fontFamily: "unset",textAlign:'center' }}>Popular Hotels</h3>
            <Container>
                <Grid container spacing={3}>
                    {
                        hotels?.map((hotel, index) => {
                            console.log(hotel)
                            return (                               
                                <Grid key={index.toString()} item lg={4} md={4} sm={6} xs={12}>
                                    <Paper  className={classes.paper}>
                                        <img src={hotel.profileImage} style={{ width: '100%', height: '60%' }} alt="" />
                                        <p style={{ colour: '#1c1c15', fontSize: '15px', fontFamily: 'unset',textAlign:'center' }}>{hotel.Name}</p>
                                        <div style={{ flexDirection: 'row', fontSize: '14px', color: '#575741', fontFamily: 'unset',textAlign:'center'}}>
                                          <img style={{height:'13px',width:'14px'}} src={Location} alt="" />
                                            {hotel.locations}
                                        </div>
                                        <BootstrapButton 
                                        variant="contained" 
                                        color="primary" 
                                        disableRipple 
                                        className={classes.margin}
                                        onClick={() => navigate(`/hotels/${index}`, {state: {...hotel}})}>
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

export default HomeBody
