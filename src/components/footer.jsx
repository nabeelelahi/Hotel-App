import { AppBar, makeStyles, Grid } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    nav: {
        backgroundColor: '#1c1c15',
        flexDirection: 'row',
    },
})

function Footer() {
    const classes = useStyles()

    return (
        <AppBar position="static" className={classes.nav}>
            <Grid container>
                <Grid item xs={12} lg={12} md={12}>
                    <p style={{ color: '#ebebc0',fontFamily: "unset",textAlign:'center',marginTop:'12px' }}>Created by Nabeel Elahi | 2021 All rights reserved.</p>
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default Footer
