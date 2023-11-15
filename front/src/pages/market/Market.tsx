import React from 'react';
import {Card} from '../../core/interfaces/card.interface';
import CardTable from "../../core/components/card/CardTable";
import {fetchMarketCards} from "../../core/api/ApiCard";

export function Market() {
    const [cards, setCards] = React.useState([] as Card[]);

    React.useEffect(() => {
        fetchMarketCards()
            .then(setCards)
            .catch(error => {
                console.error('Error fetching cards:', error);
            });
    }, []);

    return (

        <div className="ui container">
            <div className="ui ten wide column">
                <h3 className="ui aligned header">Market</h3>
                <CardTable cards={cards} action={'buy'}/>
            </div>
            <div className="five wide column">
                <div id="card"></div>
            </div>
        </div>
    );
}
