var config = {
    apiKey: "AIzaSyByZqKilOIuj-rmwLMtzoN6qIfTG-aIlLY",
    authDomain: "smartdo-login-form.firebaseapp.com",
    databaseURL: "https://smartdo-login-form.firebaseio.com",
    projectId: "smartdo-login-form",
    storageBucket: "smartdo-login-form.appspot.com",
    messagingSenderId: "903415104385"
};

firebase.initializeApp(config);


function doCreateUser(email, password) {
    console.log(firebase);
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert("Incorrect email address and/or password. Please try again.")
    });
}

function doSignIn(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}

function doSignOut(){
  firebase.auth().signOut().then(function() {
    alert("Sign Out Successful! Thanks for stopping by!")
  }).catch(function(error) {
    alert("Whoops! Error Occurred. Try again later.")
  });
}

$(document).ready(function(){

    $('#signin').on('click', function() {
        event.preventDefault();
        var email = $("#emailaddress").val().trim();
        var password = $("#password").val().trim();
        doSignIn(email, password);
    });
 
    $('#createaccount').on('click', function() {
        event.preventDefault();
        var email = $("#emailaddress").val().trim();
        var password = $("#password").val().trim();
        doCreateUser(email, password);
    });
 

});
    

