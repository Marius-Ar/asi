import Card from "./Card";
import {v4 as uuidv4} from 'uuid';
import {Player} from './Player';
import {Serializable} from './Serializable';

export default class Room extends Serializable {
    private readonly _id: string;
    private readonly _firstPlayer: Player;

    constructor(firstPlayerId: string) {
        super();
        this._id = uuidv4();
        this._firstPlayer = new Player(firstPlayerId);
    }

    private _secondPlayer?: Player;

    get secondPlayer(): Player | undefined {
        return this._secondPlayer;
    }

    set secondPlayer(player: Player | undefined) {
        this._secondPlayer = player;
    }

    private _turn: Player | null = null;

    get turn(): Player | null {
        return this._turn;
    }

    set turn(value: Player | null) {
        this._turn = value;
    }

    get id(): string {
        return this._id;
    }

    get firstPlayer(): Player {
        return this._firstPlayer;
    }

    private setPlayersCards(userId: string, playersCards: Card[]) {
        const player = this.firstPlayer.id === userId ? this.firstPlayer : this.secondPlayer;
        player.cards = playersCards;
    }

    public containsUser(userId: string): boolean {
        return this._firstPlayer.id === userId || this._secondPlayer?.id === userId;
    }

    public isFull(): boolean {
        return !!this._firstPlayer && !!this._secondPlayer;
    }

    public attackPlayer(userId: string, attackingCard: Card, targetCard: Card) {
        const isCurrentPlayerFirstPlayer = userId === this.firstPlayer.id;
        const currentPlayer = isCurrentPlayerFirstPlayer ? this.firstPlayer : this.secondPlayer;
        const otherPlayer = isCurrentPlayerFirstPlayer ? this.secondPlayer : this.firstPlayer;

        attackingCard = currentPlayer?.cards.find(card => card.id === attackingCard.id);
        targetCard = otherPlayer?.cards.find(card => card.id === targetCard.id);

        const isActionPerformable = this.isActionPerformable(currentPlayer, attackingCard, targetCard);
        if (!!otherPlayer && isActionPerformable && !!currentPlayer) {
            currentPlayer.energy -= attackingCard.energy;
            targetCard.hp -= attackingCard.attack;

            if (targetCard.hp <= 0) {
                otherPlayer.cards = otherPlayer.cards.filter(card => card.id !== targetCard.id);
            }

            this._turn = otherPlayer;
        }
    }

    public getWinner(): string | undefined {
        if (!!this.firstPlayer && this.firstPlayer.cards.length == 0) {
            return this.firstPlayer.id;
        } else if (!!this.secondPlayer && this.secondPlayer.cards.length == 0) {
            return this.secondPlayer.id;
        } else {
            return undefined;
        }
    }

    public initGame(userId: string, playersCards: Card[]): void {
        this.setPlayersCards(userId, playersCards);
        this.turn = this.pickRandomPlayer();
    }

    private playersChoseCards(): boolean {
        return this.firstPlayer.cards.length && !!this.secondPlayer?.cards.length;
    }

    private pickRandomPlayer(): Player | undefined {
        const randomIndex = Math.round(Math.random()); // 0 or 1
        return randomIndex === 0 ? this.firstPlayer : this.secondPlayer;
    }

    private isActionPerformable(currentPlayer: Player | undefined, attackingCard: Card, targetCard: Card): boolean {
        if (!currentPlayer) {
            return false;
        }
        return currentPlayer.energy > attackingCard.energy && attackingCard.hp > 0 && targetCard.hp > 0;
    }
}