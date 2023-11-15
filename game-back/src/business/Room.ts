export default class Room {
    private _id: string;
    private _firstPlayerId: string;
    private _secondPlayerId?: string;

    constructor(id: string, firstPlayerId: string) {
        this._id = id;
        this._firstPlayerId = firstPlayerId;
    }

    public isUserAssigned(userId: string): boolean {
        return this._firstPlayerId === userId || this._secondPlayerId === userId;
    }

    public isFull(): boolean {
        return this._firstPlayerId !== null && this._secondPlayerId !== null;
    }

    get id(): string {
        return this._id;
    }

    get firstPlayerId(): string {
        return this._firstPlayerId;
    }

    get secondPlayerId(): string {
        return this._secondPlayerId;
    }

    set secondPlayerId(value: string) {
        this._secondPlayerId = value;
    }
}