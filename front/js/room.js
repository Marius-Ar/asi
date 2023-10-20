getActiveGames();
let roomId;
let card;
let cardId;
function joinRoom(id) {
    fetch('/game-service/room/join/' + id).then(response => response.json())
        .then(room => {
            roomId=room.id;
            status();
        });

}
function loadFight(enemyCardId){

    fetch('/fight.html')
        .then(response => {
            if (!response.ok) {
                console.log("probleme")
                throw new Error('Network response was not ok');
            }
            return response.text();
            console.log("pas de probleme")
            console.log("response",response);
        })
        .then(data => {
            document.body.innerHTML = data;
            getCard(enemyCardId,"#row2",true,"#content2")
            getCard(cardId,"#row1",true,"#content1")
        });
}
function status(){
    let cardInterval = setInterval(async function () {
        fetch('/game-service/room/status/' + roomId)
            .then(response => response.json())
            .then(data => {
                if (data.status === "WAITING_CARDS") {
                    console.log("je passe");
                    loadCards();
                    clearInterval(cardInterval);
                }
                else if(data.status==="IN_GAME"){
                    loadFight(data.enemyCardId);
                    clearInterval(cardInterval);
                }
            })
            .catch(error => console.error('Erreur:', error));
    }, 2000);
}
function getActiveGames() {
    fetch('/game-service/room/active').then(response => response.json())
        .then(room => {
            let tbody = document.querySelector('.ui.celled.table tbody');
            tbody.innerHTML = '';
            console.log(room.length)
            if (room.length === 0) {
                if (!document.getElementById('emptyMessage')) {
                    let message = document.createElement('p');
                    message.id = 'emptyMessage';
                    message.textContent = 'Pas de partie en cours';
                    message.style.textAlign = 'center';
                    document.body.appendChild(message);
                    let reloadButton = document.createElement('button');
                    reloadButton.textContent = 'Reload';
                    reloadButton.classList.add('ui', 'button');
                    reloadButton.style.display = 'block';
                    reloadButton.style.margin = '0 auto';
                    reloadButton.onclick = function () {
                        getActiveGames();
                        showNotification("Parties en cours", "Le rechargement a bien ete fait.", "green")
                    };
                    document.body.appendChild(message);
                    document.body.appendChild(reloadButton);
                }
            } else {
                room.forEach(item => {
                    let tr = document.createElement('tr');
                    let tdId = document.createElement('td');
                    tdId.textContent = item.id;
                    tdId.style.display = 'none';
                    tr.appendChild(tdId);
                    let tdName = document.createElement('td');
                    tdName.textContent = item.name;
                    tr.appendChild(tdName);
                    let tdPrice = document.createElement('td');
                    tdPrice.textContent = item.price;
                    tr.appendChild(tdPrice);
                    let tdAction = document.createElement('td');
                    let joinButton = document.createElement('button');
                    joinButton.textContent = 'Rejoindre';
                    joinButton.classList.add('ui', 'button');
                    joinButton.onclick = function () {
                        joinRoom(item.id);
                    };
                    tdAction.appendChild(joinButton);
                    tr.appendChild(tdAction);

                    tbody.appendChild(tr);
                });
            }
        })
}

$(document).ready(function () {
    $('.ui.form').form({
        fields: {
            nom: {
                identifier: 'nom',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Veuillez entrer un nom'
                    }
                ]
            }
        },
        prix: {
            identifier: 'prix',
            rules: [
                {
                    type: 'empty',
                    prompt: 'Veuillez entrer un prix'
                },
                {
                    type: 'number',
                    prompt: 'Veuillez entrer un nombre pour le prix'
                }
            ]
        },
        onSuccess: function (event, fields) {
            event.preventDefault(); // Prevent form from submitting normally
            fetch('/game-service/room/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fields)
            }).then(async response => {
                if (!response.ok) {
                    await showNotification("Creation d'une partie", "Un probleme est survenu", "red");
                } else {
                    response.json().then(data => {
                        roomId=data.id;
                            showNotification("Creation d'une partie", "En attente d'un joueur", "green").then(r => {
                                showLoader("En attente d'un joueur");
                               status();
                            });
                        }
                    )
                }
            });
        }
    });
});
//VÉRIFIER LA TUNE DES GENS QUAND ILS CRÉÉENT ET ILS REJOIGNENT
//CHOISIR UNE CARD ET LENVOYER PAR API
//
//VERSER LA TUNE QUAND ILS GAGNENT
//REDIRIGER VERS L'ACCUEIL
function chooseCard(id){
    cardId=id;
    fetch('/game-service/room/'+roomId+"/card/"+id)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }else{
                showLoader("L'ennemi doit choisir sa carte. Veuillez patienter");
                status();
            }

        })
}

function loadCards() {
    fetch('/room-cards.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.body.innerHTML = data;

            let template = document.querySelector("#row");
            fetch('/card-service/card/user')
                .then(response => response.json())
                .then(cards => {
                    for (const card of cards) {
                        const clone = document.importNode(template.content, true);

                        clone.firstElementChild.innerHTML = clone.firstElementChild.innerHTML
                            .replace(/{{img_src}}/g, card.imageUrl).replace(/{{img_src}}/g, card.img_src)
                            .replace(/{{name}}/g, card.name)
                            .replace(/{{hp}}/g, card.hp)
                            .replace(/{{energy}}/g, card.energy)
                            .replace(/{{attack}}/g, card.attack)
                            .replace(/{{defense}}/g, card.defense)
                            .replace(/{{id}}/g, card.id)

                        let cardContainer = document.querySelector("#tableContent");
                        cardContainer.appendChild(clone);
                    }
                });

        })

}
