import React from 'react';
import {Card} from '../../core/intefaces/card.interface';

export function Market() {
    const [cards, setCards] = React.useState([] as Card[]);

    React.useEffect(() => {
        fetch('/card-service/card')
            .then(response => response.json())
            .then((cards: Card[]) => setCards(cards));
    }, []);

    return (
        <div>
            <div id="header-container"></div>
            <div className="container">
                <div className="ui">
                    <div className="ten wide column">
                        <h3 className="ui aligned header"> Market</h3>
                        <table className="ui fixed selectable single line celled table" id="cardListId">
                            <thead>
                            <tr>
                                <th className="three wide">Name</th>
                                <th>Price</th>
                                <th>Hp</th>
                                <th>Energy</th>
                                <th>Defence</th>
                                <th>Attack</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cards.map(card => (
                                <tr key={card.id}>
                                    <td>
                                        <img className="ui avatar image" src={card.img_src} alt={card.name}/>
                                        <span>{card.name}</span>
                                    </td>
                                    <td>{card.price}</td>
                                    <td>{card.hp}</td>
                                    <td>{card.energy}</td>
                                    <td>{card.defense}</td>
                                    <td>{card.attack}</td>
                                    <td>
                                        <div className={`ui vertical blue animated button`}>
                                            <div className="hidden content">Buy</div>
                                            <div className="visible content">
                                                <i className="shop icon"></i>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="five wide column">
                        <div id="card"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
