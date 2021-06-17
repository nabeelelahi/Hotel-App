import React from "react";
import {
  Grid,
  makeStyles,
  Input,
  Button,
  withStyles,
  Container,
} from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { firebase, auth } from "./firebaseconfig";
import Nav from "./Nav";
import Footer from "./footer";

const useStyles = makeStyles({
  about: {
    backgroundColor: "#c9c9a3",
    color: "#1c1c15",
    fontFamily: "unset",
    padding: "3%",
  },
  signup: {
    backgroundColor: "#ebebc0",
    color: "#1c1c15",
    fontFamily: "unset",
    padding: "3%",
  },
  fullinput: {
    width: "90%",
    marginLeft: "2.5%",
    marginRight: "2.5%",
  },
  input: {
    width: "86%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  formControl: {
    width: "86%",
    minWidth: 120,
    marginLeft: "5%",
    marginRight: "5%",
  },
});

const BootstrapButton = withStyles({
  root: {
    marginTop: "8%",
    marginBottom: "8%",
    marginLeft: "39%",
    boxShadow: "none",
    textTransform: "none",
    fontSize: "15px",
    padding: "6px 40px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#1c1c15",
    borderColor: "#1c1c15",
    color: "#ebebc0",
    fontFamily: "unset",
    "&:hover": {
      backgroundColor: "transparent",
      borderColor: "#1c1c15",
      color: "#1c1c15",
      boxShadow: "none",
    },
  },
})(Button);

const reviewSchema = yup.object({
  locations: yup.string().required(), 
});

function GetHotelDetails() {
  const classes = useStyles();
  const navigate = useNavigate();
  const {state} = useLocation()
  const [hotelProfileImage, setHotelProfileImage] = React.useState(null);

  const onUploadSubmission = (hotelImage, values, actions,) => {
    auth
      .createUserWithEmailAndPassword(values.Email, values.Password)
      .then((credentials) => {
        
        const users = firebase.database().ref(`Users/${credentials.user.uid}`);
        const uid = credentials.user.uid

        users.set(values);

        const promises = [];

        const uploadTask = firebase
          .storage()
          .ref()
          .child(`Hotel/${uid}/ProfileImage/${hotelImage.name}`)
          .put(hotelImage);
        promises.push(uploadTask);
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            const progress =
              snapshot.bytesTransferred / (snapshot.totalBytes * 100);
            if (snapshot.state === firebase.storage.TaskState.RUNNING) {
              console.log(`Progress: ${progress}%`);
            }
          },
          (error) => console.log(error.code),
          async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            // do something with the url
            if (downloadURL) {
              firebase.database().ref(`Users/${uid}`).update({
                profileImage: downloadURL,
              });
            }
          }
        );
    
        Promise.all(promises)
          .then(() => {
            actions.resetForm();
            alert("All files uploaded");
          })
          .catch((err) => console.log(err.code));

        
          localStorage.setItem("Users", JSON.stringify(values));
          
         // navigate(`/hotelprofiles/:${users.key}`);
      });

  
  };

  return (
    <>
      <Nav />
      <Grid container>
        <Grid className={classes.about} item lg={5} sm={12} md={6}>
          <h1
            style={{ textAlign: "left", marginTop: "15%", marginLeft: "4.5%" }}
          >
            Sign Up to Hotel App
          </h1>
          <p style={{ textAlign: "left", marginTop: "3%", marginLeft: "5%" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </Grid>
        <Grid className={classes.signup} item lg={7} sm={12} md={6}>
          <Formik
            validationSchema={reviewSchema}
            initialValues={{
             locations:""
            }}
            onSubmit={(values, actions) => {
                // use state here 
                values = {
                    ...values,
                    ...state
                }
                console.log(values)
              onUploadSubmission(hotelProfileImage, values, actions);
            }}
          >
            {(props) => {
              return (
                <>
                  <Container>
                    <Grid container>
                      <Grid item lg={12} md={12} sm={12}>
                        <p style={{ color: "#1c1c15", marginLeft: "2.5%" }}>
                          Profile Picture:
                        </p>
                        <input
                          className={classes.input}
                          onChange={(e) => {
                            setHotelProfileImage(e.target.files[0]);
                          }}
                          type="file"
                          accept="image/*"
                        />
                        <p
                          style={{
                            color: "#8f0707",
                            fontWeight: "bold",
                            fontSize: 12,
                            textAlign: "center",
                          }}
                        >
                          {props.touched.Name && props.errors.Name}
                        </p>
                      </Grid>
                      <Grid item lg={12} md={12} sm={12}>
                        <p style={{ color: "#1c1c15", marginLeft: "2.5%" }}>
                          locations:
                        </p>
                        <Input
                          className={classes.fullinput}
                          placeholder="Pick a locations for your hotel"
                          inputProps={{ "aria-label": "description" }}
                          value={props.values.locations}
                          onChange={props.handleChange("locations")}
                          onBlur={props.handleBlur("locations")}
                        />
                        <p
                          style={{
                            color: "#8f0707",
                            fontWeight: "bold",
                            fontSize: 12,
                            textAlign: "center",
                          }}
                        >
                          {props.touched.locations && props.errors.locations}
                        </p>
                      </Grid>
                      <Grid item lg={12} sm={12}>
                        <BootstrapButton
                          onClick={props.handleSubmit}
                          variant="contained"
                          color="primary"
                          disableRipple
                          className={classes.margin}
                        >
                          Done
                        </BootstrapButton>
                      </Grid>
                    </Grid>
                  </Container>
                </>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default GetHotelDetails;
