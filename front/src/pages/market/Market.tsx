import React, {useEffect, useState} from 'react';
import {Card} from '../../core/interfaces/card.interface';
import CardTable from "../../core/components/card/CardTable";
import ApiStore from "../../core/api/ApiStore";
import {useSelector} from "react-redux";
import {AppState} from "../../store/store";

export function Market() {
    const [cards, setCards] = useState<Card[]>([]);
    const userId = useSelector((state: AppState) => state.auth.userId);

    useEffect(() => {
        if (userId) {
            ApiStore.fetchMarketCards()
                .then(setCards)
                .catch(error => {
                    console.error('Error fetching market cards:', error);
                });
        }
    }, []);
    const removeCardFromList = (cardId: number) => {
        setCards(prevCards => prevCards.filter(card => card.id !== cardId));
    };

    return (

        <div className="ui container">
            <div className="ui ten wide column">
                <h3 className="ui aligned header">Market</h3>
                <CardTable cards={cards} action={'buy'} onCardRemoved={removeCardFromList}/>
            </div>

        </div>
    );
}
