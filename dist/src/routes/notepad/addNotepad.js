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
    method: 'POST',
    path: '/api/notepad',
    handler: (req) => __awaiter(this, void 0, void 0, function* () {
        const { Title, Text, CharacterID } = req.payload;
        const notepad = yield dataManager.CreateNotepad(Title, Text).catch(e => {
            throw Boom.badImplementation();
        });
        let character;
        if (CharacterID) {
            character = yield dataManager.AddNotepadToCharacter(CharacterID, notepad._notepadid);
        }
        return {
            notepad,
            character
        };
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
//# sourceMappingURL=addNotepad.js.map