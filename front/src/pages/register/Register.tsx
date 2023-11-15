import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {NotificationType} from "../../core/components/notification/Notification";
import {useNotification} from "../../core/components/notification/NotificationContext";

export function Register() {
    const {showNotification} = useNotification();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        // Vérifications de base
        if (formData.password !== formData.passwordConfirmation) {
            setErrorMessage('Les mots de passe ne correspondent pas.');
            return;
        }

        const userRegisterApiUri = process.env.REACT_APP_API_AUTHENTICATE_URI;

        try {
            const response = await fetch(`${userRegisterApiUri}register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate('/login');
                showNotification(NotificationType.SUCCESS, "Création réussie mais n'oublie pas que tu es nul Alex.");
            } else {
                const errorText = await response.text();
                setErrorMessage('Erreur lors de l\'inscription: ' + errorText);

            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Erreur de réseau ou du serveur.');
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
