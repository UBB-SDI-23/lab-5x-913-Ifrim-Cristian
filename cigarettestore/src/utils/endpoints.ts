export const BACKEND_API_URL =
	process.env.IS_DEVELOPMENT? process.env.DEV_BACKEND_URL : process.env.PROD_BACKEND_URL;

export const CIGARETTES_URL: string = "/cigarette"
export const BRANDS_URL: string = "/brand"
export const CLIENTS_URL:string = "/client"
export const ORDERS_URL:string = "/orders"


export const FILTER_URL:string = "/filter"
export const STATISTICS_URL:string = "/statistics"
