import { AbdoStoreEntityBase } from '../AbdoStoreEntityBase';
import type { AbdoStoreSDK } from '../AbdoStoreSDK';
import type { Control } from '../types';
import type { Account, AccountLoadMatch } from '../AbdoStoreTypes';
declare class AccountEntity extends AbdoStoreEntityBase<Account> {
    constructor(client: AbdoStoreSDK, entopts: any);
    make(this: AccountEntity): AccountEntity;
    load(this: any, reqmatch?: AccountLoadMatch, ctrl?: Control): Promise<AccountEntity>;
}
export { AccountEntity };
