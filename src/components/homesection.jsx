import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import BG from "../assets/background.jpg"

const useStyles = makeStyles({
})

function HomeSection() {
    const classes = useStyles()

    return (
        <Grid container>
            <Grid item xs={12} lg={12}>
                <img style={{height:'700px',width:'100%',}} src={BG} alt="" />
            <div style={{ backgroundColor: 'hsla(0, 0%, 0%, 0.56)',position: 'absolute', top: '0%',left: '0%',width: '100%',height: '79.75%',}}>
            </div>
            </Grid>
            <div style={{position:'absolute',top:"40%",left:'3%',width: '70%',color:'#ebebc0',fontFamily: "unset"}}>
                <h1 >Book the hotel of your desire</h1>
                <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</h4>
                </div>
        </Grid>
    )
}

export default HomeSection
