import { Brand } from "./brand";

export interface Cigarette {
    id: number;
    model: string;
    type: string;
    nicotineQuantity: number;
    price: number;
    heated: boolean;
    brand: Brand;
}