 function showNotification(title, description, color) {
    return new Promise(resolve => {
        let modal = document.getElementById('notificationModal');
        let content = document.getElementById('notificationContent');
        let titleElement = document.getElementById('notificationTitle');
        let descriptionElement = document.getElementById('notificationDescription');

        titleElement.innerText = title;
        descriptionElement.innerText = description;
        content.style.backgroundColor = color;

        modal.style.display = 'block';
        setTimeout(function() {
            modal.style.transform = 'translate(-50%, 0)';
        }, 1);

        setTimeout(function() {
            modal.style.transform = 'translate(-50%, 100%)';
            setTimeout(function() {
                modal.style.display = 'none';
                resolve();
            }, 300);
        }, 3000);

    })

}
 function getCard(id,htmlId,marketItemDisable=false,content) {

     fetch('/card-service/card/' + id)
         .then(response => response.json())
         .then(marketItem => {
             fillCard(marketItem,htmlId,marketItemDisable,content);
         });

 }
 function showLoader(message) {
     $('body').empty();
     $.get('loader.html', function(data) {
         var $html = $(data);
         $html.find('.ui.text.loader').text(message);
         $('body').append($html);
     });
 }
 function fillCard(card,htmlId,marketItemDisable=false,content){

     let template = document.querySelector(htmlId); // Access the template's content
     let clone = document.importNode(template.content, true);
     console.log("c'est la card",card);
     clone.firstElementChild.innerHTML = clone.firstElementChild.innerHTML
         .replace(/{{img_src}}/g, card.imageUrl)
         .replace(/{{img_src}}/g, card.imageUrl)
         .replace(/{{name}}/g, card.name)
         .replace(/{{description}}/g, card.description)
         .replace(/{{hp}}/g, card.hp)
         .replace(/{{energy}}/g, card.energy)
         .replace(/{{attack}}/g, card.attack)
         .replace(/{{defense}}/g, card.defense)
         .replace(/{{id}}/g, card.id)
     if(!marketItemDisable){
         clone.querySelector("#card_price").textContent = " " + marketItem.price;
     }
     let cardContainer = document.querySelector(content);
     cardContainer.appendChild(clone);

 }
