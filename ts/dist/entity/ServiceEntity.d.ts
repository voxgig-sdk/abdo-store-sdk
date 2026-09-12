import { AbdoStoreEntityBase } from '../AbdoStoreEntityBase';
import type { AbdoStoreSDK } from '../AbdoStoreSDK';
import type { Control } from '../types';
import type { Service, ServiceListMatch } from '../AbdoStoreTypes';
declare class ServiceEntity extends AbdoStoreEntityBase<Service> {
    constructor(client: AbdoStoreSDK, entopts: any);
    make(this: ServiceEntity): ServiceEntity;
    list(this: any, reqmatch?: ServiceListMatch, ctrl?: Control): Promise<ServiceEntity[]>;
}
export { ServiceEntity };
