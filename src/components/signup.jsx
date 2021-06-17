import React from 'react'
import { Grid, makeStyles, Input, Button, withStyles, Container, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik'
import * as yup from 'yup'
import { firebase, auth } from './firebaseconfig'
import Nav from './Nav'
import Footer from './footer'

const useStyles = makeStyles({
    about: {
        backgroundColor: '#c9c9a3',
        color: '#1c1c15',
        fontFamily: 'unset',
        padding: '3%'
    },
    signup: {
        backgroundColor: '#ebebc0',
        color: '#1c1c15',
        fontFamily: 'unset',
        padding: '3%'
    },
    fullinput: {
        width: '90%',
        marginLeft: '2.5%',
        marginRight: '2.5%',
    },
    input: {
        width: '86%',
        marginLeft: '5%',
        marginRight: '5%'
    },
    formControl: {
        width: "86%",
        minWidth: 120,
        marginLeft: '5%',
        marginRight: '5%'
    },
})

const BootstrapButton = withStyles({
    root: {
        marginTop: "8%",
        marginBottom: "8%",
        marginLeft: '39%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: "15px",
        padding: '6px 40px',
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
    Name: yup.string()
        .required()
        .min(3)
    ,
    Email: yup.string()
    .required()
    .test("Email", "Email must fullfill the requirement example abc@gmail.com", (val) => {
      return (
        new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/igm).test(val)
      )
    }),
  Phone: yup.string()
    .required()
    .test("Phone Number", "Phone Number must fullfill the requirement example +92-345-2323322", (val) => {
      return (
        new RegExp(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}/igm).test(val)
      )
    }),
    Password: yup.string()
        .required()
        .min(6),
    Type: yup.string()
        .required()
})

function Signup() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Nav />
            <Grid container>
                <Grid className={classes.about} item lg={5} sm={12} md={6}>
                    <h1 style={{ textAlign: 'left', marginTop: '15%', marginLeft: '4.5%' }}>Sign Up to Hotel App</h1>
                    <p style={{ textAlign: 'left', marginTop: '3%', marginLeft: '5%' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </Grid>
                <Grid className={classes.signup} item lg={7} sm={12} md={6}>
                    <Formik
                        validationSchema={reviewSchema}
                        initialValues={{Name: '', Email: '', Phone: '', Password: '', Type: '', }}
                        onSubmit={(values, actions) => {
                            const email = values.Email
                            const password = values.Password
                            if(values.Type == 'Hotel'){
                                navigate(`/signup/hoteldetails`,  {state: {...values}})
                            }
                            else if(values.Type == 'Customer')
                            auth.createUserWithEmailAndPassword(email, password)
                            .then(credentials => {                 
                                const users = firebase.database().ref(`Users/${credentials.user.uid}`)
                                values.id = users.key
                                users.set(values)
                                console.log(values)
                                localStorage.setItem('Users',JSON.stringify(values))
                                actions.resetForm()
                                    navigate('/')
                                
                            })
                        }} >
                        {(props) => {
                            return (
                                <>
                                    <Container>
                                        <Grid container>
                                            <Grid item lg={12} md={12} sm={12}>
                                                <p style={{ color: '#1c1c15',marginLeft: '2.5%' }}>Name:</p>
                                                <Input
                                                    className={classes.fullinput}
                                                    placeholder="Enter your Name..."
                                                    inputProps={{ 'aria-label': 'description' }}
                                                    value={props.values.Name}
                                                    onChange={props.handleChange("Name")}
                                                    onBlur={props.handleBlur("Name")} />
                                                      <p style={{color:'#8f0707',fontWeight:'bold',fontSize:12,textAlign:'center'}}>{props.touched.Name && props.errors.Name}</p>
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12}>
                                                <p style={{ color: '#1c1c15', marginLeft: '2.5%' }}>Email:</p>
                                                <Input
                                                    className={classes.fullinput}
                                                    placeholder="Email"
                                                    inputProps={{ 'aria-label': 'description' }}
                                                    value={props.values.Email}
                                                    onChange={props.handleChange("Email")}
                                                    onBlur={props.handleBlur("Email")} />
                                                     <p style={{color:'#8f0707',fontWeight:'bold',fontSize:12,textAlign:'center'}}>{props.touched.Email && props.errors.Email}</p>
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12}>
                                                <p style={{ color: '#1c1c15', marginLeft: '2.5%' }}>Phone Number:</p>
                                                <Input
                                                    className={classes.fullinput}
                                                    placeholder="Password"
                                                    inputProps={{ 'aria-label': 'description' }}
                                                    value={props.values.Phone}
                                                    onChange={props.handleChange("Phone")}
                                                    onBlur={props.handleBlur("Phone")} />
                                                     <p style={{color:'#8f0707',fontWeight:'bold',fontSize:12,textAlign:'center'}}>{props.touched.Phone && props.errors.Phone}</p>
                                            </Grid>
                                            <Grid item lg={6} md={6} sm={12}>
                                                <p style={{ color: '#1c1c15',marginLeft: '5%' }}>Password:</p>
                                                <Input
                                                    className={classes.input}
                                                    placeholder="Password"
                                                    inputProps={{ 'aria-label': 'description' }}
                                                    value={props.values.Password}
                                                    onChange={props.handleChange("Password")}
                                                    onBlur={props.handleBlur("Password")} />
                                                     <p style={{color:'#8f0707',fontWeight:'bold',fontSize:12,textAlign:'center'}}>{props.touched.Password && props.errors.Password}</p>
                                            </Grid>
                                            <Grid item lg={6} md={6} sm={12}>
                                                <p style={{ color: '#1c1c15', marginLeft: '5%' }}>Sign up as</p>
                                                <FormControl className={classes.formControl}>
                                                    <Select
                                                        labelId="demo-controlled-open-select-label"
                                                        id="demo-controlled-open-select"
                                                        open={open}
                                                        onClose={handleClose}
                                                        onOpen={handleOpen}
                                                        value={props.values.Type}
                                                        onChange={props.handleChange("Type")}
                                                        onBlur={props.handleBlur("Type")}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value='Customer'>Customer</MenuItem>
                                                        <MenuItem value='Hotel'>Hotel</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item lg={12} sm={12}>
                                                <BootstrapButton onClick={props.handleSubmit} variant="contained" color="primary" disableRipple className={classes.margin}>
                                                    Sign Up
                                                </BootstrapButton>
                                            </Grid>
                                            <Grid item lg={12} sm={12}>
                                                <div style={{ color: '#1c1c15', textAlign: 'center', fontSize: '10px', }}>
                                                    Already have an account?...
                                                    <Link style={{ marginLeft: '5px', color: '#1c1c15', textDecoration: 'none' }} to='/login'>Sign in</Link>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Container>
                                </>
                            )
                        }}

                    </Formik>
                </Grid>
            </Grid>
            <Footer />
        </>
    )
}

export default Signup

