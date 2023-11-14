import React, {useEffect, useState} from 'react';
import {Card} from "../../core/intefaces/card.interface";
import {AppState} from "../../store/store";
import {useSelector} from "react-redux";

export const CardList: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const cardApiUri = process.env.REACT_APP_API_CARD_SERVICE;
    const userId = useSelector((state: AppState) => state.auth.userId);
    useEffect(() => {
        fetch(`${cardApiUri}user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        })

            .then(response => response.json())
            .then(data => setCards(data));
    }, [userId, cardApiUri]);

    const sellCard = async (cardIdToSell: number) => {
        // Logique de vente de la carte
    };

    return (
        <div className="ui container">
            <div className="ui ten wide column">
                <h3 className="ui aligned header">My Card List</h3>
                <table className="ui fixed selectable single line celled table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        {/* ... autres en-têtes ... */}
                    </tr>
                    </thead>
                    <tbody>
                    {cards.map(card => (
                        <tr key={card.id}>
                            <td>
                                <img className="ui avatar image" src={card.img_src} alt={card.name}/>
                                <span>{card.name}</span>
                            </td>
                            <td>{card.description}</td>
                            {/* ... autres colonnes ... */}
                            <td>
                                <button onClick={() => sellCard(card.id)} className="ui vertical blue animated button">
                                    <div className="hidden content">Sell</div>
                                    <div className="visible content">
                                        <i className="shop icon"></i>
                                    </div>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
