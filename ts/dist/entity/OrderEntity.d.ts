import { AbdoStoreEntityBase } from '../AbdoStoreEntityBase';
import type { AbdoStoreSDK } from '../AbdoStoreSDK';
import type { Control } from '../types';
import type { Order, OrderLoadMatch, OrderCreateData } from '../AbdoStoreTypes';
declare class OrderEntity extends AbdoStoreEntityBase<Order> {
    constructor(client: AbdoStoreSDK, entopts: any);
    make(this: OrderEntity): OrderEntity;
    load(this: any, reqmatch?: OrderLoadMatch, ctrl?: Control): Promise<OrderEntity>;
    create(this: any, reqdata?: OrderCreateData, ctrl?: Control): Promise<OrderEntity>;
}
export { OrderEntity };
