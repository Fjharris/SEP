
document.addEventListener('DOMContentLoaded', (event) => {
    renderReviews()
});

//This is the function that gets all the reviews from the database and displays them this is the default function that lists all of the different restaurants
function renderReviews()
{
const db = firebase.firestore()
db.collection("restaurants").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {

        let divcontainer= document.createElement('div');
        divcontainer.className = "card-container sub-container"
        let img = document.createElement('img');
        img.src = "images/restaurant1.jpg" ;
        img.alt= "restaurant" ;
        let crdtext = document.createElement('div');
        crdtext.className="card-txt";
        let rname = document.createElement('H1');
        rname.className="restName";
        rname.innerHTML = '<a href="restaurantPage.html"> ' +  doc.data().name + ' </a>';
        let link = document.createElement('a');
        link.href = "restaurantPage.html";
        let rlocation = document.createElement('h2');
        rlocation.className="slant";
        rlocation.innerText = doc.data().location



        rname.appendChild(link);
        divcontainer.appendChild(img);
        crdtext.appendChild(rname);
        crdtext.appendChild(rlocation);
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