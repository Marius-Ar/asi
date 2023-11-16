import {Card} from "../interfaces/card.interface";


export const fetchUserCards = async (userId: string): Promise<Card[]> => {
    const cardApiUri = process.env.REACT_APP_API_CARD_URI;
    const response = await fetch(`${cardApiUri}user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user cards');
    }

    return response.json();
};
