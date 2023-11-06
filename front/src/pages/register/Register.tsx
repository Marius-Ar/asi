import React, {ChangeEvent, FormEvent, useState} from 'react';
import {redirect} from 'react-router-dom';

export function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (formData.password !== formData.passwordConfirmation) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }
        if (formData.username.length < 3) {
            alert('Le nom d\'utilisateur doit contenir au moins 3 caractères.');
            return;
        }
        if (formData.password.length < 6) {
            alert('Le mot de passe doit contenir au moins 6 caractères.');
            return;
        }

        try {
            const response = await fetch('/user-service/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 200) {
                setErrorMessage('');
                return redirect('/connexion');
            } else {
                setErrorMessage('Erreur lors de l\'inscription: ' + await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="ui container" style={{margin: '10%'}}>
            <h2 className="ui header">Inscription</h2>
            <form className="ui form" id="register-form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Nom d'utilisateur</label>
                    <input type="text" name="username" placeholder="Nom d'utilisateur" required
                           onChange={handleInputChange}/>
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Email" required onChange={handleInputChange}/>
                </div>
                <div className="field">
                    <label>Mot de passe</label>
                    <input type="password" name="password" placeholder="Mot de passe" required
                           onChange={handleInputChange}/>
                </div>
                <div className="field">
                    <label>Confirmation du mot de passe</label>
                    <input type="password" name="passwordConfirmation" placeholder="Confirmation du mot de passe"
                           required onChange={handleInputChange}/>
                </div>
                <div className="field">
                    <p id="error-message" className="ui red message"
                       style={{display: errorMessage ? '' : 'none'}}>{errorMessage}</p>
                </div>
                <button className="ui button" type="submit">Inscription</button>
            </form>
        </div>
    );
}
