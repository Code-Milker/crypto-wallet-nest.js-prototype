"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyStorageController = void 0;
const common_1 = require("@nestjs/common");
const key_storage_service_1 = require("./key-storage.service");
let KeyStorageController = class KeyStorageController {
    keyStorageService;
    constructor(keyStorageService) {
        this.keyStorageService = keyStorageService;
    }
    async store(walletId, encryptedPrivateKey) {
        await this.keyStorageService.storeEncryptedKey(walletId, encryptedPrivateKey);
        return { success: true };
    }
    async get(walletId) {
        const encryptedPrivateKey = await this.keyStorageService.getEncryptedKey(walletId);
        return { encryptedPrivateKey };
    }
};
exports.KeyStorageController = KeyStorageController;
__decorate([
    (0, common_1.Post)(':walletId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('walletId')),
    __param(1, (0, common_1.Body)('encryptedPrivateKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], KeyStorageController.prototype, "store", null);
__decorate([
    (0, common_1.Get)(':walletId'),
    __param(0, (0, common_1.Param)('walletId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], KeyStorageController.prototype, "get", null);
exports.KeyStorageController = KeyStorageController = __decorate([
    (0, common_1.Controller)('keys'),
    __metadata("design:paramtypes", [key_storage_service_1.KeyStorageService])
], KeyStorageController);
//# sourceMappingURL=key-storage.controller.js.map