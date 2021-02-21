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
exports.EditCharacterRP = exports.EditCharacterStats = exports.EditItemSection = exports.EditItem = exports.DeleteItemSection = exports.DeleteItem = exports.AddItemSection = exports.AddItem = exports.EditSkillSection = exports.EditSkill = exports.DeleteSkillSection = exports.DeleteSkill = exports.AddSkillSection = exports.AddSkill = exports.AddNotepadToCharacter = exports.GetAllCharacters = exports.CreateCharacter = exports.GetAvailableCharacters = void 0;
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = __importDefault(require("../database"));
function GetAvailableCharacters(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const allowed = yield database_1.default.AccountCharacter.find({
            AccountID: user.id,
        }).catch(error => {
            console.error('Error in account character.find', error);
            throw error;
        });
        const characterIDs = allowed.map(v => mongoose_1.default.Types.ObjectId(v.CharacterID));
        const characters = yield database_1.default.Character.find({
            '_id': { '$in': characterIDs }
        }).catch(error => {
            console.error('Error in characters.find', error);
            throw error;
        });
        return characters.map(v => {
            return Object.assign(Object.assign({}, v['_doc']), { id: v.id });
        });
    });
}
exports.GetAvailableCharacters = GetAvailableCharacters;
function CreateCharacter(character, userid) {
    return __awaiter(this, void 0, void 0, function* () {
        const { likes, dislikes, vices } = character.Likes.reduce((a, v) => {
            switch (v.Label) {
                case 'Like': {
                    a.likes.push(v);
                    break;
                }
                case 'Dislike': {
                    a.dislikes.push(v);
                    break;
                }
                case 'Vice': {
                    a.vices.push(v);
                    break;
                }
                default: { }
            }
            return a;
        }, { likes: [], dislikes: [], vices: [] });
        const mainNotepad = yield this.CreateNotepad('General Notes', {});
        const toCreate = {
            Created: moment_1.default(),
            Name: character.Name,
            Creator: userid,
            Avatar: character.AvatarURL,
            Height: character.Height,
            Weight: character.Weight,
            EyeColor: character.EyeColor,
            HairColor: character.HairColor,
            SkinColor: character.SkinColor,
            Build: character.Build,
            Age: character.Age,
            GeneralNotes: character.GeneralNotes,
            Dislikes: dislikes,
            Likes: likes,
            Vices: vices,
            Health: {
                Total: character.Endurance * 3,
                Current: character.Endurance * 3,
            },
            MagicPoints: {
                Total: character.MagicAffinity * 3,
                Current: character.MagicAffinity * 3,
            },
            ActionPoints: {
                Total: character.Speed * 3,
                Current: character.Speed * 3,
            },
            Notepads: [mainNotepad._notepadid],
            Endurance: character.Endurance,
            Strength: character.Strength,
            Agility: character.Agility,
            Reasoning: character.Reasoning,
            Speed: character.Speed,
            MagicalAffinity: character.MagicAffinity,
            Alertness: character.Alertness,
            Melee: 12,
            Accuracy: 12,
        };
        const created = yield database_1.default.Character.create(toCreate).catch(error => {
            console.error('Error creating character in database', error);
            throw error;
        });
        const join = yield database_1.default.AccountCharacter.create({
            AccountID: userid,
            CharacterID: created.id
        }).catch(error => {
            console.error('Error creating account character in database', error);
            throw error;
        });
        return created && join;
    });
}
exports.CreateCharacter = CreateCharacter;
function GetAllCharacters() {
    return database_1.default.Character.find();
}
exports.GetAllCharacters = GetAllCharacters;
function AddNotepadToCharacter(characterID, notepadID) {
    return __awaiter(this, void 0, void 0, function* () {
        const character = yield database_1.default.Character.findOne({
            '_id': characterID
        }).catch(error => {
            console.error('Error in characters.find', error);
            throw error;
        });
        if (character && !character.Notepads.includes(notepadID)) {
            try {
                character.Notepads.push(notepadID);
                yield character.save();
            }
            catch (error) {
                console.error('hey', error);
            }
            return character;
        }
        return null;
    });
}
exports.AddNotepadToCharacter = AddNotepadToCharacter;
function AddSkill(skillData, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const character = yield database_1.default.Character.findOne({
            '_id': skillData.character
        }).catch(error => {
            console.error('Error in characters.find', error);
            throw error;
        });
        if (!character)
            throw new Error('Character not found');
        let section = character.Skills.find(v => v.id === skillData.SectionID);
        if (!section) {
            throw new Error('Section does not exist');
        }
        // HMMMMMMMM
        section.Skills.push({
            Name: skillData.Name,
            Score: skillData.Score,
            MPCost: skillData.MPCost,
            APCost: skillData.APCost,
            Damage: skillData.Damage,
            Notes: skillData.Notes,
        });
        yield character.save();
        return character;
    });
}
exports.AddSkill = AddSkill;
function AddSkillSection(skillData, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const character = yield database_1.default.Character.findOne({
            '_id': skillData.character
        }).catch(error => {
            console.error('Error in characters.find', error);
            throw error;
        });
        if (!character)
            throw new Error('Character not found');
        const existing = character.Skills.find(v => v.SectionName === skillData.SectionName);
        if (existing) {
            throw new Error('Section with that name already exists.');
        }
        character.Skills.push({
            SectionName: skillData.SectionName,
            Placement: skillData.Placement,
            Skills: [],
        });
        yield character.save();
        return character;
    });
}
exports.AddSkillSection = AddSkillSection;
function DeleteSkill(data, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const character = yield database_1.default.Character.findOne({
            '_id': data.character
        }).catch(error => {
            console.error('Error in characters.find', error);
            throw error;
        });
        if (!character)
            throw new Error('Character not found');
        const section = character.Skills.find(v => v['id'] === data.SectionID);
        section.Skills = section.Skills.filter(v => v.id !== data['_id']);
        yield character.save();
        return character;
    });
}
exports.DeleteSkill = DeleteSkill;
function DeleteSkillSection(data, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const character = yield database_1.default.Character.findOne({
            '_id': data.character
        }).catch(error => {
            console.error('Error in characters.find', error);
            throw error;
        });
        if (!character)
            throw new Error('Character not found');
        character.Skills = character.Skills.filter(v => v.SectionName !== data.SectionName);
        yield character.save();
        return character;
    });
}
exports.DeleteSkillSection = DeleteSkillSection;
function EditSkill(data, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const character = yield database_1.default.Character.findOne({
            '_id': data.character
        }).catch(error => {
            console.error('Error in characters.find', error);
            throw error;
        });
        if (!character)
            throw new Error('Character not found');
        const section = character.Skills.find(v => v['id'] === data.Skill.SectionID);
        const extant = section.Skills.find(v => v['id'] === data.Skill['_id']);
        console.log(extant, data.Skill);
        const { Skill } = data;
        Object.entries(Skill).forEach(([key, value]) => {
            if (key == '_id' || key == 'SectionID')
                return;
            if (extant[key] != value)
                extant[key] = value;
        });
        yield character.save();
        return character;
    });
}
exports.EditSkill = EditSkill;
function EditSkillSection(data, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const character = yield database_1.default.Character.findOne({
            '_id': data.character
        }).catch(error => {
            console.error('Error in characters.find', error);
            throw error;
        });
        if (!character)
            throw new Error('Character not found');
        const section = character.Skills.find(v => v['id'] === data['_id']);
        section.SectionName = data.SectionName;
        section.Placement = data.Placement;
        if (section.Skills.length > data.Skills.length) {
            const newIds = data.Skills.map(v => v._id);
            const index = section.Skills.findIndex(v => !newIds.includes(v.id));
            section.Skills.splice(index, 1);
        }
        else if (section.Skills.length < data.Skills.length) {
            const newIndex = data.Skills.findIndex(v => !v._id);
            section.Skills.splice(newIndex, 0, data.Skills[newIndex]);
        }
        else {
            // Reorder
            section.Skills = data.Skills;
        }
        yield character.save();
        return character;
    });
}
exports.EditSkillSection = EditSkillSection;
function AddItem(itemData, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const character = yield database_1.default.Character.findOne({
            '_id': itemData.character
        }).catch(error => {
            console.error('Error in characters.find', error);
            throw error;
        });
        if (!character)
            throw new Error('Character not found');
        let section = character.Items.find(v => v.id === itemData.SectionID);
        if (!section) {
            throw new Error('Section does not exist');
        }
        // HMMMMMMMM
        section.Items.push({
            Name: itemData.Name,
            Quantity: itemData.Quantity,
            Effect: itemData.Effect,
            Armor: itemData.Armor,
            Damage: itemData.Damage,
            Notes: itemData.Notes,
        });
        yield character.save();
        return character;
    });
}
exports.AddItem = AddItem;
function AddItemSection(itemData, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const character = yield database_1.default.Character.findOne({
            '_id': itemData.character
        }).catch(error => {
            console.error('Error in characters.find', error);
            throw error;
        });
        if (!character)
            throw new Error('Character not found');
        const existing = character.Items.find(v => v.SectionName === itemData.SectionName);
        if (existing) {
            throw new Error('Section with that name already exists.');
        }
        character.Items.push({
            SectionName: itemData.SectionName,
            Placement: itemData.Placement,
            Items: [],
        });
        yield character.save();
        return character;
    });
}
exports.AddItemSection = AddItemSection;
function DeleteItem(data, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const character = yield database_1.default.Character.findOne({
            '_id': data.character
        }).catch(error => {
            console.error('Error in characters.find', error);
            throw error;
        });
        if (!character)
            throw new Error('Character not found');
        const section = character.Items.find(v => v['id'] === data.SectionID);
        section.Items = section.Items.filter(v => v.id !== data['_id']);
        yield character.save();
        return character;
    });
}
exports.DeleteItem = DeleteItem;
function DeleteItemSection(data, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const character = yield database_1.default.Character.findOne({
            '_id': data.character
        }).catch(error => {
            console.error('Error in characters.find', error);
            throw error;
        });
        if (!character)
            throw new Error('Character not found');
        character.Items = character.Items.filter(v => v.SectionName !== data.SectionName);
        yield character.save();
        return character;
    });
}
exports.DeleteItemSection = DeleteItemSection;
function EditItem(data, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const character = yield database_1.default.Character.findOne({
            '_id': data.character
        }).catch(error => {
            console.error('Error in characters.find', error);
            throw error;
        });
        if (!character)
            throw new Error('Character not found');
        const section = character.Items.find(v => v['id'] === data.Item.SectionID);
        const extant = section.Items.find(v => v['id'] === data.Item['_id']);
        console.log(extant, data.Item);
        const { Item } = data;
        Object.entries(Item).forEach(([key, value]) => {
            if (key == '_id' || key == 'SectionID')
                return;
            if (extant[key] != value)
                extant[key] = value;
        });
        yield character.save();
        return character;
    });
}
exports.EditItem = EditItem;
function EditItemSection(data, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const character = yield database_1.default.Character.findOne({
            '_id': data.character
        }).catch(error => {
            console.error('Error in characters.find', error);
            throw error;
        });
        if (!character)
            throw new Error('Character not found');
        const section = character.Items.find(v => v['id'] === data['_id']);
        section.SectionName = data.SectionName;
        section.Placement = data.Placement;
        if (section.Items.length > data.Items.length) {
            const newIds = data.Items.map(v => v._id);
            const index = section.Items.findIndex(v => !newIds.includes(v.id));
            section.Items.splice(index, 1);
        }
        else if (section.Items.length < data.Items.length) {
            const newIndex = data.Items.findIndex(v => !v._id);
            section.Items.splice(newIndex, 0, data.Items[newIndex]);
        }
        else {
            // Reorder
            section.Items = data.Items;
        }
        yield character.save();
        return character;
    });
}
exports.EditItemSection = EditItemSection;
function EditCharacterStats(payload, userid) {
    return __awaiter(this, void 0, void 0, function* () {
        const character = yield database_1.default.Character.findOne({
            '_id': payload.CharacterID
        }).catch(error => {
            console.error('Error in characters.find', error);
            throw error;
        });
        if (!character)
            throw new Error('Character not found');
        Object.entries(payload.Stats).forEach(([key, value]) => {
            if (typeof value === 'object') {
                if (character[key].Current !== value.Current) {
                    character[key].Current = value.Current;
                }
                if (character[key].Total !== value.Total) {
                    character[key].Total = value.Total;
                }
            }
            else {
                if (character[key] !== value) {
                    character[key] = value;
                }
            }
        });
        yield character.save();
        return character;
    });
}
exports.EditCharacterStats = EditCharacterStats;
function EditCharacterRP(payload, userid) {
    return __awaiter(this, void 0, void 0, function* () {
        const character = yield database_1.default.Character.findOne({
            '_id': payload.CharacterID
        }).catch(error => {
            console.error('Error in characters.find', error);
            throw error;
        });
        if (!character)
            throw new Error('Character not found');
        Object.entries(payload.RP).forEach(([key, value]) => {
            const index = key.slice(-1);
            const descIndex = key.indexOf('Desc');
            let type;
            if (descIndex) {
                type = key.slice(0, descIndex);
            }
            else {
                type = key.slice(0, -1);
            }
            const currentBlock = character[type + 's'][Number(index) - 1];
            if (descIndex > -1) {
                //Description
                if (currentBlock.Description !== value) {
                    currentBlock.Description = value;
                }
            }
            else {
                //Title
                if (currentBlock.Title !== value) {
                    currentBlock.Title = value;
                }
            }
        });
        yield character.save();
        return character;
    });
}
exports.EditCharacterRP = EditCharacterRP;
//# sourceMappingURL=character.js.map