import Card from "./Card";
const energy =200;
export default class Room {
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

    get playerTurn(): string {
        return this._playerTurn;
    }

    public setplayerTurn() {
        if(this.playerTurn == null) {
            const index1 = Math.floor(Math.random() * this.firstPlayerId.length);
            const index2 = Math.floor(Math.random() * this.secondPlayerId.length);

            const randomIndex = Math.min(index1, index2);

            this._playerTurn = randomIndex === index1 ? this.firstPlayerId : this.secondPlayerId;
        }

    }
    get energyUserFirst(): number {
        return this._energyUserFirst;
    }

    set energyUserFirst(value: number) {
        this._energyUserFirst = value;
    }

    get energyUserSecond(): number {
        return this._energyUserSecond;
    }

    set energyUserSecond(value: number) {
        this._energyUserSecond = value;
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
    private _id: string;
    private _firstPlayerId: string;
    private _secondPlayerId?: string;
    private _firstPlayerCards: Card[];
    private _secondPlayerCards: Card[];
    private _energyUserFirst: number;
    private _energyUserSecond:number;
    private _playerTurn:string|null = null;
    private _firstPlayerName:string|null =null;
    private _secondPlayerName:string|null =null;
    constructor(id: string, firstPlayerId: string) {
        this._id = id;
        this._firstPlayerId = firstPlayerId;
    }

    public setUsername(userId:string, username:string){
        if(this.firstPlayerId == userId){
            this.firstPlayerName = username;
        }else{
            this.secondPlayerName = username;
        }
    }

    public setPlayerCards(userId:string, cards:Card[]){
        this.energyUserFirst = energy;
        this.energyUserSecond = energy;
        if(this.firstPlayerId == userId){
            this._firstPlayerCards = cards;
        }else{
            this._secondPlayerCards = cards;
        }
    }

    public containsUser(userId: string): boolean {
        return this._firstPlayerId === userId || this._secondPlayerId === userId;
    }

    public isFull(): boolean {
        return !this._firstPlayerId && !this._secondPlayerId;
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

    public toJsonObject(): any {
        return {
            id: this.id,
            firstPlayerId: this.firstPlayerId,
            secondPlayerId: this.secondPlayerId,
            firstPlayerCard: this.firstPlayerCards,
            secondPlayerCard: this.secondPlayerCards,
            playerTurn: this.playerTurn,
            firstPlayerName: this.firstPlayerName,
            secondPlayerName: this.secondPlayerName,
            firstPlayerAction: this.energyUserFirst,
            secondPlayerAction: this.energyUserSecond
        }
    }

    public attackPlayer(userId:string, cardFirstPlayer:Card, cardSecondPlayer:Card){
        var actionPossible = false;
        if(userId == this.firstPlayerId){
            if(this.energyUserFirst > cardFirstPlayer.energy){
                this.energyUserFirst = this.energyUserFirst - cardFirstPlayer.energy;
                this.energyUserFirst = Math.round(this.energyUserFirst)
                actionPossible = true;
            }else{
                this._playerTurn = this.secondPlayerId;
                this.energyUserFirst = energy;
            }

        }else{
            if(this.energyUserSecond > cardSecondPlayer.energy) {
                this.energyUserSecond = this.energyUserSecond - cardSecondPlayer.energy;
                this.energyUserSecond = Math.round(this.energyUserSecond);
                actionPossible = true;
            }else{
                this._playerTurn = this.firstPlayerId;
                this.energyUserSecond = energy;
            }
        }
        if(actionPossible){
            if(this.firstPlayerCards.find(card=> card.id == cardFirstPlayer.id).hp != 0){
                this.firstPlayerCards.find(card=> card.id == cardFirstPlayer.id).hp -= cardSecondPlayer.attack;
                this.firstPlayerCards.find(card=> card.id == cardFirstPlayer.id).hp = Math.round(this.firstPlayerCards.find(card=> card.id == cardFirstPlayer.id).hp);
                this.firstPlayerCards = this.firstPlayerCards.find(card=> card.id == cardFirstPlayer.id).hp <= 0 ? this.firstPlayerCards.filter(card => card.id !== cardFirstPlayer.id) : this.firstPlayerCards;
            }
            if(this.secondPlayerCards.find(card=> card.id == cardSecondPlayer.id).hp != 0){
                this.secondPlayerCards.find(card=> card.id == cardSecondPlayer.id).hp -= cardFirstPlayer.attack;
                this.secondPlayerCards.find(card=> card.id == cardSecondPlayer.id).hp = Math.round(this.secondPlayerCards.find(card=> card.id == cardSecondPlayer.id).hp);
                this.secondPlayerCards = this.secondPlayerCards.find(card=> card.id == cardSecondPlayer.id).hp <= 0 ? this.secondPlayerCards.filter(card => card.id !== cardSecondPlayer.id) : this.secondPlayerCards;
            }
        }


    }

    public checkWinner():string|null{
        if(this.firstPlayerCards.length == 0){
            return this.secondPlayerId;
        }
        else if(this.secondPlayerCards.length == 0){
            return  this.firstPlayerId;
        }else{
            return null;
        }
    }
}