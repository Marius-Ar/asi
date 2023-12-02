import {FormEvent, useEffect, useState} from 'react';
import {fetchUserCards} from '../../../core/api/ApiCard';
import {useSelector} from 'react-redux';
import {AppState} from '../../../store/store';
import {Card} from '../../../core/interfaces/card.interface';
import {io} from 'socket.io-client';

export function ChooseCards() {
    const socket = io('http://localhost:3001');
    const userDetails = useSelector((state: AppState) => state.userDetail.userDetails);
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

    function onCardSelected(event: FormEvent<HTMLInputElement>, cardSelected: Card) {
        const checkbox = event.target as HTMLInputElement;
        const cardsCopy = [...cards];
        const selectedCard = cardsCopy.find(card => card.id === cardSelected.id);
        if (selectedCard) {
            selectedCard.selected = checkbox.checked;
        }
        setCards(cardsCopy);
    }

    function isCardDisabled(card:Card): boolean {
        const selectedCardsIds = getSelectedCardsIds();
        const isCardSelected = selectedCardsIds.includes(card);
        return !isCardSelected && selectedCardsIds.length >= MAX_CARD_COUNT;
    }

    function isConfirmDisabled(): boolean {
        return getSelectedCardsIds().length !== MAX_CARD_COUNT;
    }

    function onConfirm() {
        var username = userDetails!.username;
        socket.emit('chose', {userId, username, cardIds: getSelectedCardsIds()});
        window.location.href = '/game/fight';
    }

    function getSelectedCardsIds(): Card[] {
        return cards.filter(card => card.selected).map(card => card);
    }

    return (
        <>
            <ul>
                {cards && cards.map(card => (
                    <li key={card.id}>
                        <input type="checkbox"
                               onInput={event => onCardSelected(event, card)}
                               disabled={isCardDisabled(card)}
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