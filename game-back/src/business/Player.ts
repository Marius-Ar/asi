import Card from './Card';
import {Serializable} from './Serializable';

export class Player extends Serializable {
    private readonly DEFAULT_ENERGY: number = 2000;

    private readonly _id: string;
    private _username: string;
    private _cards: Card[] = [];
    private _energy: number = this.DEFAULT_ENERGY;

    constructor(playerId: string) {
        super();
        this._id = playerId;
    }

    get id(): string {
        return this._id;
    }

    get cards(): Card[] {
        return this._cards;
    }

    set cards(value: Card[]) {
        this._cards = value;
    }

    get energy(): number {
        return this._energy;
    }

    set energy(value: number) {
        this._energy = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }
}