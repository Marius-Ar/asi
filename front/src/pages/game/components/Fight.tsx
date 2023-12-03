import CardDetail from "../../../core/components/card-detail/CardDetail";
import CardShort from "../../../core/components/card-short/CardShort";
import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import Room from "../classes/Room";
import {Card} from "../../../core/interfaces/card.interface";
import {useNotification} from "../../../core/components/notification/NotificationContext";
import {NotificationType} from "../../../core/components/notification/Notification";
import {useDispatch, useSelector} from 'react-redux';
import {Player} from '../classes/Player';
import {useNavigate} from 'react-router-dom';
import {clearSocket} from '../../../store/gameSocketReducer';
import {Progress} from 'semantic-ui-react';

export function Fight() {
    const navigate = useNavigate();
    const userId = Cookies.get('userId');
    const [joinedRoom, setJoinedRoom] = useState<Room | null>(null);
    const [firstPlayerCard, setFirstPlayerCard] = useState<Card | null>(null);
    const [secondPlayerCard, setSecondPlayerCard] = useState<Card | null>(null);
    const {showNotification} = useNotification();
    const dispatch = useDispatch();

    const socket = useSelector((state: any) => state.socket.socket);

    useEffect(() => {
        socket.emit('get-info-game', {userId});
    }, [])

    useEffect(() => {
        if (socket) {
            socket.on('winner', ({winnerId}: { winnerId: string }) => onWinnerReceived(winnerId));
            socket.on('info-game', ({id, firstPlayer, secondPlayer, turn}: {
                id: string,
                firstPlayer: Player,
                secondPlayer: Player,
                turn: Player | null
            }) => onInfoGameReceived(id, firstPlayer, secondPlayer, turn));
        }
    }, [socket]);

    function onInfoGameReceived(id: string, firstPlayer: Player, secondPlayer: Player, turn: Player | null) {
        const room = new Room(id, firstPlayer, secondPlayer, turn);
        setJoinedRoom(room);
        setFirstPlayerCard(null);
        setSecondPlayerCard(null);
    }


    function onWinnerReceived(winnerId: string) {
        if (userId == winnerId) {
            showNotification(NotificationType.SUCCESS, 'Vous avez gagné');
        } else {
            showNotification(NotificationType.ERROR, 'Vous avez perdu');
        }
        // ApiUser.updateBalance(Math.floor(Math.random() * (62 - 25 + 1)) + 25, userId!.toString()); // TODO : Not front's responsibility
        dispatch(clearSocket());
        navigate('/market');
    }

    function onSelectCard(user: string, card: Card) {
        if (joinedRoom?.turn?.id == userId) {
            if (user == 'user1') {
                setFirstPlayerCard(card);
            } else {
                setSecondPlayerCard(card);
            }
        }
    }

    function onAttack() {
        if (firstPlayerCard && secondPlayerCard) {
            const attackingCard = joinedRoom?.firstPlayer.id === userId ? firstPlayerCard : secondPlayerCard;
            const targetCard = joinedRoom?.firstPlayer.id === userId ? secondPlayerCard : firstPlayerCard;
            socket.emit('attack', {userId, attackingCard, targetCard});
        }
    }

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
                                                              total={100}
                                                              value={(joinedRoom?.firstPlayer.energy * 100 / Room.MAX_ENERGY).toFixed(2)}
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
                                    {joinedRoom && joinedRoom.firstPlayer.cards?.map(card => (
                                        <div className="column" key={'user1' + card.id}
                                             onClick={() => onSelectCard('user1', card)}>
                                            <CardShort card={card}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="four wide column">
                                {firstPlayerCard &&
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
                                {joinedRoom?.turn?.id == userId &&
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
                                                              total={100}
                                                              value={(joinedRoom?.secondPlayer.energy * 100 / Room.MAX_ENERGY).toFixed(2)}
                                                              color='teal'/>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className=" column">
                                            {joinedRoom?.secondPlayer?.id == userId ? 'Me' : joinedRoom?.secondPlayer?.username}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="column"><i className="user circle huge icon "></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="ten wide column">
                                <div className="ui four column grid">
                                    {joinedRoom?.secondPlayer?.cards?.map(card => (
                                        <div className="column" key={'user2' + card.id}
                                             onClick={() => onSelectCard('user2', card)}>
                                            <CardShort card={card}/>
                                        </div>
                                    ))}

                                </div>
                            </div>
                            <div className="four wide column">
                                {secondPlayerCard &&
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