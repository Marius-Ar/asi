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

    get id(): string {
        return this._id;
    }

    get firstPlayer(): Player {
        return this._firstPlayer;
    }

    public setPlayerCards(userId: string, cards: Card[]) {
        if (this.firstPlayer.id == userId) {
            this._firstPlayer.cards = cards;
        } else if (this._secondPlayer) {
            this._secondPlayer.cards = cards;
        }
    }

    public containsUser(userId: string): boolean {
        return this._firstPlayer.id === userId || this._secondPlayer?.id === userId;
    }

    public isFull(): boolean {
        return !!this._firstPlayer && !!this._secondPlayer;
    }

    public attackPlayer(userId: string, attackingCard: Card, targetCard: Card) {

        const currentPlayer = userId === this.firstPlayer.id ? this.firstPlayer : this.secondPlayer;
        const isActionPerformable = this.isActionPerformable(currentPlayer, attackingCard, targetCard);

        if (isActionPerformable && !!currentPlayer) {
            const otherPlayer = userId === this.firstPlayer.id ? this.secondPlayer : this.firstPlayer;

            if (!otherPlayer) {
                return;
            }

            currentPlayer.energy -= attackingCard.energy;
            targetCard.hp -= attackingCard.attack;
            this._turn = otherPlayer;
        }
    }

    public getWinner(): string | undefined {
        if (!!this.firstPlayer && this.firstPlayer.cards.length == 0) {
            return this.firstPlayer?.id;
        } else if (!!this.secondPlayer && this.secondPlayer.cards.length == 0) {
            return this.secondPlayer?.id;
        } else {
            return undefined;
        }
    }

    public serialize(): any {
        return {
            id: this.id,
            firstPlayer: this.firstPlayer.serialize(),
            secondPlayer: this.secondPlayer?.serialize(),
            playerTurn: this.turn
        }
    }

    public pickRandomPlayer(): Player | undefined {
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