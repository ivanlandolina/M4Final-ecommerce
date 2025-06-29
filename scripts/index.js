const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODU5YjczYzRlZjFiYzAwMTVkZjVhZDEiLCJpYXQiOjE3NTA4NTA0ODksImV4cCI6MTc1MjA2MDA4OX0.artecW8nIZ95roqV-TWuAUlzwmvU3CC-Wj_FB2ZytH8'
const row = document.querySelector('.row')
const dvdsCarrello = []
const carrelloModal = document.querySelector('.modal-body')
const conteggioCarrello = document.querySelector('#conteggioCarrello')

//////////////////////////// 1. FUNZIONE PER FETCH ////////////////////////////////////////////////////
function fetchDvd() {
    fetch('https://striveschool-api.herokuapp.com/api/product/', {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        ciclaElementi(data)
    })
    .catch(error => {
        console.log("Errore nella fetch: ", error)
    });
}

fetchDvd();

//////////////////////////// 2.a FUNZIONE PER CICLARE SUI RISULTATI ////////////////////////////////////////////////////
function ciclaElementi(dvds) {
    let dvdsMap = dvds.map(dvd => costruisciCard(dvd))
    row.append(...dvdsMap)
}

//////////////////////////// 2.b FUNZIONE PER CREARE CARD ////////////////////////////////////////////////////
function costruisciCard(dvd) {

    const col = document.createElement('div')
    col.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mt-4')
    
    const card = document.createElement('div')
    card.classList.add('card', 'custom-style', 'position-relative')
    col.appendChild(card)

    const imgDvd = document.createElement('img')
    imgDvd.classList.add('img', 'img-fluid')
    imgDvd.src = dvd.imageUrl
    imgDvd.alt = dvd.name
    card.appendChild(imgDvd)

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body', 'text-center')
    card.appendChild(cardBody)

    const titolo = document.createElement('h5')
    titolo.classList.add('card-title', 'title', 'text-primary', 'fs-5')
    titolo.innerText = dvd.name
    cardBody.appendChild(titolo)

    const produzione = document.createElement('p')
    produzione.classList.add('card-text', 'text-secondary', 'fs-6')
    produzione.innerText = dvd.brand;
    cardBody.appendChild(produzione)

    const prezzo = document.createElement('p')
    prezzo.classList.add('prezzo', 'text-center')
    prezzo.innerText = `€ ${dvd.price.toFixed(2)}`
    cardBody.appendChild(prezzo)

    const containerBtn = document.createElement('div')
    containerBtn.classList.add('d-flex', 'justify-content-center', 'gap-2', 'mt-3')
    cardBody.appendChild(containerBtn)

    const btnAggiungi = document.createElement('button')
    btnAggiungi.id = 'liveToastBtn';
    btnAggiungi.classList.add('btn', 'btn-success')
    btnAggiungi.innerHTML = '<i class="bi bi-cart-plus"></i> Aggiungi'
    btnAggiungi.addEventListener('click', () => aggiungiCarrello(dvd))
    containerBtn.appendChild(btnAggiungi)

    const btnInfo = document.createElement('a');
    btnInfo.id = 'info';
    btnInfo.href = `/dettaglio.html?id=${dvd._id}`;
    btnInfo.target = '_blank';
    btnInfo.className = 'btn btn-sm btn-secondary';
    btnInfo.innerHTML = '<i class="bi bi-info-circle"></i> Info';
    containerBtn.appendChild(btnInfo);

    return col
}

///////////FUNZIONE PER AGGIUNGERE DVD AL CARRELLO/////////////////////////////////////////
function aggiungiCarrello(dvd) {
    dvdsCarrello.push(dvd)
    aggiornaCarrello() 
}

//////////////FUNZIONE PER RIMUOVERE DVD DAL CARRELLO/////////////////////////////////////
function rimuoviDalCarrello(dvd) {
    const index = dvdsCarrello.findIndex(l => l._id === dvd._id)
    if (index !== -1) {
        dvdsCarrello.splice(index, 1)
        aggiornaCarrello()
    }
}

