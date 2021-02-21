"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_1 = require("../../handlers/account");
module.exports = {
    method: 'POST',
    path: '/api/account/login',
    handler: account_1.login,
    config: {
        auth: false,
        cors: true,
        pre: [],
        validate: {}
    },
};
//# sourceMappingURL=login.js.map