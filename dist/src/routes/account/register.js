"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_1 = require("../../handlers/account");
module.exports = {
    method: 'POST',
    path: '/api/account/register',
    handler: account_1.register,
    config: {
        auth: false,
        cors: true,
        pre: [],
        validate: {}
    },
};
//# sourceMappingURL=register.js.map