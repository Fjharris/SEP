//This function is used to get the value of a radiobox to use it you need to pass in the name of radiobox
function checkRadioValue(radiotocheck) {  
  // a query selector looks over the document to find an element that fits the query. In this case an input element with the name\
  // that is passed into the function that has been checked
  var getSelectedValue = document.querySelector('input[name=' + radiotocheck +']:checked');   
      
  //This if makes sure that one of the options has been selected and returns the value of the radiobox 
  if(getSelectedValue != null) {   
     return getSelectedValue.value        
  }  
  // The else returns a null if none have been selected 
  else {   
 return null
  }   
}    

function AddRestaurant(){
    //This is the function that adds a restaurant to the database
    //store the access to the database
    const db = firebase.firestore();
    //gather the information for the new restaurant all of this could be done by capturing the form data when it was submitted but when
    //testing it was giving me some weird errors so I started pulling the items individually to debug the system. If we have time this
    //is something that should be improved.
    var restname = document.getElementById("restuarant_name").value
    var location = document.getElementById("restaurant_location").value
    var dinein = document.getElementById("dine_in").checked
    var takeout = document.getElementById("take_out").checked
    //radio buttons use the check radiovalue function
    var foodrating = checkRadioValue("Food");
    var servicerating = checkRadioValue("Service");
    var valuerating = checkRadioValue("Price");
    var atmosphererating = checkRadioValue("atmosphere");

    var overalrating = (foodrating+servicerating+valuerating+atmosphererating)/4;

    //get the information for the first review
    var authname = document.getElementById("fname").value + " " + document.getElementById("sname").value;
    var datesubmitted = new Date();
    var dayvisited = document.getElementById("day_visited").value
    var timevisited = document.getElementById("time_visited").value
    var review =  document.getElementById("review").value



    //post to console for debugging


    //create a new document and store it in the restuarant collection This is the top level restaurant and not the review 

    docref =  db.collection("restaurants").doc()
    
    docref.set({
      name : restname,
      location : location,
      dinein : dinein,
      takeout : takeout,
      food : foodrating,
      service : servicerating,
      value : valuerating,
      atmosphere : atmosphererating,
      overal : overalrating
    })
    console.log(docref.id + ' created');
      
      revref = db.collection("restaurants").doc(docref.id).collection('review').doc()
      console.log(revref.id + ' being created');

      revref.set({
        author : authname,
        date : datesubmitted,
        dayvisited : dayvisited,
        timevisited : timevisited,
        review : review,
        food : foodrating,
        service : servicerating,
        atmosphere : atmosphererating,
        overal : overalrating

      })



    
}