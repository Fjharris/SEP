
document.addEventListener('DOMContentLoaded', (event) => {
    renderGuides()
});

function renderGuides()
{
const db = firebase.firestore()
db.collection("restaurants").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {

        let li= document.createElement('li');
        let title= document.createElement('span');
        let rating = document.createElement('span');

        li.setAttribute('data-id',doc.id)
        title.textContent = doc.data().name;
        rating.textContent = doc.data().rating;

        li.appendChild(title)
        li.appendChild(rating)
        document.getElementById("Restaurants").appendChild(li)


    });
});
}