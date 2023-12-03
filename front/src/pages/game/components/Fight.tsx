import CardDetail from "../../../core/components/card-detail/CardDetail";
import CardShort from "../../../core/components/card-short/CardShort";
import React, {useEffect, useState} from "react";
import {io} from "socket.io-client";
import Cookies from "js-cookie";
import Room from "../classes/Room";
import {Card} from "../../../core/interfaces/card.interface";
import {useNotification} from "../../../core/components/notification/NotificationContext";
import {NotificationType} from "../../../core/components/notification/Notification";
import {Progress} from "semantic-ui-react";

export function Fight() {
    const socket = io('http://localhost:3001');
    const userId = Cookies.get('userId');
    const [joinedRoom, setJoinedRoom] = useState<Room | null>(null);
    const [firstPlayerCard, setFirstPlayerCard] = useState<Card | null>(null);
    const [secondPlayerCard, setSecondPlayerCard] = useState<Card | null>(null);
    const {showNotification} = useNotification();

    useEffect(() => {
        socket.emit('get-info-game', {userId});
    }, [])

    socket.on('info-game', ({
                                id,
                                firstPlayer,
                                secondPlayer,
                                turn
                            }) => {
        if (turn !== joinedRoom?.turn && joinedRoom?.turn?.id === userId) {
            showNotification(NotificationType.ERROR, 'Vous n\'aviez pas assez d\'énergie pour faire votre dernier tour et votre tour à été stopper')
        }

        const room = new Room(id, firstPlayer, secondPlayer, turn);
        setJoinedRoom(room);
        setFirstPlayerCard(null);
        setSecondPlayerCard(null);
    });

    socket.on('winner', ({winnerId}) => {
        if (userId == winnerId) {
            showNotification(NotificationType.SUCCESS, 'Vous avez gagné');
        } else {
            showNotification(NotificationType.ERROR, 'Vous avez perdu');
        }
        window.location.href = '/market';
    });

    function selectCardUser(user: string, card: Card) {
        if (joinedRoom?.turn == userId) {
            if (user == 'user1') {
                setFirstPlayerCard(card);
            } else {
                setSecondPlayerCard(card);
            }
        }
    }

    function onAttack() {
        if (firstPlayerCard !== null && secondPlayerCard !== null) {
            socket.emit('attack', {userId, cardUser1: firstPlayerCard, cardUser2: secondPlayerCard});
        }
    }

    const actionpoints: number = 100;
    return (
        <div className="ui segment">
            <div className="ui grid">
                <div className="sixteen wide column">
                    <div className="row">
                        <div className="ui grid">
                            <div className="two wide column">
                                <div className="ui one  column centered grid">
                                    <div className="row">
                                        <div className="column"><i className="user circle huge icon "></i></div>
                                    </div>
                                    <div className="row">
                                        <div
                                            className=" column">{joinedRoom?.firstPlayer.id == userId ? 'Me' : joinedRoom?.firstPlayer.username}</div>
                                    </div>

                                    <div className="row">
                                        <div className="column">
                                            <div
                                                id="progressBarId1">
                                                {joinedRoom?.firstPlayer.energy &&
                                                    <Progress progress='value'
                                                              value={joinedRoom?.firstPlayer.energy * 100 / 200 + ""}
                                                              color='teal'/>
                                                }
                                                <div className="label">Action Points</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ten wide column">
                                <div className="ui four column grid">
                                    {joinedRoom !== null && joinedRoom.firstPlayer.cards?.map(card => (
                                        <div className="column" key={'user1' + card.id}
                                             onClick={() => selectCardUser('user1', card)}>
                                            <CardShort card={card}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="four wide column">
                                {firstPlayerCard !== null &&
                                    <CardDetail card={firstPlayerCard}/>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="ui grid ">
                            <div className="twelve wide column">
                                <h4 className="ui horizontal divider header">
                                    VS
                                </h4>
                            </div>
                            <div className="four wide column">
                                {joinedRoom !== null && joinedRoom.turn?.id == userId &&
                                    <button className="huge ui primary button" onClick={() => onAttack()}>
                                        Attack
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="ui grid">
                            <div className="two wide column">
                                <div className="ui one  column centered grid">
                                    <div className="row">
                                        <div className="column">
                                            <div id="progressBarId2">
                                                <div className="label">Action Points</div>
                                                {joinedRoom?.secondPlayer &&
                                                    <Progress progress='value'
                                                              value={joinedRoom?.secondPlayer.energy * 100 / 200 + ""}
                                                              color='teal'/>
                                                }

                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div
                                            className=" column">{joinedRoom?.secondPlayer?.id == userId ? 'Me' : joinedRoom?.secondPlayer?.username}</div>
                                    </div>
                                    <div className="row">
                                        <div className="column"><i className="user circle huge icon "></i></div>
                                    </div>

                                </div>
                            </div>
                            <div className="ten wide column">
                                <div className="ui four column grid">
                                    {joinedRoom !== null && joinedRoom.secondPlayer?.cards?.map(card => (
                                        <div className="column" key={'user2' + card.id}
                                             onClick={() => selectCardUser('user2', card)}>
                                            <CardShort card={card}/>
                                        </div>
                                    ))}

                                </div>
                            </div>
                            <div className="four wide column">
                                {secondPlayerCard !== null &&
                                    <CardDetail card={secondPlayerCard}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}