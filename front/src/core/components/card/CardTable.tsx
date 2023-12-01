import React, {useState} from 'react';
import {Card} from "../../interfaces/card.interface";
import ApiStore from "../../api/ApiStore";
import {Button, Input, Modal} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../store/store";
import {useNotification} from "../notification/NotificationContext";
import {NotificationType} from "../notification/Notification";
import {adjustUserBalance} from "../../../store/userDetailReducer";

const CardTable = (props: { cards: Card[]; action: string, onCardRemoved: (cardId: number) => void }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [price, setPrice] = useState('');
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
    const [priceError, setPriceError] = useState<string | null>(null);
    const userId = useSelector((state: AppState) => state.auth.userId);
    const {showNotification} = useNotification();
    const dispatch = useDispatch();

    const openModal = (cardId: number) => {
        const selectedCard = props.cards.find(card => card.id === cardId);
        setSelectedCardId(cardId);
        setIsModalOpen(true);
        setPriceError(null);
        if (props.action === 'buy' && selectedCard && selectedCard.price) {
            setPrice(selectedCard.price.toString());
        }
    };

    const handlePriceSubmit = async () => {
        if (selectedCardId != null) {
            const parsedPrice = parseFloat(price);
            if (!isNaN(parsedPrice) && parsedPrice > 0) {
                try {
                    if (props.action === 'sell') {
                        await ApiStore.sellCard({id: selectedCardId, price: parseFloat(price)});
                        props.onCardRemoved(selectedCardId);

                    } else {
                        const selectedCard = props.cards.find(card => card.id === selectedCardId);
                        if (selectedCard && selectedCard.storeListingId) {
                            try {
                                await ApiStore.buyCard(selectedCard.storeListingId)
                                dispatch(adjustUserBalance(-parsedPrice));
                                props.onCardRemoved(selectedCardId);

                            } catch (error: any) {
                                console.error('Error during the transaction:', error);
                                showNotification(NotificationType.ERROR, error.message);
                            }
                        }
                    }
                    setIsModalOpen(false);
                    setPrice('');
                } catch (error) {
                    console.error('Error during the transaction:', error);
                }
            } else {
                setPriceError('Veuillez entrer un prix valide supérieur à 0.');
            }
        }
    };

    return (
        props.cards && props.cards.length > 0 ? (
            <div>

                <table className="ui fixed selectable single line celled table">
                    <thead>
                    <tr>
                        <th className="three wide">Name</th>
                        {props.action === 'sell' ? '' : <th>Price</th>}
                        <th>Hp</th>
                        <th>Energy</th>
                        <th>Defence</th>
                        <th>Attack</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.cards.map(card => (
                        <tr key={props.action === 'sell' ? card.id : card.storeListingId}>
                            <td>
                                <img className="ui avatar image" src={card.imageUrl} alt={card.name}/>
                                <span>{card.name}</span>
                            </td>
                            {props.action === 'sell' ? '' : <td>{card.price}</td>}
                            <td>{card.hp}</td>
                            <td>{card.energy}</td>
                            <td>{card.defense}</td>
                            <td>{card.attack}</td>
                            <td>
                                <button onClick={() => openModal(card.id)}
                                        disabled={props.action === 'buy' && card.sellerId === userId}
                                        className="ui vertical blue animated button">
                                    <div
                                        className="hidden content"> {props.action.toUpperCase()}</div>
                                    <div className="visible content">
                                        <i className={props.action === 'sell' ? "dollar sign icon" : "shopping cart icon"}></i>
                                    </div>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <Modal.Header>{props.action === 'sell' ? 'Vendre la carte' : 'Acheter la carte'}</Modal.Header>
                    <Modal.Content>
                        <Input
                            type="number"
                            placeholder="Entrez le prix"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            error={!!priceError}
                            readOnly={props.action === 'buy'}
                        />
                        {priceError && <div style={{color: 'red', marginTop: '10px'}}>{priceError}</div>}
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={handlePriceSubmit}>Soumettre</Button>
                    </Modal.Actions>
                </Modal>
            </div>


        ) : (
            <div className="ui container">
                <div className="ui placeholder segment">
                    <div className="ui icon header">
                        <i className="search icon"></i>
                        Aucune {props.action === 'sell' ? "carte" : "transaction"} pour le moment.
                    </div>
                </div>
            </div>
        )
    );

};

export default CardTable;

