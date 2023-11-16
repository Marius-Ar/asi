import {UUID} from "crypto";
import {Card} from "./card.interface";

export interface MarketCard extends Card {
    storeListingId: number;
    sellerId: UUID;
    price: number;
}