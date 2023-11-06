export function Login() {
    return (
        <div className="ui middle aligned center aligned grid" style={{ margin: '10%', display: 'flex', justifyContent: 'center' }}>
            <div className="column">
                <h2 className="ui teal image header">
                    <div className="content">
                        Connexion a votre compte
                    </div>
                </h2>
                <form className="ui large form">
                    <div className="ui stacked segment">
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="user icon"></i>
                                <input type="text" id="email" name="email" placeholder="Adresse E-mail" />
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="lock icon"></i>
                                <input type="password" id="password" name="password" placeholder="Mot de passe" />
                            </div>
                        </div>
                        <div className="ui fluid large teal submit button">Connexion</div>
                    </div>

                    <div className="ui error message"></div>
                </form>

                <div className="ui message">
                    Nouveau? <a href="/register.html">Inscrivez-vous</a>
                </div>
            </div>
        </div>
    )
}