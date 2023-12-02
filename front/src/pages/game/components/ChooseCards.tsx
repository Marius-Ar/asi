import {FormEvent, useEffect, useState} from 'react';
import {fetchUserCards} from '../../../core/api/ApiCard';
import {useSelector} from 'react-redux';
import {AppState} from '../../../store/store';
import {Card} from '../../../core/interfaces/card.interface';
import {io} from 'socket.io-client';

export function ChooseCards() {
    const socket = io('http://localhost:3001');

    const [cards, setCards] = useState<Card[]>([]);
    const MAX_CARD_COUNT = 4;

    const userId = useSelector((state: AppState) => state.auth.userId);
    useEffect(() => {
        if (userId) {
            fetchUserCards(userId)
                .then(setCards)
                .catch(error => console.error('Error fetching cards:', error));
        }
    }, []);

    function onCardSelected(event: FormEvent<HTMLInputElement>, cardId: number) {
        const checkbox = event.target as HTMLInputElement;
        const cardsCopy = [...cards];
        const selectedCard = cardsCopy.find(card => card.id === cardId);
        if (selectedCard) {
            selectedCard.selected = checkbox.checked;
        }
        setCards(cardsCopy);
    }

    function isCardDisabled(cardId: number): boolean {
        const selectedCardsIds = getSelectedCardsIds();
        const isCardSelected = selectedCardsIds.includes(cardId);
        return !isCardSelected && selectedCardsIds.length >= MAX_CARD_COUNT;
    }

    function isConfirmDisabled(): boolean {
        return getSelectedCardsIds().length !== MAX_CARD_COUNT;
    }

    function onConfirm() {
        socket.emit('chose', {userId, cardIds: getSelectedCardsIds()});
        window.location.href = '/game/fight';
    }

    function getSelectedCardsIds(): number[] {
        return cards.filter(card => card.selected).map(card => card.id);
    }

    return (
        <>
            <ul>
                {cards && cards.map(card => (
                    <li key={card.id}>
                        <input type="checkbox"
                               onInput={event => onCardSelected(event, card.id)}
                               disabled={isCardDisabled(card.id)}
                               id={'card' + card.id}
                        />
                        <p>{card.name}</p>
                    </li>
                ))}
            </ul>
            <button disabled={isConfirmDisabled()}
                onClick={() => onConfirm()}
            >Confirm</button>
        </>
    )
}