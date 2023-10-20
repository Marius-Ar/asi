const header = document.querySelector("#header")


window.addEventListener('DOMContentLoaded', (event) => {
    fetch('/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            const header = document.querySelector("#header")
            fetch("/user-service/user")
                .then(response => {
                    console.log("yo",response.status)
                    console.log("yo",response)
                    if (response.status==403){
                        window.location="/connexion.html"
                    }
                    response.json().then(data => {
                        console.log(data)
                        header.innerHTML = header.innerHTML
                            .replace(/{{username}}/g, data.username)
                            .replace(/{{balance}}/g, data.balance);

                    });
                })

        });

});

