import './ChooseCards.css';
import React, {useEffect, useState} from 'react';
import {fetchUserCards} from '../../../core/api/ApiCard';
import {useSelector} from 'react-redux';
import {AppState} from '../../../store/store';
import {Card} from '../../../core/interfaces/card.interface';
import {useNavigate} from 'react-router-dom';
import CardDetail from '../../../core/components/card-detail/CardDetail';

export function ChooseCards() {
    const MAX_CARD_COUNT = 3;

    const [cards, setCards] = useState<Card[]>([]);

    const navigate = useNavigate();
    const userDetails = useSelector((state: AppState) => state.userDetail.userDetails);
    const userId = useSelector((state: AppState) => state.auth.userId);
    const socket = useSelector((state: any) => state.socket.socket);
    const selectedCards = [];

    useEffect(() => {
        if (userId) {
            fetchUserCards(userId)
                .then(setCards)
                .catch(error => console.error('Error fetching cards:', error));
        }
    }, []);

    function onCardSelected(selectedCard: Card) {
        const cardsCopy = [...cards];
        const foundCard = cardsCopy.find(card => card.id === selectedCard.id);
        if (foundCard) {
            foundCard.selected = !foundCard.selected;
            setCards(cardsCopy);
        }
    }

    function isCardDisabled(card: Card): boolean {
        const selectedCardsIds = getSelectedCards();
        const isCardSelected = selectedCardsIds.includes(card);
        return !isCardSelected && selectedCardsIds.length >= MAX_CARD_COUNT;
    }

    function isConfirmDisabled(): boolean {
        return getSelectedCards().length !== MAX_CARD_COUNT;
    }

    function onConfirm() {
        const username = userDetails!.username;
        socket.emit('chose', {userId, username, cards: getSelectedCards()});
        navigate('/game/fight');
    }

    function getSelectedCards(): Card[] {
        return cards.filter(card => card.selected).map(card => card);
    }

    function getSelectedCardClass(card: Card): string {
        return !!cards.find(c => c.id === card.id && c.selected) ? 'selected' : '';
    }

    return (
        <>
            <h1>Choose {MAX_CARD_COUNT} cards</h1>
            <div className="flex-box">
                {cards && cards.map(card => (
                    <div key={card.id} onClick={() => onCardSelected(card)} className={'card ' + getSelectedCardClass(card)} >
                        <CardDetail card={card}/>
                    </div>
                ))}
            </div>
            <button className="huge ui primary button"
                    disabled={isConfirmDisabled()}
                    onClick={() => onConfirm()}
            >Confirm</button>
        </>
    )
}