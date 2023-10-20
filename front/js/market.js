const template = document.querySelector("#row");
const promises = [
    fetch("/market-service/market/listings").then(response => response.json()),
    fetch("/card-service/card").then(response => response.json())
];

Promise.all(promises)
    .then(([listings, cards]) => {
        console.log(listings);
        for (const listing of listings) {
            const card = cards.find(card => card.id === listing.cardId)
            const clone = template.content.cloneNode(true);
            clone.firstElementChild.innerHTML = clone.firstElementChild.innerHTML
                .replace(/{{name}}/g, card.name)
                .replace(/{{img_src}}/g, card.imageUrl)
                .replace(/{{price}}/g, listing.price)
                .replace(/{{hp}}/g, card.hp)
                .replace(/{{energy}}/g, card.energy)
                .replace(/{{defense}}/g, card.defense)
                .replace(/{{attack}}/g, card.attack);
            clone.querySelector(".button#buy").addEventListener("click", () => {
                window.location.href = "/card.html?market_id=" + listing.id;
            });
            document.querySelector("#tableContent").appendChild(clone);
        }
    });
