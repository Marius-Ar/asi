import {useEffect, useState} from 'react';
import {fetchUserCards} from '../../../core/api/ApiCard';
import {useSelector} from 'react-redux';
import {AppState} from '../../../store/store';
import {Card} from '../../../core/interfaces/card.interface';

export function ChooseCards() {
    const [cards, setCards] = useState<Card[]>([]);

    const userId = useSelector((state: AppState) => state.auth.userId);
    useEffect(() => {
        if (userId) {
            fetchUserCards(userId)
                .then(setCards)
                .catch(error => console.error('Error fetching cards:', error));
        }
    }, []);

    function endChoose() {

        window.location.href = '/game/play';
    }

    return (
        <>
            <ul>
                {cards && cards.map(card => (
                    <li key={card.id}>
                        <input type="checkbox"
                               id={'card' + card.id.toString()}
                        />
                        <p>{card.name}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}