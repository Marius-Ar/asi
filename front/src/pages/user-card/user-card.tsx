import React, {useEffect, useState} from 'react';
import {Card} from "../../core/interfaces/card.interface";
import {AppState} from "../../store/store";
import {useSelector} from "react-redux";
import CardTable from "../../core/components/card/CardTable";
import {fetchUserCards} from "../../core/api/ApiCard";

export const CardList: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const userId = useSelector((state: AppState) => state.auth.userId);
    useEffect(() => {
        if (userId) {
            fetchUserCards(userId)
                .then(setCards)
                .catch(error => console.error('Error fetching cards:', error));
        }
    }, [userId]);


    return (
        <div className="ui container">
            <div className="ui ten wide column">
                <h3 className="ui aligned header">My Card List</h3>
                <CardTable cards={cards} action={'sell'}/>
            </div>
        </div>
    );
};
