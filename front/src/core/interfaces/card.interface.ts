import {UUID} from "crypto";

export interface Card {
    id: number;
    name: string;
    description: string;
    storeListingId?: number;
    hp: number;
    energy: number;
    defense: number;
    attack: number;
    imageUrl: string;
    selected?: boolean;
    price?: number;
    sellerId?: UUID;
}