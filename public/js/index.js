
document.addEventListener('DOMContentLoaded', (event) => {
    renderReviews()
});

//this code is used to add the correct amount of stars, We pass in the element we are adding the stars to and the amount we want
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
//This is the function that gets all the reviews from the database and displays them this is the default function that lists all of the different restaurants
function renderReviews()
{
    //get a full list of restaurants
const db = firebase.firestore()
db.collection("restaurants").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {

        let linebreak = document.createElement('br');

        let divcontainer= document.createElement('div');
        divcontainer.className = "card-container sub-container"
        let img = document.createElement('img');
        img.src = "images/restaurant1.jpg" ;
        img.alt= "restaurant" ;
        let crdtext = document.createElement('div');
        crdtext.className="card-txt";
        let rname = document.createElement('H1');
        rname.className="restName";
        rname.innerHTML = '<a href="restaurantPage.html?restaurantid='+doc.id+'"> ' +  doc.data().name + ' </a>';
        let link = document.createElement('a');
        link.href = "restaurantPage.html?restid=" + doc.id;
        let rlocation = document.createElement('h2');
        rlocation.className="slant";
        rlocation.innerText = doc.data().location;
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


        //get the latest review for the selected restaurant - This is inefficient and would need to be fixed for a full release
        let query = db.collection("restaurants").doc(doc.id).collection("review").orderBy("date", "desc").limit(1);
        query.get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              
        reviewdate.innerHTML = "Last reviewed on " + documentSnapshot.data().date.toDate().toDateString();
        review.innerHTML = documentSnapshot.data().review;
        author.innerHTML = "Reviewed by: " + documentSnapshot.data().author;
        datereviewed.innerHTML = "Visited on: " + documentSnapshot.data().dayvisited;
        });
    });
    

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


        rname.appendChild(link);
        divcontainer.appendChild(img);
        crdtext.appendChild(rname);
        crdtext.appendChild(rlocation);
        crdtext.appendChild(linebreak);
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
});
}