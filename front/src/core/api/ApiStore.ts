import {CardSell} from "../interfaces/card-sell.interface";

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
}
