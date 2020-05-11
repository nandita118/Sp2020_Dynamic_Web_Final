import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import axios from "axios";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
//Pages
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import SinglePost from "./pages/SinglePost";
import CreatePost from "./pages/CreatePost";
//Styling
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInformation, setUserInformation] = useState({});
  //const [storageRef,setStorageRef] = useState(null);

  //Config
  const firebaseConfig = {
    apiKey: "AIzaSyDFkPF84J_bPKYKlC-sA25QLg_Gk06udEs",
    authDomain: "final-project-sp2020-647fc.firebaseapp.com",
    databaseURL: "https://final-project-sp2020-647fc.firebaseio.com",
    projectId: "final-project-sp2020-647fc",
    storageBucket: "final-project-sp2020-647fc.appspot.com",
    messagingSenderId: "859214890117",
    appId: "1:859214890117:web:a8323b801f5e2c96fcd5ec"
  };
  
  //1. Ensure app is initialized when it is ready to be
  //2. Ensure app is not initialized more than once
  useEffect(()=> {
    //is firebase already initialized?
    if(!firebase.apps.length){
      //Initialize firebase
      firebase.initializeApp(firebaseConfig);
    }
    //Setting auth to be persistent in SESSION storage, not cookies
    //You can also use cookies with firebase but we're using session bc its easier to work with
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .catch(function(e) {
        console.log("INSTANTIATING AUTH ERROR", e);
      });

    //For image upload, access to firebase storage
    // const storageService = firebase.storage();
    // const storageRef = storageService.ref();
    // setStorageRef(storageRef);
  }, [firebaseConfig]);

  //Check to see if the User is loggen in 
  //User loads page, check their status
  //Set state accordingly

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user){
      if(user) {
        //Logged in
        setUserInformation(user);
        setLoggedIn(true);
      } else {
        //Not logged in
        setUserInformation({});
        setLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  //Login
  function LoginFunction(e) {
    e.preventDefault();
    let email = e.currentTarget.loginEmail.value;
    let password = e.currentTarget.loginPassword.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function(response) {
        console.log("LOGIN RESPONSE", response);
        setLoggedIn(true);
      })
      .catch(function(error) {
        console.log("LOGIN ERROR", error);
      });
  }

  //Logout
  function LogoutFunction() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setLoggedIn(false);
      })
      .catch(function(error) {
        console.log("LOGOUT ERROR", error);
      });
  }

  //Create Account
  function CreateAccountFunction(e) {
    e.preventDefault();
    console.log("form payload", e);
    //Default values for testing
    let email = e.currentTarget.createEmail.value;
    let password = e.currentTarget.createPassword.value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(response) {
        console.log('VALID ACCOUNT CREATED', response);
        setLoggedIn(true);
      })
      .catch(function(e) {
        console.log("CREATE ACCOUNT ERROR", e);
      });
  }

  // function CreatePostFunction(e) {
  //   e.preventDefault();
  //   //For image upload, access to firebase storage
  //   const storageRef = firebase.storage().ref(); 
  //   const fileReference = e.currentTarget.postImage.files[0];
  //   storageRef
  //     .child(`${fileReference.name}`)
  //     .put(fileReference);
    
  //   let text = e.currentTarget.postText.value;
  //   let idFromText = text.replace(/\s+/g, "-").toLowerCase().substr(0, 16);
  //   let userID = userInformation.uid;

  //   uploadTask.on(
  //     'state_changed', 
  //     (snapshot) => {}, 
  //     (error) => {
  //       console.log(error);
  //   },
  //   () => {
  //       // Do something once upload is complete
  //       uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
  //         axios
  //           .get(
  //               //My API Endpoint
  //               //Local:
  //               `http://localhost:4000/create?text=${text}&id=${idFromText}&userID=${userID}&image=${downloadURL}`
  //               //Production:
  //               //`https://myheroku-deployed-api.heroku.com`
  //           )
  //           .then(function(response){
  //               //handle success
  //               console.log('response', response);
  //           })
  //           .catch(function(error){
  //               //handle error
  //               console.log(error);
  //           });
  //       });
  //     }  
  //   );
  // }
  

   //Upload Image
  //  async function UploadImage(e) {
  //   const storageRef = firebase.storage().ref(); 
  //   const fileReference = e.currentTarget.postImage.files[0];
  //   storageRef
  //     .child(`${fileReference.name}`)
  //     .put(fileReference);

  //     uploadTask.on('state_changed', (snapshot) => {
  //       // Observe state change events such as progress, pause, and resume
  //       }, (error) => {
  //         // Handle unsuccessful uploads
  //         console.log(error);
  //       }, () => {
  //          // Do something once upload is complete
  //          console.log('success');
  //       });
  //     }

    //console.log('upload image', e);
  //}

  //Create Post 
  function CreatePostFunction(e) {
    e.preventDefault();
    let text = e.currentTarget.postText.value;
    let idFromText = text.replace(/\s+/g, "-").toLowerCase().substr(0, 16);
    let userID = userInformation.uid;

    // const imageReference = await UploadImage(e);
    // console.log("imageReference", imageReference);

    //Send the data to API
    axios
    .get(
        //My API Endpoint
        //Local:
        `http://localhost:4000/create?text=${text}&id=${idFromText}&userID=${userID}`
        //Production:
        //`https://myheroku-deployed-api.heroku.com`
    )
    .then(function(response){
        //handle success
        console.log('response', response);
    })
    .catch(function(error){
        //handle error
        console.log(error);
    });
  }

 

  if (loading) return null;

  return (
    <div className="App">
      <Header LogoutFunction={LogoutFunction} isLoggedIn={loggedIn}/>
      <Router>
        <Route exact path="/">
        {!loggedIn ? (
            <Redirect to="/login"/>
          ) : (
            <Home userInformation={userInformation} />
          )}
        </Route>
        <Route exact path="/post/:id">
        {!loggedIn ? (
            <Redirect to="/login"/>
          ) : (
            <SinglePost />
          )}
        </Route>
        <Route exact path="/create-post">
          {!loggedIn ? (
            <Redirect to="/login" />
          ) : (
            <CreatePost CreatePostFunction={CreatePostFunction} />
          )} 
          {/* passed in a function as a prop, from function above */}
        </Route>
        <Route exact path="/login">
          {!loggedIn ? (
            <Login LoginFunction={LoginFunction} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/create-account">
          {!loggedIn ? (
            <CreateAccount CreateAccountFunction={CreateAccountFunction}/>
          ) : (
            <Redirect to="/" />
          )} 
          {/* passed in a function as a prop, from function above */}
        </Route>
      </Router>
    </div>
    
  );
}

export default App;
