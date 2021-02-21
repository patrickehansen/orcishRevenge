"use strict";
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
exports.findAccount = exports.deleteAccount = exports.changePassword = exports.createAccount = exports.verifyUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = __importDefault(require("../database"));
function verifyUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!username || !password) {
            throw new Error('Must provide both a username and a password.');
        }
        try {
            const found = yield database_1.default.Account.findOne({
                Username: username
            });
            if (!found)
                return false;
            const isValid = yield bcryptjs_1.default.compare(password, found.Hash);
            if (isValid)
                return found;
            return false;
        }
        catch (err) {
            console.error('dataManager::account::verifyUser', err);
            throw err;
        }
    });
}
exports.verifyUser = verifyUser;
function createAccount(username, password, email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const found = yield database_1.default.Account.findOne({ $or: [
                    { Username: username },
                    { EmailAddress: email },
                ] });
            if (found)
                throw new Error('Duplicate username');
            const hash = yield bcryptjs_1.default.hash(password, 10);
            const account = yield database_1.default.Account.create({
                Username: username,
                Hash: hash,
                EmailAddress: email,
                Created: Date.now(),
            }).catch(error => {
                console.error('Error creating an account', error);
                throw error;
            });
            return !!account;
        }
        catch (err) {
            console.error('dataManager::account::CreateAccount', err);
            throw err;
        }
    });
}
exports.createAccount = createAccount;
function changePassword(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const found = yield database_1.default.Account.findOne({ Username: username });
            if (found) {
                let hash = yield bcryptjs_1.default.hash(password, 10);
                found.Hash = hash;
                yield found.save();
            }
        }
        catch (err) {
            console.error('dataManager::account::ChangePassword', err);
            throw err;
        }
    });
}
exports.changePassword = changePassword;
function deleteAccount(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deleted = yield database_1.default.Account.deleteOne({
                Username: username
            });
            return !!deleted;
        }
        catch (err) {
            console.error('dataManager::account::DeleteAccount', err);
            throw err;
        }
    });
}
exports.deleteAccount = deleteAccount;
function findAccount(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return database_1.default.Account.findOne({
                Username: username
            });
        }
        catch (err) {
            console.error('dataManager::account::FindAccount', err);
            throw err;
        }
    });
}
exports.findAccount = findAccount;
//# sourceMappingURL=account.js.map