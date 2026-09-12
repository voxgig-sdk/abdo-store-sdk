import { Context } from './Context';
declare class AbdoStoreError extends Error {
    isAbdoStoreError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { AbdoStoreError };
