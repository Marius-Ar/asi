import React from 'react';
import {Card} from "../../interfaces/card.interface";

export function CardDetail({card}: { card: Card }){
    return (
        <div className="ui special cards">
            <div className="card">
                <div className="content">
                    <div className="ui grid">
                        <div className="three column row">
                            <div className="column">
                                <i className="heart outline icon"></i><span>{card.hp.toFixed(1)}</span>
                            </div>
                            <div className="column">
                                <h5>{card.name}</h5>
                            </div>
                            <div className="column">
                                <span>{card.energy.toFixed(1)}</span> <i className="lightning icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="image imageCard">
                    <div className="blurring dimmable image">
                        <div className="ui inverted dimmer">
                            <div className="content">
                                <div className="center">
                                    <div className="ui primary button">Add Friend</div>
                                </div>
                            </div>
                        </div>
                        <div className="ui fluid image">
                            <a className="ui left corner label">
                                {card.name}
                            </a>
                            <img className="ui centered image" src={card.imageUrl} alt={card.name}/>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="ui form tiny">
                        <div className="field">
                            <label>{card.name}</label>
                            <textarea className="overflowHiden" readOnly rows={2}>
                                {card.description}
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <i className="heart outline icon"></i> HP {card.hp.toFixed(1)}
                    <div className="right floated">
                        Energy {card.energy.toFixed(1)}
                        <i className="lightning icon"></i>
                    </div>
                </div>
                <div className="content">
                    <span className="right floated">
                        Attack {card.attack}
                        <i className="wizard icon"></i>
                    </span>
                    <i className="protect icon"></i>
                    Defense {card.defense}
                </div>
            </div>
        </div>
    );
};

export default CardDetail;