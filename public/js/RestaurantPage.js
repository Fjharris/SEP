function addStars(element,times)
{
    //loop through the amount of stars we want
    for (let i = 0; i < times; i++) {
        //create a new star
        let star = document.createElement('i');
        star.className = "fas fa-star"
        //add it to the element that is storing them
        element.appendChild(star);
      }
   

}

document.addEventListener('DOMContentLoaded', (event) => {
const urlParams = new URLSearchParams(window.location.search);
const restaurantID = urlParams.get('restaurantid');
document.getElementById("addreviewlink").href = "review form.html?restaurantid=" +restaurantID;
const db = firebase.firestore()


var docRef = db.collection("restaurants").doc(restaurantID);

docRef.get().then((doc) => {
    if (doc.exists) {
        //get the name and overall ratings
        document.getElementById("rname").innerHTML=doc.data().name;
        document.getElementById("rlocation").innerHTML=doc.data().location;
        let ratings = document.getElementById("totalratings")
        addStars(ratings,doc.data().overal);

        db.collection("restaurants").doc(restaurantID).collection("review").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                let linebreak = document.createElement('br');

        let divcontainer= document.createElement('div');
        divcontainer.className = "card-container sub-container"
        let img = document.createElement('img');
        img.src = "images/restaurant1.jpg" ;
        img.alt= "restaurant" ;
        let crdtext = document.createElement('div');
        crdtext.className="card-txt";
        let reviewdate = document.createElement('h4');      
        let overall = document.createElement('p');
        overall.className = "star-rating"
        overall.innerHTML = "Overall Rating "
        addStars(overall,doc.data().overal);
        let rattingscontainer = document.createElement('div');
        rattingscontainer.className = "ratings";
        let review = document.createElement("p");
        review.className = "restReview";
        let author = document.createElement("p");
        author.className = "reviewedBy";
        let datereviewed = document.createElement("p");

        reviewdate.innerHTML = "Last reviewed on " + doc.data().date.toDate().toDateString();
        review.innerHTML = doc.data().review;
        author.innerHTML = "Reviewed by: " + doc.data().author;
        datereviewed.innerHTML = "Visited on: " + doc.data().dayvisited;

        let food = document.createElement('p');
        food.innerHTML = "<i class='fas fa-hotdog'></i> &nbsp; Food ";
        addStars(food,doc.data().food);
        let service = document.createElement('p');
        service.innerHTML = "<i class='fas fa-concierge-bell'></i> &nbsp; Service ";
        addStars(service,doc.data().service);
        let value = document.createElement('p');
        value.innerHTML = "<i class='fas fa-pound-sign'></i> &nbsp; Value ";
        addStars(value,doc.data().value);
        let atmosphere = document.createElement('p');
        atmosphere.innerHTML = "<i class='fas fa-cloud-sun'></i> &nbsp; Atmosphere ";
        addStars(atmosphere,doc.data().atmosphere);

        
        divcontainer.appendChild(img);
        crdtext.appendChild(reviewdate);
        crdtext.appendChild(overall);
        crdtext.appendChild(author);
        crdtext.appendChild(datereviewed);
        rattingscontainer.appendChild(food);
        rattingscontainer.appendChild(service);
        rattingscontainer.appendChild(value);
        rattingscontainer.appendChild(atmosphere);
        crdtext.appendChild(rattingscontainer);
        crdtext.appendChild(review);
        divcontainer.appendChild(crdtext)

        document.getElementById("startofreviews").append(divcontainer);

            });

            let foot = document.createElement("div");
            foot.className = "footer";
            foot.innerHTML= ' <p> &copy; 2021 Harrison, Sanchez & Tiramdasu</p>'

            document.getElementById("startofreviews").append(foot);

        });

    } else {
        // doc.data() will be undefined in this case
        console.log("No such Restaurant!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

});


