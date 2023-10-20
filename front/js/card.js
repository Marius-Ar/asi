const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('market_id');
getCard(id);

function getCard(id) {

    const promises = [
        fetch("/market-service/market/" + id).then(response => response.json()),
        fetch("/card-service/card").then(response => response.json())
    ];

    Promise.all(promises).then(([marketItem, cards]) => {
            let template = document.querySelector("#row").content; // Access the template's content
            let clone = document.importNode(template, true); // Deep clone the template's content
            let card = cards.find(card => card.id === marketItem.cardId);
            clone.querySelector("#card_id").textContent = card.name;
            clone.querySelector("#card_image").src = card.imageUrl;
            clone.querySelector("#card_description").textContent = card.description;
            clone.querySelector("#card_hp").textContent = " " + card.hp;
            clone.querySelector("#card_energy").textContent = " " + card.energy;
            clone.querySelector("#card_attack").textContent = " " + card.attack;
            clone.querySelector("#card_defense").textContent = card.defense;
            clone.querySelector("#card_price").textContent = " " + marketItem.price;
            let cardContainer = document.querySelector("#content");
            cardContainer.appendChild(clone);
        })
        .catch(error => {
            console.error('Error:', error);
            // window.location = "/market.html"
        });
}

async function  buyCard() {
    let cardIdToBuy = 1;  // remplacer par l'ID de la carte que vous voulez acheter

    fetch('/market-service/market/buy/'+cardIdToBuy, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: cardIdToBuy,
        })
    })
        .then(response => response.json())
        .then(async (marketListing) => {
            console.log(marketListing);
            await showNotification("Achat de carte", "l'achat s'est bien déroulé.", "green");
            window.location ="/user-cards.html";
        })
        .catch(async (error) => {
            console.error('Error:', error);
            await showNotification("Achat de carte", "Il semble qu'il y ait un problème .. redirection", "red");
            window.location= "/user-cards.html";
        });
}
