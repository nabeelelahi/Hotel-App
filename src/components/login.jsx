import React from 'react'
import { Button, Grid, withStyles, makeStyles, Input } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik'
import * as yup from 'yup'
import { firebase, auth } from './firebaseconfig'
import Nav from './Nav'
import Footer from './footer'
import BG from "../assets/hotel2.jpg"

const useStyles = makeStyles({
    card: {
        backgroundColor: 'hsla(60, 52%, 84%, 0.38)',
        flexDirection: 'row',
        height: '400px',
        width: '30%',
        marginTop: '11.5%',
        marginBottom: '11.5%',
        marginLeft: '33%',
        marginRight: '33%',
        borderRadius: 10,
        padding: '2%',
        backdropFilter: 'blur(20px)'
    },
    input: {
        marginLeft: '33%',
        marginRight: '33%',
    }
})

const BootstrapButton = withStyles({
    root: {
        margin: "8%",
        marginLeft: '38%',
        marginRight: '38%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: "15px",
        padding: '2% 10%',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#1c1c15',
        borderColor: '#1c1c15',
        color: '#ebebc0',
        fontFamily: 'unset',
        '&:hover': {
            backgroundColor: 'transparent',
            borderColor: '#1c1c15',
            color: '#1c1c15',
            boxShadow: 'none',
        },
    },
})(Button);

const reviewSchema = yup.object({
    Email: yup.string()
        .required()
        .min(2)
        .test("Email", "Email must fullfill the requirement example abc@gmail.com", (val) => {
            return (
              new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/igm).test(val)
            )
          }),
    Password: yup.string()
        .required()
        .min(6),
})

function Login() {
    const classes = useStyles()
    const navigate = useNavigate()

    return (
        <>
            <Nav />
            <div style={{ backgroundImage: `url(${BG})`, width: '100%', backgroundRepeat: 'no-repeat', alignItems: 'center' }}>
                <div style={{ backgroundColor: 'hsla(0, 0%, 0%, 0.56)', width: '100%',}}>

                    <Grid container>
                        <Grid className={classes.maincard} item lg={12} sm={12} md={12} xs={12} >
                            <div className={classes.card}>
                                <Formik
                                    // validationSchema={reviewSchema}
                                    initialValues={{ Email: '', Password: '', }}
                                    onSubmit={(values, actions) => {
                                        const email = values.Email
                                        const password = values.Password
                                        firebase.auth().signInWithEmailAndPassword(email, password)
                                        .then(credentials => {
                                            firebase.database().ref(`Users/${credentials.user.uid}`).once("value",(user)=>{
                                                const currentUser = credentials.user.uid
                                                const usingUser = user.val()
                                                usingUser.id = currentUser
                                                console.log(usingUser)
                                                localStorage.setItem('User', JSON.stringify(usingUser))
                                                const userCheck = user.val().Type
                                                if(userCheck == 'Customer'){
                                                   navigate(`/`)
                                                }
                                                else if (userCheck == 'Hotel'){
                                                    navigate(`/hotelprofiles/${currentUser}`)
                                                }
                                            })
                                        })
                                        .catch(err => alert('Password or Email is incorrect!'))
                                     
                    
                                    }} >
                                    {(props) => {
                                        return (
                                            <>
                                                <h3 style={{ textAlign: 'center', marginTop: '10px' }}>Login</h3>
                                                <Grid container>
                                                    <Grid item lg={12} sm={12}>
                                                        <p style={{ color: '#1c1c15', margin: '3%', textAlign: 'center' }}>Email:</p>
                                                        <Input
                                                            className={classes.input}
                                                            placeholder="Email"
                                                            inputProps={{ 'aria-label': 'description' }}
                                                            value={props.values.Email}
                                                            onChange={props.handleChange("Email")}
                                                            onBlur={props.handleBlur("Email")} />
                                                            <p style={{color:'#8f0707',fontWeight:'bold',fontSize:12,textAlign:'center'}}>{props.touched.Email && props.errors.Email}</p>
                                                    </Grid>
                                                    <Grid item lg={12} sm={12}>
                                                        <p style={{ color: '#1c1c15', margin: '3%', textAlign: 'center' }}>Password:</p>
                                                        <Input
                                                            className={classes.input}
                                                            placeholder="Password"
                                                            type='Password'
                                                            inputProps={{ 'aria-label': 'description' }}
                                                            value={props.values.Password}
                                                            onChange={props.handleChange("Password")}
                                                            onBlur={props.handleBlur("Password")} />
                                                              <p style={{color:'#8f0707',fontWeight:'bold',fontSize:12,textAlign:'center'}}>{props.touched.Password && props.errors.Password}</p>
                                                    </Grid>
                                                    <Grid item lg={12} sm={12}>
                                                        <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin} onClick={props.handleSubmit}>
                                                            Login
                                                        </BootstrapButton>
                                                    </Grid>
                                                    <Grid item lg={12} sm={12}>
                                                       <div  style={{ color: '#1c1c15', textAlign: 'center', fontSize: '10px',}}>
                                                      Don't have an account?...
                                                        <Link style={{marginLeft:'5px', color:'#1c1c15',textDecoration: 'none' }} to='/signup'>Create One</Link>
                                                       </div>
                                                    </Grid>
                                                </Grid>
                                            </>
                                        )
                                    }}

                                </Formik>
                            </div>
                        </Grid>
                    </Grid>

                </div>
            </div >
            <Footer />
        </>
    )
}

export default Login
