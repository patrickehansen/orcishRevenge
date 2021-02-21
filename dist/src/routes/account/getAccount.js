"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_1 = require("../../handlers/account");
module.exports = {
    method: 'GET',
    path: '/api/account/details',
    handler: account_1.getAccount,
    config: {
        auth: 'jwt',
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        },
        pre: [],
        validate: {}
    },
};
//# sourceMappingURL=getAccount.js.map