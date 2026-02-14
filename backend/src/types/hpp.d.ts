declare module 'hpp' {
    import { RequestHandler } from 'express';
    function hpp(options?: { checkBody?: boolean; checkQuery?: boolean; whitelist?: string[] }): RequestHandler;
    export = hpp;
}
