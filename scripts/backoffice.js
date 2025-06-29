const tableBody = document.querySelector('#tableBody');
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODU5YjczYzRlZjFiYzAwMTVkZjVhZDEiLCJpYXQiOjE3NTA4NTA0ODksImV4cCI6MTc1MjA2MDA4OX0.artecW8nIZ95roqV-TWuAUlzwmvU3CC-Wj_FB2ZytH8'
const nomeProdotto = document.querySelector("#nome");
const descrizioneProdotto = document.querySelector("#descrizione");
const brandProdotto = document.querySelector("#brand");
const immagineProdotto = document.querySelector("#urlImmagine");
const prezzoProdotto = document.querySelector("#prezzo");
document.querySelector("#button-save").addEventListener("click", salvaProdotto);

/////////// funzione che recupera i prodotti dall'API e li visualizza nella tabella///////////////////
async function fetchProduct() {
    try {
        const result = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
            headers: {
                Authorization: `Bearer ${apiKey}`
            },
        });
        const data = await result.json();
        console.log(data);
        inputArray(data);
    } catch (e) {
        console.log(e);
    }
}

///////// funzione che dato in input come parametro della funzione "data", cicla e mappa l'array///////////////////
function inputArray(products) {
    const productTr = products.map((product) => createTableRow(product));
    console.log(productTr);
    tableBody.append(...productTr);
}


// funzione che crea una riga della tabella con i dati del prodotto
// e i bottoni per eliminare e modificare il prodotto///////////////////////////////////////////////////////////////////////
function createTableRow(product) {
    const tr = document.createElement('tr');
    const modalId = `eliminaModal-${product._id}`;
    const modalModificaId = `modificaModal-${product._id}`;

    const tdAzione = document.createElement('td');

    // Button per eliminare il prodotto
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn btn-danger me-2';
    deleteBtn.setAttribute('data-bs-toggle', 'modal');
    deleteBtn.setAttribute('data-bs-target', `#${modalId}`);
    deleteBtn.innerHTML = '<i class="bi bi-trash3-fill"></i>';

    // Modal per confermare l'eliminazione
    const deleteModal = document.createElement('div');
    deleteModal.className = 'modal fade';
    deleteModal.id = modalId;
    deleteModal.tabIndex = -1;
    deleteModal.setAttribute('aria-labelledby', `${modalId}-label`);
    deleteModal.setAttribute('aria-hidden', 'true');
    deleteModal.innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="${modalId}-label">Elimina prodotto</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Chiudi"></button>
        </div>
        <div class="modal-body">
            Sei sicuro di voler eliminare il prodotto <strong>${product.name}</strong>?
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annulla</button>
            <button type="button" class="btn btn-danger" onclick="eliminaProdotto('${product._id}')">Elimina</button>
        </div>
        </div>
    </div>`;

    // Button per modificare il prodotto
    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'btn btn-warning';
    editBtn.setAttribute('data-bs-toggle', 'modal');
    editBtn.setAttribute('data-bs-target', `#${modalModificaId}`);
    editBtn.innerHTML = '<i class="bi bi-pencil-square"></i>';

    // Modal per modificare il prodotto
    const editModal = document.createElement('div');
    editModal.className = 'modal fade';
    editModal.id = modalModificaId;
    editModal.tabIndex = -1;
    editModal.setAttribute('aria-labelledby', `${modalModificaId}-label`);
    editModal.setAttribute('aria-hidden', 'true');
    editModal.innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="${modalModificaId}-label">Modifica prodotto</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form>
            <div class="mb-2">
                <label class="form-label">Nome del prodotto</label>
                <input type="text" id="nomeMod-${product._id}" class="form-control" value="${product.name}" required />
            </div>
            <div class="mb-2">
                <label class="form-label">Brand</label>
                <input type="text" id="brandMod-${product._id}" class="form-control" value="${product.brand}" required />
            </div>
            <div class="mb-2">
                <label class="form-label">Descrizione del prodotto</label>
                <textarea class="form-control" id="descrizioneMod-${product._id}" rows="4">${product.description}</textarea>
            </div>
            <div class="mb-2">
                <label class="form-label">URL dell'immagine</label>
                <input type="text" id="urlImmagineMod-${product._id}" class="form-control" value="${product.imageUrl}" required />
            </div>
            <div class="mb-2">
                <label class="form-label">Prezzo</label>
                <input type="number" id="prezzoMod-${product._id}" class="form-control" value="${product.price}" required />
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Annulla</button>
                <button type="button" class="btn btn-success" id="button-modify" onclick="modificaProdotto('${product._id}')">Salva modifiche</button>
            </div>
            </form>
        </div>
        </div>
    </div>`;

    // Append degli elementi
    tdAzione.append(deleteBtn, deleteModal, editBtn, editModal);


    // tdAzione.innerHTML = `
    //     <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#${modalId}">
    //         <i class="bi bi-trash3-fill"></i>
    //     </button>

    //     <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}-label" aria-hidden="true">
    //         <div class="modal-dialog">
    //             <div class="modal-content">
    //                 <div class="modal-header">
    //                     <h1 class="modal-title fs-5" id="${modalId}-label">Elimina prodotto</h1>
    //                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Chiudi"></button>
    //                 </div>
    //                 <div class="modal-body">
    //                     Sei sicuro di voler eliminare il prodotto <strong>${product.name}</strong>?
    //                 </div>
    //                 <div class="modal-footer">
    //                     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annulla</button>
    //                     <button type="button" class="btn btn-danger" onclick="eliminaProdotto('${product._id}')">Elimina</button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>

    //     <button class="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#${modalModificaId}">
    //         <i class="bi bi-pencil-square"></i>
    //     </button>

    //     <div class="modal fade" id="${modalModificaId}" tabindex="-1" aria-labelledby="${modalModificaId}-label" aria-hidden="true">
    //             <div class="modal-dialog">
    //                 <div class="modal-content">
    //                     <div class="modal-header">
    //                         <h1 class="modal-title fs-5" id="${modalModificaId}-label">Modifca prodotto</h1>
    //                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //                     </div>
    //                     <div class="modal-body">
    //                         <form>
    //                             <!-- Nome input -->
    //                             <div class="mb-2">
    //                                 <label class="form-label">Nome del prodotto</label>
    //                                 <input type="text" id="nomeMod" class="form-control" value="${product.name}" required />
    //                             </div>

    //                             <!-- Brand input -->
    //                             <div class="mb-2">
    //                                 <label class="form-label">Brand</label>
    //                                 <input type="text" id="brandMod" class="form-control" value="${product.brand}" required />       
    //                             </div>

    //                             <!-- Descrizione input -->
    //                             <div class="mb-2">
    //                                 <label class="form-label">Descrizione del prodotto</label>
    //                                 <textarea class="form-control" id="descrizioneMod" rows="4" value="${product.description}"></textarea>
    //                             </div>

    //                             <!-- Immagine input -->
    //                             <div class="mb-2">
    //                                 <label class="form-label">URL dell'immagine</label>    
    //                                 <input type="text" id="urlImmagineMod" class="form-control" value="${product.imageUrl}" required />
    //                             </div>

    //                             <!-- Prezzo input -->
    //                             <div class="mb-2">
    //                                 <label class="form-label">Prezzo</label>
    //                                 <input type="number" id="prezzoMod" class="form-control" value="${product.price}" required /> 
    //                             </div>
    //                             <div class="modal-footer">
    //                                 <button type="button" class="btn btn-danger"
    //                                     data-bs-dismiss="modal">Annulla</button>
    //                                 <button id="button-save" type="submit" class="btn btn-success">Salva modifiche</button>
    //                             </div>
                                
    //                         </form>
                            
    //                     </div>

    //                 </div>
    //             </div>
    //         </div>
    // `;

    const tdNome = document.createElement('td');
    tdNome.innerText = product.name;

    const tdBrand = document.createElement('td');
    tdBrand.innerText = product.brand;

    const tdImmagine = document.createElement('td');
    tdImmagine.innerHTML = `<img src="${product.imageUrl}" alt="${product.name}" style="width: 80px; height: auto;">`;

    const tdPrezzo = document.createElement('td');
    tdPrezzo.classList.add("fw-semibold");
    tdPrezzo.innerText = '€ ' + product.price.toFixed(2);

    tr.append(tdAzione, tdNome, tdBrand, tdImmagine, tdPrezzo);
    return tr;
}


