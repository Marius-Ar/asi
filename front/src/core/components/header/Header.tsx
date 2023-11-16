import React, {useEffect} from 'react';
import {AppState} from "../../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {setUserDetails} from "../../../store/userDetailReducer";
import {Link} from "react-router-dom";

export function Header() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);
    const userId = useSelector((state: AppState) => state.auth.userId);
    const userDetails = useSelector((state: AppState) => state.userDetail.userDetails);
    const userApiUri = process.env.REACT_APP_API_USER_URI;

    useEffect(() => {
        if (isAuthenticated && userId && !userDetails) {
            const storedUserDetails = localStorage.getItem('userDetails');
            if (storedUserDetails) {
                dispatch(setUserDetails(JSON.parse(storedUserDetails)));
            } else {
                fetch(`${userApiUri}details`, {
                    credentials: "include"
                })
                    .then(response => response.json())
                    .then(userDetailsJson => {
                        localStorage.setItem('userDetails', JSON.stringify(userDetailsJson));
                        localStorage.removeItem('userDetails');
                        dispatch(setUserDetails(userDetailsJson));
                    });
            }
        }
    }, [isAuthenticated, userId, dispatch]);
    const handleLogout = () => {
        dispatch({type: 'SET_AUTH', payload: {isAuthenticated: false, userId: null}});
        document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    };

    if (!isAuthenticated) {
        return null;
    }
    return (
        <header className="ui clearing segment" style={{marginBottom: '1%'}}>
            <div className="ui right floated header">
                <div className="content" id="header" style={{display: 'flex', alignItems: 'center'}}>
                    <i className="user circle outline icon"></i>
                    <span id="userNameId"
                          style={{marginRight: '10px'}}>        {userDetails ? userDetails.username : 'Loading...'}</span>
                    <button onClick={handleLogout} className="red ui icon button">
                        <i className="sign out alternate icon"></i>
                    </button>
                </div>
                <div
                    className="sub header"><span>                        {userDetails ? userDetails.balance : 'Loading...'}
</span>$
                </div>
            </div>
            <h3 className="ui left floated header">
                <i className="money icon"></i>
                <div className="content">
                    <div className="sub header"><Link to={"market"}> Market</Link></div>
                </div>
            </h3>
            <h3 className="ui left floated header">
                <i className="book icon"></i>
                <div className="content">
                    <div className="sub header"><Link to={"/user-card"}>My Cards</Link></div>
                </div>
            </h3>
            <h3 className="ui left floated header">
                <i className="gamepad icon"></i>
                <div className="content">
                    <div className="sub header"><Link to={"/game/join"}>Game</Link></div>
                </div>
            </h3>
        </header>
    );
}
