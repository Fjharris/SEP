function AddRestaurant(){
    //This is the function that adds a restaurant to the database
    //store the access to the database
    const db = firebase.firestore();
    //gather the information for the new guide
    var restname = document.getElementById("Rname").value;
    var restrating = document.getElementById("Rrating").value
    //TODO: store user auth data and timestamps

    //post to console for debugging
    console.log(restname)
    console.log(restrating)

    //create a new document and store it in the guide subcollection
    //TODO turn this into a promise and include error checking and
    docref =  db.collection("restaurants").add({
      name : restname,
      rating: restrating
    })
    
}