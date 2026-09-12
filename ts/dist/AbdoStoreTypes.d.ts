export interface Account {
    balance?: number;
    currency?: string;
    status?: string;
}
export interface AccountLoadMatch {
    balance?: number;
    currency?: string;
    status?: string;
}
export interface Order {
    charge?: number;
    comments?: string;
    id?: string;
    link?: string;
    order_id?: number;
    quantity?: number;
    remains?: number;
    service_id?: number;
    start_count?: number;
    status?: string;
}
export interface OrderLoadMatch {
    id: number;
}
export interface OrderCreateData {
    charge?: number;
    comments?: string;
    id?: string;
    link?: string;
    order_id?: number;
    quantity?: number;
    remains?: number;
    service_id?: number;
    start_count?: number;
    status?: string;
}
export interface Service {
    category?: string;
    description?: string;
    id?: number;
    max?: number;
    min?: number;
    name?: string;
    price?: number;
}
export interface ServiceListMatch {
    category?: string;
    description?: string;
    id?: number;
    max?: number;
    min?: number;
    name?: string;
    price?: number;
}
