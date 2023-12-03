import {Card} from '../../../core/interfaces/card.interface';

export class Player {
    constructor(id: string, username: string, cards: Card[]) {
        this._id = id;
        this._username = username;
        this._cards = cards;
        this._energy = 200;
    }

    private _username: string;

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    private _cards: Card[];

    get cards(): Card[] {
        return this._cards;
    }

    set cards(value: Card[]) {
        this._cards = value;
    }

    private _id: string;

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    private _energy: number;


    get energy(): number {
        return this._energy;
    }

    set energy(value: number) {
        this._energy = value;
    }
}