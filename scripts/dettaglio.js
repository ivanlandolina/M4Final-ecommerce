const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODU5YjczYzRlZjFiYzAwMTVkZjVhZDEiLCJpYXQiOjE3NTA4NTA0ODksImV4cCI6MTc1MjA2MDA4OX0.artecW8nIZ95roqV-TWuAUlzwmvU3CC-Wj_FB2ZytH8'
const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get('id');
console.log(id);

const imgDiv = document.querySelector('#imgDiv');
const infoDiv = document.querySelector('#infoDiv');
const titolo = infoDiv.querySelector('h1');
const categoria = infoDiv.querySelector('#categoria');
const produzione = infoDiv.querySelector('#produzione');
const idP = infoDiv.querySelector('#idP'); 
const prezzoP = infoDiv.querySelector('#prezzoP'); 
const tramaP = infoDiv.querySelector('#trama');
const titleTab = document.querySelector('title');

function fetchDvdInfo(){
    fetch('https://striveschool-api.herokuapp.com/api/product/' + id, {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })
        .then (response => response.json())
        .then (dvd => {
            console.log(dvd);
            renderDvdInfo(dvd);
        })
}

fetchDvdInfo();

function renderDvdInfo(dvd){
    const copertina = document.createElement('img');
    copertina.src = dvd.imageUrl; 
    copertina.alt = dvd.name;
    copertina.className = 'img img-fluid';
    imgDiv.appendChild(copertina);

    titleTab.innerText = dvd.name + ' | BluStore';
    titolo.innerText = dvd.name;
    produzione.innerText = dvd.brand;
    id.innerText = dvd.id;
    prezzoP.innerText = '€ ' + dvd.price.toFixed(2);
    tramaP.innerText = dvd.description;
    idP.innerText = dvd._id;

}
