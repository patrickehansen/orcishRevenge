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
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = exports.getAccount = void 0;
const dataManager = __importStar(require("../data/management/account"));
const token = __importStar(require("../util/token"));
function getAccount(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.info('##accountService::#getAccount::starting execution');
            const account = yield dataManager.findAccount(username);
            console.info('##accountService::#getAccount::successful execution');
            return {
                Username: account.Username,
                IsGM: account.IsGM,
                DisplayName: account.DisplayName,
            };
        }
        catch (err) {
            console.error('##accountService::#getAccount::error', err);
            throw err;
        }
    });
}
exports.getAccount = getAccount;
function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.info(`##accountService::#login::${username}::starting execution`);
            if (!username || !password) {
                return null;
            }
            const user = yield dataManager.verifyUser(username, password);
            if (user) {
                let idToken = token.createToken(user);
                console.info(`##accountService::#login::${username}::successful execution`);
                return idToken;
            }
            else {
                console.info(`##accountService::#login::${username}::failed execution::mismatch`);
                return null;
            }
        }
        catch (err) {
            console.error('##accountService::#login::error', err);
            throw err;
        }
    });
}
exports.login = login;
function register(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.info('##accountService::#register::starting execution');
            let err;
            const created = yield dataManager.createAccount(username, password, email);
            console.info('##accountService::#register::successful execution');
            if (!created)
                return null;
            const create = created;
            return {
                Username: create.Username,
                IsGM: create.IsGM,
                DisplayName: create.DisplayName,
            };
        }
        catch (err) {
            console.error('##accountService::#register::error', err);
            throw err;
        }
    });
}
exports.register = register;
//# sourceMappingURL=account.js.map