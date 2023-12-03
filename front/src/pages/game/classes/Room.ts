import {Player} from './Player';

export default class Room {
    public static readonly MAX_ENERGY: number = 2000;

    constructor(id: string, firstPlayer: Player, secondPlayer: Player | null, turn: Player | null) {
        this._id = id;
        this._firstPlayer = firstPlayer;
        this._secondPlayer = secondPlayer;
        this._turn = turn;
    }

    private _id: string;

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    private _firstPlayer: Player;

    get firstPlayer(): Player {
        return this._firstPlayer;
    }

    set firstPlayer(value: Player) {
        this._firstPlayer = value;
    }

    private _secondPlayer: Player | null;

    get secondPlayer(): Player | null {
        return this._secondPlayer;
    }

    set secondPlayer(value: Player | null) {
        this._secondPlayer = value;
    }

    private _turn: Player | null = null;

    get turn(): Player | null {
        return this._turn;
    }

    set turn(value: Player | null) {
        this._turn = value;
    }

    isFull(): boolean {
        return !!this._firstPlayer && !!this._secondPlayer;
    }
}
