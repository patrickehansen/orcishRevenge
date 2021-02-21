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
exports.initialize = void 0;
const hapi_1 = __importDefault(require("@hapi/hapi"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const path_1 = __importDefault(require("path"));
const inert_1 = __importDefault(require("@hapi/inert"));
const hapi_auth_jwt2_1 = __importDefault(require("hapi-auth-jwt2"));
const socketServer_1 = __importDefault(require("./socket/socketServer"));
const token = __importStar(require("./util/token"));
const config_1 = __importDefault(require("./config"));
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new hapi_1.default.Server({
            host: process.env.HOST,
            port: process.env.PORT,
            routes: {
                files: {
                    relativeTo: path_1.default.join(__dirname, '..', '..', 'static')
                }
            }
        });
        const pather = path_1.default.join(__dirname, '..', '..', 'static');
        yield server.register(inert_1.default);
        yield server.register(hapi_auth_jwt2_1.default);
        const socket = new socketServer_1.default(server.listener);
        console.log('Socket?', !!socket);
        server.auth.strategy('jwt', 'jwt', {
            key: config_1.default.secret,
            validate: token.validateToken,
            verifyOptions: {
                ignoreExpiration: true,
                algorithms: ['HS256']
            }
        });
        server.auth.default('jwt');
        const files = fast_glob_1.default.sync(['dist/src/routes/**/*.js'], { dot: true });
        const promises = files.map((filename) => __awaiter(this, void 0, void 0, function* () {
            console.log(`attempting to route ${filename}`);
            if (!filename.includes('.spec.') && !filename.includes('mock.')) {
                let newPath;
                if (__dirname.includes('dist')) {
                    newPath = path_1.default.resolve(__dirname, filename.slice(9));
                }
                else {
                    newPath = path_1.default.resolve(__dirname.slice(0, -3), filename);
                }
                const imported = yield Promise.resolve().then(() => __importStar(require(newPath)));
                try {
                    console.log(`routing ${imported.default.method} : ${imported.default.path}`);
                    server.route(imported.default);
                }
                catch (err) {
                    console.error('Error routing', err);
                }
            }
        }));
        yield Promise.all(promises);
        try {
            yield server.start();
        }
        catch (err) {
            console.error('Error starting server', err);
        }
        return server;
    });
}
exports.initialize = initialize;
//# sourceMappingURL=server.js.map