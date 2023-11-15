import React from 'react';
import {AppState} from "../../../store/store";
import {useDispatch, useSelector} from "react-redux";

export function Header() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);

    const handleLogout = () => {
        dispatch({type: 'SET_AUTH', payload: {isAuthenticated: false, userId: null}});
        localStorage.removeItem('auth');
    };

    if (!isAuthenticated) {
        return null;
    }
    return (
        <header className="ui clearing segment" style={{marginBottom: '1%'}}>
            <div className="ui right floated header">
                <div className="content" id="header" style={{display: 'flex', alignItems: 'center'}}>
                    <i className="user circle outline icon"></i>
                    <span id="userNameId" style={{marginRight: '10px'}}>{'John Doe'}</span>
                    <button onClick={handleLogout} className="red ui icon button">
                        <i className="sign out alternate icon"></i>
                    </button>
                </div>
                <div className="sub header"><span>{100}</span>$</div>
            </div>
            <h3 className="ui left floated header">
                <i className="money icon"></i>
                <div className="content">
                    <div className="sub header"><a href="/market"> Market</a></div>
                </div>
            </h3>
            <h3 className="ui left floated header">
                <i className="book icon"></i>
                <div className="content">
                    <div className="sub header"><a href="/user-card">My Cards</a> </div>
                </div>
            </h3>
            <h3 className="ui left floated header">
                <i className="gamepad icon"></i>
                <div className="content">
                    <div className="sub header"><a href="/game/join">Game</a> </div>
                </div>
            </h3>
        </header>
    );
}
