import CardDetail from "../../../core/components/card-detail/CardDetail";
import CardShort from "../../../core/components/card-short/CardShort";
import React, {useEffect, useState} from "react";
import {io} from "socket.io-client";
import Cookies from "js-cookie";
import Room from "../classes/Room";
import {Card} from "../../../core/interfaces/card.interface";
import {useNotification} from "../../../core/components/notification/NotificationContext";
import {NotificationType} from "../../../core/components/notification/Notification";
import ApiUser from '../../../core/api/ApiUser';
import {Progress} from "semantic-ui-react";

export function Fight() {
    const socket = io('http://localhost:3001');
    const userId = Cookies.get('userId');
    const [joinedRoom, setJoinedRoom] = useState<Room | null>(null);
    const [cardUser1, setCardUser1] = useState<Card | null>(null);
    const [cardUser2, setCardUser2] = useState<Card | null>(null);
    const {showNotification} = useNotification();
    useEffect(()=>{
        socket.emit('get-info-game', {userId});
    }, [])

    socket.on('info-game', ({id, firstPlayerId, secondPlayerId,firstPlayerCard,secondPlayerCard,playerTurn,firstPlayerName,secondPlayerName,firstPlayerAction,secondPlayerAction}) => {
        if(playerTurn !== joinedRoom?.playerturn && joinedRoom?.playerturn === userId){
            showNotification(NotificationType.ERROR,'Vous n\'aviez pas assez d\'énergie pour faire votre dernier tour et votre tour à été stopper')
        }
        const room = new Room(id, firstPlayerId, secondPlayerId,firstPlayerCard,secondPlayerCard,playerTurn,firstPlayerName,secondPlayerName,firstPlayerAction,secondPlayerAction);
        setJoinedRoom(room);
        setCardUser1(null);
        setCardUser2(null);
        console.log('yes')
    });

    socket.on('winner', ({winnerId,gain}) => {
        if(userId == winnerId){
            console.log(winnerId);
            ApiUser.updateBalance(gain,userId!.toString());
            showNotification(NotificationType.SUCCESS, 'Vous avez gagné')
            //window.location.href = '/market';
        }else{
            showNotification(NotificationType.ERROR, 'Vous avez perdu')
            //window.location.href = '/market';
        }
    });

    function  selectCardUser(user:string,card:Card){
        if(joinedRoom?.playerturn == userId) {
            if (user == 'user1') {
                setCardUser1(card);
            } else {
                setCardUser2(card);
            }
        }
    }
    function onAttack(){
        if(cardUser1 !== null && cardUser2 !== null){
            socket.emit('attack', {userId, cardUser1,cardUser2});
        }
    }
    const actionpoints:number = 100;
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
                                        <div className=" column">{joinedRoom?.firstPlayerId == userId ? 'Me' : joinedRoom?.firstPlayerName}</div>
                                    </div>

                                    <div className="row">
                                        <div className="column">
                                            <div
                                                 id="progressBarId1">
                                                { joinedRoom?.energyUserFirst &&
                                                <Progress progress='value' value={joinedRoom?.energyUserFirst*100/200+""} color='teal'/>
                                                }
                                                <div className="label">Action Points</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ten wide column">
                                <div className="ui four column grid">
                                    {joinedRoom !== null && joinedRoom.firstPlayerCards && joinedRoom.firstPlayerCards.map(card => (
                                    <div className="column" key={'user1'+card.id} onClick={() => selectCardUser('user1',card)}>
                                        <CardShort card={card}/>
                                    </div>
                                        ))}
                                </div>
                            </div>
                            <div className="four wide column">
                                {cardUser1 !== null &&
                                <CardDetail card={cardUser1}/>
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
                                { joinedRoom !== null && joinedRoom.playerturn == userId &&
                                <button className="huge ui primary button" onClick={()=> onAttack()}>
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
                                                { joinedRoom?.energyUserSecond &&
                                                    <Progress progress='value' value={joinedRoom?.energyUserSecond*100/200+""} color='teal' />
                                                }

                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className=" column">{joinedRoom?.secondPlayerId == userId ? 'Me' : joinedRoom?.secondPlayerName }</div>
                                    </div>
                                    <div className="row">
                                        <div className="column"><i className="user circle huge icon "></i></div>
                                    </div>

                                </div>
                            </div>
                            <div className="ten wide column">
                                <div className="ui four column grid">
                                    {joinedRoom !== null && joinedRoom.secondPlayerCards && joinedRoom.secondPlayerCards.map(card => (
                                    <div className="column" key={'user2'+card.id} onClick={() => selectCardUser('user2',card)}>
                                        <CardShort card={card} />
                                    </div>
                                        ))}

                                </div>
                            </div>
                            <div className="four wide column">
                                { cardUser2 !== null &&
                                <CardDetail card={cardUser2}/>
                                }
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    )
}