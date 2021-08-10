class Review{
constructor(id,author,foodrating,servicerating,valuerating,atmosphererating,overalrating,description,date)
{
    this.id = id;
    this.author = author;
    this.foodrating = foodrating
    this.servicerating = servicerating;
    this.valuerating = valuerating;
    this.atmosphererating = atmosphererating;
    this.overalrating = overalrating;
    this.description = description;
    this.date = date;
}
}

class Restaurant{
    //used to create an object to store a restaurant details. This constructor is used for a new restaurant that has just been created
    constructor (id, name, location, foodrating, servicerating,valuerating,atmosphererating,overalrating,review)
    {
        this.id = id;
        this.name = name;
        this.location = location;
        this.foodrating = foodrating
        this.servicerating = servicerating;
        this.valuerating = valuerating;
        this.atmosphererating = atmosphererating;
        this.overalrating = overalrating

        //create an empty array to hold all of the review objects. This is done to ensure that it is stored as an array rather than a variable
        this.reviews = [];

        //loop through the array of reviews passed through and push the review objects to the reviews array
        review.forEach(element => {
            this.reviews.push(element)    
        });
        
    }

    //This function updates the avaerage scores for the restaurant
    updaterating(){
    //create a new running total for each rating
    let food = 0;
    let value = 0;
    let atmo =0;
    let service = 0;

    //loop through all of the reviews for the restaurant and add the ratings for each review to the new running total
    this.reviews.forEach((item)=>{
        food += item.foodrating;
        value += item.valuerating;
        atmo += item.atmorating;
        service += item.servicerating
    });

    //divide the total for each rating by the number of reviews to get an average
    this.foodrating = food/ this.reviews.length();
    this.valuerating = value/this.reviews.length()
    this.atmosphererating = atmo/this.reviews.length()
    this.servicerating = service/this.reviews.length()

    //average all of the individual ratings to get an overal rating
    this.overalrating = (this.foodrating + this.valuerating + this.atmosphererating +this.servicerating)/4
    }

}

//firestore dataconvertor
//this is used to take the data from the firestore database and propagate it into a restaurant object. Due to time and logic
//I decided not to implement this as run more of the code in the JS and keep the classes managed individually


// var restaurantConvertor ={
// toFirestore: function(restaurant){
//     return{
//         id: restaurant.id,
//         name: restaurant.name,
//         location: restaurant.location,
//         foodrating: restaurant.foodrating,
//         servicerating: restaurant.servicerating,
//         valuerating: restaurant.valuerating,
//         atmosphererating: restaurant.atmosphererating,
//         overalrating: restaurant.overalrating
//     };
// }
// }