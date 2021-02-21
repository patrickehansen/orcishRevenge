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
exports.SaveNotepad = exports.GetNotepad = exports.CreateNotepad = void 0;
const database_1 = __importDefault(require("../database"));
function CreateNotepad(title, text) {
    return __awaiter(this, void 0, void 0, function* () {
        const Text = text || {};
        const Title = title || 'Notes';
        const created = yield database_1.default.Notepads.create({ Title, Text });
        return created;
    });
}
exports.CreateNotepad = CreateNotepad;
function GetNotepad(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const found = yield database_1.default.Notepads.findOne({
            '_notepadid': id
        }).catch(error => {
            console.error('Error in notepads.find', error);
            throw error;
        });
        return found;
    });
}
exports.GetNotepad = GetNotepad;
function SaveNotepad(notepad) {
    return __awaiter(this, void 0, void 0, function* () {
        const found = yield this.GetNotepad(notepad._notepadid);
        if (found.Text !== notepad.Text) {
            found.Text = notepad.Text;
        }
        if (found.Title !== notepad.Title) {
            found.Title = notepad.Title;
        }
        yield found.save();
        return found;
    });
}
exports.SaveNotepad = SaveNotepad;
//# sourceMappingURL=notepad.js.map