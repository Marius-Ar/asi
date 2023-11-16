import {CardSell} from "../interfaces/card-sell.interface";
import {MarketCard} from "../interfaces/market-card.interface";

export default class ApiStore {
    private static storeApiUri: string | undefined = process.env.REACT_APP_API_STORE_URI

    static sellCard = async (cardSell: CardSell) => {

        fetch(`${ApiStore.storeApiUri}sell`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(cardSell)
        }).then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Something went wrong ...')
                }
            }
        )
    };
    static fetchMarketCards = async (): Promise<MarketCard[]> => {
        const response = await fetch(`${ApiStore.storeApiUri}listing`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        if (!response.ok) {
            throw new Error('Failed to fetch user cards');
        }

        return response.json();
    };
    static buyCard = async (listingId: number) => {
        const response = await fetch(`${ApiStore.storeApiUri}buy/${listingId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        if (!response.ok) {

            throw new Error('Failed to fetch user cards');
        }
        return response.json();
    }
}
