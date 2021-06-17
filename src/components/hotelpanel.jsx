import React from "react";
import {
  Grid,
  makeStyles,
  Input,
  Button,
  withStyles,
  Container,
  FormControl,
  Select,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import Nav from "./Nav";
import Footer from "./footer";
import { firebase } from "./firebaseconfig";

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
    width: "96%",
  },
  input: {
    width: "93%",
  },
  formControl: {
    width: "90%",
    minWidth: 120,
    marginLeft: "0%",
    margin: "-2.5%",
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
  Packagename: yup.string().required().min(2),
  Charges: yup.string().required().min(2),
  Persons: yup.string().required(),
  Beds: yup.string().required(),
  Rooms: yup.string().required(),
  Discription: yup.string().required().min(30),
});

function AdminPanel() {
  const classes = useStyles();

  const [openPerson, setOpenPerson] = React.useState(false);
  const [openRooms, setOpenRooms] = React.useState(false);
  const [openBeds, setOpenBeds] = React.useState(false);
  const [packageImages, setPackageImages] = React.useState(null);

  const personsClose = () => {
    setOpenPerson(false);
  };

  const personsOpen = () => {
    setOpenPerson(true);
  };
  const roomsClose = () => {
    setOpenRooms(false);
  };

  const roomsOpen = () => {
    setOpenRooms(true);
  };
  const bedsClose = () => {
    setOpenBeds(false);
  };

  const bedsOpen = () => {
    setOpenBeds(true);
  };

  const onUploadSubmission = (packageImages, values, actions) => {
    const uid = JSON.parse(localStorage.getItem("User")).id;

    firebase
      .database()
      .ref(`Packages/${uid}`)
      .push({ ...values })
      .then((newPackage) => {
        newPackage.ref
          .update({
            packageId: newPackage.key,
          })
          .then(() => {
            const promises = [];
            
let tempPackageUrls = []

            packageImages.forEach((file) => {
              const uploadTask = firebase
                .storage()
                .ref()
                .child(`Hotel/${uid}/PackageImages/${file.name}`)
                .put(file);
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
                  const downloadURL =
                    await uploadTask.snapshot.ref.getDownloadURL();
                  // do something with the url
                  if (downloadURL) {
                    firebase
                    .database()
                    .ref(`Packages/${uid}/${newPackage.key}/packageImages`)
                    .push(downloadURL);
                  }
                }
              );
            });
            Promise.all(promises)
              .then(() => {
                actions.resetForm();
                alert("All files uploaded");
               })
              .catch((err) => console.log(err.code));
          });
      });
  };

  return (
    <>
      <Nav />
      <Grid container>
        <Grid className={classes.about} item lg={4} sm={12} md={6}>
          <h1
            style={{ textAlign: "left", marginTop: "15%", marginLeft: "4.5%" }}
          >
            Create a new package
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
        <Grid className={classes.signup} item lg={8} sm={12} md={6}>
          <h2
            style={{
              color: "#1c1c15",
              fontFamily: "unset",
              textAlign: "center",
            }}
          >
            Create Package
          </h2>
          <Formik
            validationSchema={reviewSchema}
            initialValues={{
              packageImages: null,
              Packagename: "",
              Charges: "",
              Persons: "",
              Rooms: "",
              Beds: "",
              Discription: "",
            }}
            onSubmit={(values, actions) => {
              onUploadSubmission(packageImages, values, actions);
            }}
          >
            {(props) => {
              return (
                <>
                  <Container>
                    <Grid container>
                      <Grid item lg={4} md={4} sm={4} xs={12}>
                        <p style={{ color: "#1c1c15" }}>Package Image:</p>
                        <input
                          className={classes.input}
                          onChange={(e) => {
                            if (e.target.files.length > 4) {
                              alert(
                                "Plaese select maximum of 4 images. thankyou"
                              );
                            } else {
                              setPackageImages(Array.from(e.target.files));
                            }
                          }}
                          type="file"
                          multiple={true}
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
                          {props.touched.Packagename &&
                            props.errors.Packagename}
                        </p>
                      </Grid>

                      <Grid item lg={4} md={4} sm={4} xs={12}>
                        <p style={{ color: "#1c1c15" }}>Package Name:</p>
                        <Input
                          className={classes.input}
                          placeholder="Pick a name for your package"
                          inputProps={{ "aria-label": "description" }}
                          value={props.values.Packagename}
                          onChange={props.handleChange("Packagename")}
                          onBlur={props.handleBlur("Packagename")}
                        />
                        <p
                          style={{
                            color: "#8f0707",
                            fontWeight: "bold",
                            fontSize: 12,
                            textAlign: "center",
                          }}
                        >
                          {props.touched.Packagename &&
                            props.errors.Packagename}
                        </p>
                      </Grid>
                      <Grid item lg={4} md={4} sm={4} xs={12}>
                        <p style={{ color: "#1c1c15" }}>Charges:</p>
                        <Input
                          className={classes.input}
                          placeholder="Enter charges as per days"
                          inputProps={{ "aria-label": "description" }}
                          value={props.values.Charges}
                          onChange={props.handleChange("Charges")}
                          onBlur={props.handleBlur("Charges")}
                        />
                        <p
                          style={{
                            color: "#8f0707",
                            fontWeight: "bold",
                            fontSize: 12,
                            textAlign: "center",
                          }}
                        >
                          {props.touched.Charges && props.errors.Charges}
                        </p>
                      </Grid>
                      <Grid item lg={4} md={4} sm={4} xs={12}>
                        <p style={{ color: "#1c1c15" }}>No of Persons:</p>
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={openPerson}
                            onClose={personsClose}
                            onOpen={personsOpen}
                            value={props.values.Persons}
                            onChange={props.handleChange("Persons")}
                            onBlur={props.handleBlur("Persons")}
                          >
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                            <MenuItem value="6">6</MenuItem>
                            <MenuItem value="7">7</MenuItem>
                            <MenuItem value="8">8</MenuItem>
                            <MenuItem value="9">9</MenuItem>
                            <MenuItem value="10">10</MenuItem>
                          </Select>
                        </FormControl>
                        <p
                          style={{
                            color: "#8f0707",
                            fontWeight: "bold",
                            fontSize: 12,
                            textAlign: "center",
                          }}
                        >
                          {props.touched.Persons && props.errors.Persons}
                        </p>
                      </Grid>
                      <Grid item lg={4} md={4} sm={4} xs={12}>
                        <p style={{ color: "#1c1c15" }}>No of Rooms:</p>
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={openRooms}
                            onClose={roomsClose}
                            onOpen={roomsOpen}
                            value={props.values.Rooms}
                            onChange={props.handleChange("Rooms")}
                            onBlur={props.handleBlur("Rooms")}
                          >
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                            <MenuItem value="6">6</MenuItem>
                            <MenuItem value="7">7</MenuItem>
                            <MenuItem value="8">8</MenuItem>
                            <MenuItem value="9">9</MenuItem>
                            <MenuItem value="10">10</MenuItem>
                          </Select>
                        </FormControl>
                        <p
                          style={{
                            color: "#8f0707",
                            fontWeight: "bold",
                            fontSize: 12,
                            textAlign: "center",
                          }}
                        >
                          {props.touched.Rooms && props.errors.Rooms}
                        </p>
                      </Grid>
                      <Grid item lg={4} md={4} sm={4} xs={12}>
                        <p style={{ color: "#1c1c15" }}>No of Beds:</p>
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={openBeds}
                            onClose={bedsClose}
                            onOpen={bedsOpen}
                            value={props.values.Beds}
                            onChange={props.handleChange("Beds")}
                            onBlur={props.handleBlur("Beds")}
                          >
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                            <MenuItem value="6">6</MenuItem>
                            <MenuItem value="7">7</MenuItem>
                            <MenuItem value="8">8</MenuItem>
                            <MenuItem value="9">9</MenuItem>
                            <MenuItem value="10">10</MenuItem>
                          </Select>
                        </FormControl>
                        <p
                          style={{
                            color: "#8f0707",
                            fontWeight: "bold",
                            fontSize: 12,
                            textAlign: "center",
                          }}
                        >
                          {props.touched.Beds && props.errors.Beds}
                        </p>
                      </Grid>

                      <Grid item lg={12} sm={12} xs={12}>
                        <p style={{ color: "#1c1c15" }}>Hotel Discription:</p>
                        <TextField
                          className={classes.fullinput}
                          id="filled-multiline-static"
                          label="Explain what you are offering..."
                          multiline
                          rows={4}
                          placeholder="Discription"
                          variant="filled"
                          value={props.values.Discription}
                          onChange={props.handleChange("Discription")}
                          onBlur={props.handleBlur("Discription")}
                        />
                        <p
                          style={{
                            color: "#8f0707",
                            fontWeight: "bold",
                            fontSize: 12,
                            textAlign: "center",
                          }}
                        >
                          {props.touched.Discription &&
                            props.errors.Discription}
                        </p>
                      </Grid>
                      <Grid item lg={12} sm={12} xs={12}>
                        <BootstrapButton
                          onClick={props.handleSubmit}
                          variant="contained"
                          color="primary"
                          disableRipple
                          className={classes.margin}
                        >
                          Create
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

export default AdminPanel;
