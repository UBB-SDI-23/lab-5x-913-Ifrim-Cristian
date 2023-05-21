import { Cigarette } from "./cigarette";

export interface Brand {
    id: number;
    name: string;
    description: string;
    country: string;
    year: number;
    logo: string;

    cigarettes?: Cigarette[];

    averageNicotine?: number;
    averagePrice?: number;
}