////////////FUNZIONE CHE AGGIORNA LA VISUALIZZAZIONE DEL CARRELLO////////////////////////////
function aggiornaCarrello() {
    conteggioCarrello.innerText = dvdsCarrello.length
    carrelloModal.innerHTML = ''
    const righe = dvdsCarrello.map(dvd => strutturaCarrello(dvd))
    carrelloModal.append(...righe)

    // Calcola e aggiungi il totale
    const totale = calcolaTotale()
    const rigaTotale = creaTotale(totale)
    carrelloModal.appendChild(rigaTotale)
}

////////////FUNZIONE PER CALCOLARE IL TOTALE////////////////////////////
function calcolaTotale() {
    return dvdsCarrello.reduce((somma, dvd) => {
        return somma + parseFloat(dvd.price)
    }, 0)
}

////////////FUNZIONE PER CREARE LA RIGA DEL TOTALE////////////////////////////
function creaTotale(totale) {
    const rigaTotale = document.createElement('div')
    rigaTotale.classList.add('row', 'mt-3', 'pt-3', 'border-top')
    
    const colVuota = document.createElement('div')
    colVuota.classList.add('col')
    rigaTotale.appendChild(colVuota)
    
    const titoloTotale = document.createElement('h5')
    titoloTotale.classList.add('mb-0', 'text-center')
    titoloTotale.innerText = 'Totale:'
    colVuota.appendChild(titoloTotale)
    
    const colTotale = document.createElement('div')
    colTotale.classList.add('col')
    rigaTotale.appendChild(colTotale)
    
    const prezzoTotale = document.createElement('h5')
    prezzoTotale.classList.add('text-center', 'text-success', 'fw-bold', 'mb-0', 'd-flex')
    prezzoTotale.innerText = `€ ${totale.toFixed(2)}`
    colTotale.appendChild(prezzoTotale)
    
    return rigaTotale
}

///////// FUNZIONE PER CREARE LA STRUTTURA HTML DEL CARRELLO//////////////////////////////////
function strutturaCarrello(dvd) {
    const rigaCarrello = document.createElement('div')
    rigaCarrello.classList.add('row', 'mb-3')

    const colImg = document.createElement('div')
    colImg.classList.add('col-3')
    rigaCarrello.appendChild(colImg)

    const imgArticolo = document.createElement('img')
    imgArticolo.classList.add('w-100')
    imgArticolo.src = dvd.imageUrl
    colImg.appendChild(imgArticolo)

    const colTitolo = document.createElement('div')
    colTitolo.classList.add('col-5')
    rigaCarrello.appendChild(colTitolo)

    const titoloArticolo = document.createElement('h5')
    titoloArticolo.classList.add('title', 'card-title')
    titoloArticolo.innerText = dvd.name
    colTitolo.appendChild(titoloArticolo)

    const colPrezzo = document.createElement('div')
    colPrezzo.classList.add('col-2')
    rigaCarrello.appendChild(colPrezzo)

    const prezzoArticolo = document.createElement('p')
    prezzoArticolo.classList.add('prezzo', 'text-center')
    prezzoArticolo.innerText = `€ ${dvd.price.toFixed(2)}`
    colPrezzo.appendChild(prezzoArticolo)

    const colBtnRimuovi = document.createElement('div')
    colBtnRimuovi.classList.add('col-2')
    rigaCarrello.appendChild(colBtnRimuovi)

    const btnRimuovi = document.createElement('button')
    btnRimuovi.classList.add('btn', 'btn-danger', 'btn-sm')
    btnRimuovi.innerHTML = '<i class="bi bi-trash-fill"></i>'
    btnRimuovi.addEventListener('click', () => rimuoviDalCarrello(dvd))
    colBtnRimuovi.appendChild(btnRimuovi)

    return rigaCarrello
}

function rimuoviDvd(col){
    col.remove();
}
