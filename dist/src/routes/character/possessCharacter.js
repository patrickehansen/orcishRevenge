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
const game = require('../../game/game');
module.exports = {
    method: 'POST',
    path: '/api/character/possess',
    handler: (req) => __awaiter(this, void 0, void 0, function* () {
        const { CharacterID } = req.payload;
        if (CharacterID === 'spectator') {
            game.addSpectator(req.pre.user);
            return 'spectator';
        }
        else if (CharacterID === 'gm') {
            if (req.pre.user.IsGM) {
                game.addGM(req.pre.user);
                return 'gm';
            }
            else {
                return Boom.forbidden('You are not GM qualified');
            }
        }
        else {
            // Are we allowed to possess this character?
            let characters = yield dataManager.GetAvailableCharacters(req.pre.user).catch(error => {
                console.error('Error getting available characters', error);
                err = error;
            });
            const found = characters.find(v => v.id == CharacterID);
            if (!found) {
                return Boom.badData('Character not permitted or found.');
            }
            // Get the extended character info and map it to the character
            // Let the game know that the character has been possessed
            game.addPlayer(req.pre.user, found);
            // Return the character
            return found;
        }
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
//# sourceMappingURL=possessCharacter.js.map