import { AccountEntity } from './entity/AccountEntity';
import { OrderEntity } from './entity/OrderEntity';
import { ServiceEntity } from './entity/ServiceEntity';
export type * from './AbdoStoreTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { AbdoStoreEntityBase } from './AbdoStoreEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class AbdoStoreSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Account(entopts?: Record<string, any>): AccountEntity;
    Order(entopts?: Record<string, any>): OrderEntity;
    Service(entopts?: Record<string, any>): ServiceEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): AbdoStoreSDK;
    tester(testopts?: any, sdkopts?: any): AbdoStoreSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof AbdoStoreSDK;
export { stdutil, config, BaseFeature, AbdoStoreEntityBase, AbdoStoreSDK, SDK, };
