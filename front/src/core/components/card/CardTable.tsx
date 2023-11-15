import React, {useState} from 'react';
import {Card} from "../../interfaces/card.interface";
import ApiStore from "../../api/ApiStore";
import {Button, Modal} from "semantic-ui-react";

const CardTable = (props: { cards: Card[]; action: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [price, setPrice] = useState('');
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

    const openModal = (cardId: number) => {
        setSelectedCardId(cardId);
        setIsModalOpen(true);
    };

    const handlePriceSubmit = async () => {
        if (selectedCardId != null) {
            try {
                if (props.action === 'sell') {
                    await ApiStore.sellCard({id: selectedCardId, price: parseFloat(price)});
                } else {
                    //  await ApiStore.buyCard(selectedCardId, parseFloat(price));
                }
                setIsModalOpen(false);
                setPrice('');
            } catch (error) {
                console.error('Error during the transaction:', error);
            }
        }
    };

    return (
        props.cards.length > 0 ? (
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
                        <tr key={card.id}>
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
                                        className="ui vertical blue animated button">
                                    <div className="hidden content">{props.action.toUpperCase()}</div>
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
                        <input
                            type="number"
                            placeholder="Entrez le prix"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
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

