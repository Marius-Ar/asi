import React from 'react';

export function Header() {
    return (
        <header className="ui clearing segment" style={{ marginBottom: '1%' }}>
            <h3 className="ui right floated header">
                <i className="user circle outline icon"></i>
                <div className="content" id="header">
                    <span id="userNameId">{'John Doe'}</span>
                    <div className="sub header"><span>{100}</span>$</div>
                </div>
            </h3>

            <h3 className="ui left floated header">
                <i className="money icon"></i>
                <div className="content">
                    Market
                    <div className="sub header"><a href="/market"> Market</a></div>
                </div>
            </h3>

            <h3 className="ui left floated header">
                <i className="book icon"></i>
                <div className="content">
                    My cards
                    <div className="sub header"><a href="/user-cards">My Cards</a> </div>
                </div>
            </h3>
        </header>
    );
}
