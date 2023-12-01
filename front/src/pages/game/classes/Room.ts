export default class Room {
    private _id: string;
    private _firstPlayerId: string;
    private _secondPlayerId: string | null = null;

    constructor(id: string, firstPlayerId: string, secondPlayerId: string | null = null) {
        this._id = id;
        this._firstPlayerId = firstPlayerId;
    }

    public isFull(): boolean {
        return !this._firstPlayerId && !this._secondPlayerId;
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
