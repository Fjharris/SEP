
//TODO: (Would like to have) move the login page from a seperate window into a popup window so the
// navigation process isn't interrupted

  /**
   * Handles the sign in button press.
   */
  function toggleSignIn() {
    //using firebase auth the current user function returns the logged in user

    //if the current user call returns as a value that means there is a user logged in and clicking the button is a sign out command
    if (firebase.auth().currentUser) {
      //sign out the user
      firebase.auth().signOut();
    } else {
      //The current user call returns as null meaning the button press was an attempt to loging
      //get the details out of the email and password fields on the form
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      //Very basic error checking 
      //TODO: requires escaping to protect against injection attacks
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      //use the firebase sign in commands
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        //put any errors on the log
        console.log(error);
        // make sure the sign-in button is able to be used
        document.getElementById('sign-in').disabled = false;
      });
      
    }
    document.getElementById('sign-in').disabled = true;

  }

  /**
   * Handles the sign up button press.
   */
  function handleSignUp() {
    //Get the email and password from the login form
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

  //very basic error checking
  //TODO:: We should put in proper validation
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Create user with email and pass.
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      //log any errors
      console.log(error);
    });
  }


  /**
   * initApp handles setting up UI event listeners and registering Firebase auth listeners:
   *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
   *    out, and that is where we update the UI.
   */
  function initApp() {
    // Listening for auth state changes.
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        document.getElementById('sign-in').textContent = 'Sign out';
        //If a login is successful take the user back to the index
        window.location.href= "index.html";
      } else {
        // User is signed out.
        document.getElementById('sign-in').textContent = 'Sign in';
      }
      //the sign-in button isn't enabled until there is text in the uname/password fields
      document.getElementById('sign-in').disabled = false;
    });

    //create the listeners on the buttons
    document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);
    document.getElementById('sign-up').addEventListener('click', handleSignUp, false);
  }

  //When the window first loads
  window.onload = function() {
    initApp();
  };
//</script>