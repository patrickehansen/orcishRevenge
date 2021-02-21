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
const console_ten_1 = __importDefault(require("console-ten"));
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
const v8_1 = __importDefault(require("v8"));
console_ten_1.default.init(console);
dotenv_safe_1.default.config();
const server_1 = require("./server");
let serve;
server_1.initialize().then(server => {
    const totalHeapSize = v8_1.default.getHeapStatistics().total_available_size;
    const inGB = (totalHeapSize / 1024 / 1024 / 1024).toFixed(2);
    console.log(`Total heap size (bytes) ${totalHeapSize} (GB ~${inGB})`);
    console.log('Server running at:', server.info.uri);
    serve = server;
}).catch(error => {
    console.log(error);
});
process.on('uncaughtException', (err) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('uncaught exception', err);
    process.exit(1);
}));
process.on('unhandledRejection', (err) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('unhandled rejection', err);
    process.exit(1);
}));
//# sourceMappingURL=index.js.map