/////////// funzione per salvare un prodotto/////////////////////////////////////
async function salvaProdotto(e) {
    e.preventDefault();

    const data = {
        name: nomeProdotto.value,
        description: descrizioneProdotto.value,
        brand: brandProdotto.value,
        imageUrl: immagineProdotto.value,
        price: prezzoProdotto.value,
    };
    console.log(data);
    try {
        await fetch(`https://striveschool-api.herokuapp.com/api/product/`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
        });
    } catch (e) {
        console.log(e);
    }
    alert("Prodotto aggiunto con successo!");
    location.reload();
}

/////////////////////// funzione per eliminare un prodotto//////////////////////////////////////
async function eliminaProdotto(id) {
    try {
        await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
    } catch (e) {
        console.log(e);
    }
    location.reload();
}

/////////////////////// funzione per modificare un prodotto//////////////////////////////////////
async function modificaProdotto(id) {
    
    const nomeMod = document.querySelector(`#nomeMod-${id}`).value;
    const brandMod = document.querySelector(`#brandMod-${id}`).value;
    const descrizioneMod = document.querySelector(`#descrizioneMod-${id}`).value;
    const urlImmagineMod = document.querySelector(`#urlImmagineMod-${id}`).value;
    const prezzoMod = document.querySelector(`#prezzoMod-${id}`).value;

    const data = {
        name: nomeMod,
        brand: brandMod,
        description: descrizioneMod,
        imageUrl: urlImmagineMod,
        price: prezzoMod,
    };

    try {
        await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
        });
    } catch (e) {
        console.log(e);
    }
    alert("Prodotto modificato con successo!");
    location.reload(); 
}


fetchProduct();

