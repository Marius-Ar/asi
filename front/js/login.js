$(document)
    .ready(function() {
        $('.ui.form')
            .form({
                fields: {
                    email: {
                        identifier  : 'email',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Veuillez entrer votre e-mail'
                            },
                            {
                                type   : 'email',
                                prompt : 'Veuillez entrer un e-mail valide'
                            }
                        ]
                    },
                    password: {
                        identifier  : 'password',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Veuillez entrer votre mot de passe'
                            },
                            {
                                type   : 'length[8]',
                                prompt : 'Votre mot de passe doit comporter au moins 8 caracteres'
                            }
                        ]
                    }
                },
                onSuccess: function(event, fields) {
                    event.preventDefault(); // Prevent form from submitting normally

                    fetch('/user-service/user/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(fields)
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        window.location = "/user-cards.html"
                        return response.json();
                    }).then(data => {
                        console.log('Success:', data);
                    }).catch((error) => {
                        console.error('Error:', error);
                    });
                }
            });
    });
