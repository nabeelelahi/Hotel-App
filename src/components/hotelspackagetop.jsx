import { Grid, makeStyles, withStyles, Button } from '@material-ui/core'
import React from 'react'
import Slider from './corusal'

const useStyles = makeStyles({
    about: {
        backgroundColor: '#ebebc0',
        color: '#1c1c15',
        fontFamily: 'unset',
        height: '483.5px',
        marginBottom: '-5px'
    },
})

const BootstrapButton = withStyles({
    root: {
        margin: "5px",
        marginLeft: "5%",
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: "15px",
        padding: '10px 35px',
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

function HotelPackageTop({ mypackage }) {
    const classes = useStyles()
   const photo = mypackage.packageImages

    return (
        <div>
            <Grid container>
                <Grid item lg={6} sm={12} md={6}>
                    <Slider urls={photo} height='400px' />
                </Grid>
                <Grid className={classes.about} item lg={6} sm={12} md={6}>
                   <h1 style={{ textAlign: 'left', marginTop: '10%', marginLeft: '4.5%' }}>{mypackage.Packagename}</h1> 
                    <p style={{ marginLeft: '5%', textAlign: 'left', flexDirection: 'row', fontSize: '20px', color:'#575741' , fontFamily: 'unset', marginTop: '7px' }}>
                        $ {mypackage.Charges} 
                    </p>
                    <p style={{ textAlign: 'left', marginTop: '3%', marginLeft: '5%',}}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin}>
                        Book Now
                    </BootstrapButton>
                </Grid>
            </Grid>
        </div>
    )
}

export default HotelPackageTop
