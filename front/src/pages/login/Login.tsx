import React, {FormEvent, useEffect, useState} from 'react';
import {NotificationType} from "../../core/components/notification/Notification";
import {useNotification} from "../../core/components/notification/NotificationContext";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {AppState} from "../../store/store";

export function Login() {
    const {showNotification} = useNotification();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/market');
            showNotification(NotificationType.WARNING, "Vous avez été redirigé vers la page de marché");
        }
    }, [isAuthenticated, navigate]);
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const authenticateApiUri = process.env.REACT_APP_API_AUTHENTICATE_URI;
        try {
            const userRegisterDTO = {
                email,
                password,
            };
            const response = await fetch(`${authenticateApiUri}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userRegisterDTO),
            });
            if (response.ok) {
                const userId = await response.text();
                dispatch({type: 'SET_AUTH', payload: {isAuthenticated: true, userId}});
                navigate('/market');
                showNotification(NotificationType.SUCCESS, "Connexion réussie");
            } else {
                response.text().then(errorMessage => showNotification(NotificationType.ERROR, `Connexion échouée :  ${errorMessage}`)
                );
            }
        } catch (error) {
            console.error('Erreur de réseau:', error);
        }
    };

    return (
        <div className="ui middle aligned center aligned grid"
             style={{margin: '10%', display: 'flex', justifyContent: 'center'}}>
            <div className="column">
                <h2 className="ui teal image header">
                    <div className="content">
                        Connexion à votre compte
                    </div>
                </h2>
                <form className="ui large form" onSubmit={handleSubmit}>
                    <div className="ui stacked segment">
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="user icon"></i>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Adresse E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="lock icon"></i>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button className="ui fluid large teal submit button" type="submit">Connexion</button>
                    </div>

                    <div className="ui error message"></div>
                </form>

                <div className="ui message">
                    Nouveau ? <a href="/register">Inscrivez-vous</a>
                </div>
            </div>
        </div>
    );
}
