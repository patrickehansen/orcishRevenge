var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Boom = require('boom');
const dataManager = require('../../data/dataManager');
module.exports = {
    method: 'GET',
    path: '/api/chatroll/chatHistory',
    handler: (req) => __awaiter(this, void 0, void 0, function* () {
        let err;
        let history = yield dataManager.GetChatHistory().catch(error => {
            console.error('Error getting chat history', error);
            err = error;
        });
        if (err) {
            return Boom.badImplementation(err.message);
        }
        return history;
    }),
    config: {
        auth: 'jwt',
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        },
        pre: [],
    },
};
//# sourceMappingURL=getChatHistory.js.map