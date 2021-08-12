
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
        //reviewdate to be added
        let overall = document.createElement('p');
        overall.className = "star-rating"
        addStars(overall,doc.data().overal);
        //lastest review information to be added
        let rattingscontainer = document.createElement('div');
        rattingscontainer.className = "ratings";

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
        food.innerHTML = "<i class='fas fa-cloud-sun'></i> &nbsp; Atmosphere ";
        addStars(atmosphere,doc.data().atmosphere);

        rname.appendChild(link);
        divcontainer.appendChild(img);
        crdtext.appendChild(rname);
        crdtext.appendChild(rlocation);
        crdtext.appendChild(linebreak);
        crdtext.appendChild(reviewdate);
        crdtext.appendChild(overall);
        rattingscontainer.appendChild(food);
        rattingscontainer.appendChild(service);
        rattingscontainer.appendChild(value);
        rattingscontainer.appendChild(atmosphere);
        crdtext.appendChild(rattingscontainer);
        divcontainer.appendChild(crdtext)





//        let title= document.createElement('span');
//        let rating = document.createElement('span');

//        li.setAttribute('data-id',doc.id)
//      title.textContent = doc.data().name;
//        rating.textContent = doc.data().rating;

        document.getElementById("startofreviews").append(divcontainer)


    });
});
}