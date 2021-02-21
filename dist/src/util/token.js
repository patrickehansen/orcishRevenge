"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const dataManager = __importStar(require("../data/dataManager"));
function validateToken(decoded, request) {
    return __awaiter(this, void 0, void 0, function* () {
        //Get the user account from the database
        let user = yield dataManager.findAccount(decoded.username).catch((error) => {
            console.log('Error getting user in validateToken', error);
            return { isValid: false };
        });
        //Check to see if we have matching user record and assign the pre data.
        if (user.id === decoded.id) {
            request.pre.user = user;
            return { isValid: true };
        }
        else {
            return { isValid: false };
        }
    });
}
exports.validateToken = validateToken;
function createToken(user) {
    //Return a jwt signed token
    return jsonwebtoken_1.default.sign({
        id: user.id,
        username: user.Username,
    }, config_1.default.secret, {
        algorithm: 'HS256',
        expiresIn: config_1.default.tokenExpiration
    });
}
exports.createToken = createToken;
//# sourceMappingURL=token.js.map