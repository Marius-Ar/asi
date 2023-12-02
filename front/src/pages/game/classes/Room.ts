import {Card} from "../../../core/interfaces/card.interface";

export default class Room {
    get energyUserFirst(): number | null {
        return this._energyUserFirst;
    }

    set energyUserFirst(value: number | null) {
        this._energyUserFirst = value;
    }

    get energyUserSecond(): number | null {
        return this._energyUserSecond;
    }

    set energyUserSecond(value: number | null) {
        this._energyUserSecond = value;
    }

    get firstPlayerName(): string | null {
        return this._firstPlayerName;
    }

    set firstPlayerName(value: string | null) {
        this._firstPlayerName = value;
    }

    get secondPlayerName(): string | null {
        return this._secondPlayerName;
    }

    set secondPlayerName(value: string | null) {
        this._secondPlayerName = value;
    }
    get playerturn(): string | null {
        return this._playerturn;
    }

    set playerturn(value: string | null) {
        this._playerturn = value;
    }
    private _id: string;
    private _firstPlayerId: string;
    private _secondPlayerId: string | null = null;
    private _firstPlayerCards: Card[] = [];
    private _secondPlayerCards: Card[] = [];
    private _energyUserFirst: number|null = null;
    private _energyUserSecond:number|null = null;
    private _playerturn:string|null = null;
    private _firstPlayerName:string|null =null;
    private _secondPlayerName:string|null =null;

    constructor(id: string, firstPlayerId: string, secondPlayerId: string | null = null, firstPlayerCard:Card[] =[],secondPlayerCard:Card[] =[],playerTurn:string|null =null,firstPlayerName:string|null=null,secondPlayerName:string|null=null,firstPlayerAction:number|null=null,secondPlayerAction:number|null=null) {
        this._id = id;
        this._firstPlayerId = firstPlayerId;
        this._secondPlayerId = secondPlayerId;
        this._firstPlayerCards = firstPlayerCard;
        this._secondPlayerCards =  secondPlayerCard;
        this._playerturn = playerTurn;
        this._energyUserFirst = firstPlayerAction;
        this._energyUserSecond = secondPlayerAction;
        this._firstPlayerName = firstPlayerName;
        this._secondPlayerName = secondPlayerName;
    }

    public isFull(): boolean {
        return !!this._firstPlayerId && !!this._secondPlayerId;
    }

    get firstPlayerCards(): Card[] {
        return this._firstPlayerCards;
    }

    set firstPlayerCards(value: Card[]) {
        this._firstPlayerCards = value;
    }

    get secondPlayerCards(): Card[] {
        return this._secondPlayerCards;
    }

    set secondPlayerCards(value: Card[]) {
        this._secondPlayerCards = value;
    }

    set id(value: string) {
        this._id = value;
    }

    set firstPlayerId(value: string) {
        this._firstPlayerId = value;
    }

    set secondPlayerId(value: string | null) {
        this._secondPlayerId = value;
    }

    get id(): string {
        return this._id;
    }

    get firstPlayerId(): string {
        return this._firstPlayerId;
    }

    get secondPlayerId(): string | null {
        return this._secondPlayerId;
    }
}
