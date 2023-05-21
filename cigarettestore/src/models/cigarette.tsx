import { Brand } from "./brand";

export interface Cigarette {
    id: number;
    model: string;
    type: string;
    nicotineQuantity: number;
    numberOfOrders?: number;
    price: number;
    heated: boolean;
    brand: Brand;
}