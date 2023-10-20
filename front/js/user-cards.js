
    let template = document.querySelector("#row");
    fetch('/card-service/card/user')
        .then(response => response.json())
        .then(cards => {
            for (const card of cards) {
                const clone = document.importNode(template.content, true);

                clone.firstElementChild.innerHTML = clone.firstElementChild.innerHTML
                    .replace(/{{img_src}}/g, card.imageUrl)
                    .replace(/{{family_name}}/g, card.familyName)
                    .replace(/{{img_src}}/g, card.img_src)
                    .replace(/{{name}}/g, card.name)
                    .replace(/{{description}}/g, card.description)
                    .replace(/{{hp}}/g, card.hp)
                    .replace(/{{energy}}/g, card.energy)
                    .replace(/{{attack}}/g, card.attack)
                    .replace(/{{defense}}/g, card.defense)
                    .replace(/{{id}}/g, card.id)
                    .replace(/{{price}}/g, card.actualValue);

                let cardContainer = document.querySelector("#tableContent");
                cardContainer.appendChild(clone);
            }
        });



async function sellCard(cardIdToSell){
    let price = window.prompt("Veuillez entrer le prix auquel vous voulez vendre:", "");
    if (Number(price) > 0) {
        fetch('/market-service/market/sell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: cardIdToSell,
                price: price
            })
        })
            .then(async response => {
                if (response.ok) {
                    // Si la requête a réussi, supprimer la ligne du tableau
                    document.getElementById(cardIdToSell).parentNode.parentNode.remove();
                    await showNotification("Vente de carte","La carte a bien été mise sur le marché.","green")
                    return response.json();
                } else {
                    showNotification("Vente de carte","Erreur lors de la vente de la carte.","red")
                }
            })

    } else {
        window.alert("La quantité doit être supérieure à zéro");
    }
}

