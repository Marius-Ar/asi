import React from 'react';
import './css/semantic/semantic.min.css';
import './css/custom.css';
import {Card} from '../../intefaces/card.interface';

export function CardComponent({ card }: { card: Card }) {
    const buyCard = () => {
        console.log("buy card")
    }

    return (
        <div>
            <div id="header-container"></div>

            <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
                <div className="ui segment">
                    <div className="ui special cards">
                        <div id="content" className="card" style={{ width: '50vh', height: '70vh' }}>
                            <div className="image imageCard">
                                <div className="ui fluid image">
                                    <a id="card_id" className="ui left corner label">{card.name}</a>
                                    <img style={{ maxHeight: '40vh' }} id="card_image" src={card.img_src} alt={card.name} />
                                </div>
                            </div>
                            <div className="content">
                                <div className="ui form tiny">
                                    <div className="field">
                                        <label id="cardNameId">{card.name}</label>
                                        <textarea id="card_description" className="overflowHiden" readOnly style={{ maxHeight: '30vh' }}>{card.description}</textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="content">
                                <i className="heart outline icon"></i><span id="card_hp"> {card.hp}</span>
                                <div className="right floated ">
                                    <span id="card_energy">{card.energy}</span>
                                    <i className="lightning icon"></i>
                                </div>
                            </div>
                            <div className="content">
                                <span className="right floated">
                                    <span id="card_attack"> {card.attack}</span>
                                    <i className="wizard icon"></i>
                                </span>
                                <i className="protect icon"></i>
                                <span id="card_defense">{card.defense}</span>
                            </div>
                            <div className="row">
                                <div className="column ui bottom attached button green" onClick={() => buyCard()}>
                                    <i className="money icon"></i>
                                    Acheter <span id="card_price"> {card.price}</span>
                                </div>
                                <div className="column  ui bottom attached button blue">
                                    <a style={{ color: 'white' }} href="market.html">Retour</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="notificationModal" style={{ display: 'none' }}>
                <div id="notificationContent" className="notification-content">
                    <h2 id="notificationTitle"></h2>
                    <p id="notificationDescription"></p>
                </div>
            </div>
        </div>
    );
}

export default CardComponent;
