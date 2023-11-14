import React from 'react';
import {Card} from "../../intefaces/card.interface";

const CardShort: React.FC<Card> = (card) => {
    return (
        <div className="ui special cards">
            <div className="card">

                <div className="content">
                    <div className="ui grid">
                        <div className="three column row">
                            <div className="column">
                                <a className="ui red circular label">{card.hp}</a>
                            </div>
                            <div className="column" >
                                <h5>DEADPOOL</h5>
                            </div>
                            <div className="column">
                                <a className="ui yellow circular label">{card.attack}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="image imageCard">
                    <div className="ui fluid image">
                        <img id="cardImgId" className="ui centered image" src="https://static.hitek.fr/img/actualite/2017/06/27/i_deadpool-2.jpg"/>
                    </div>
                </div>
            </div>

        </div>


)
}

export default CardShort;