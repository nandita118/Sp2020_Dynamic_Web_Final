import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
//Styling
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInformation, setUserInformation] = useState({})

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

  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Home />
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
