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
exports.SigningService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const config_1 = require("@nestjs/config");
const libs_1 = require("@shared/libs");
let SigningService = class SigningService {
    signaturesRepository;
    httpService;
    configService;
    constructor(signaturesRepository, httpService, configService) {
        this.signaturesRepository = signaturesRepository;
        this.httpService = httpService;
        this.configService = configService;
    }
    async sign(walletId, dto) {
        const keyStorageUrl = this.configService.get('KEY_STORAGE_URL');
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(`${keyStorageUrl}/${walletId}`));
        const encryptedPrivateKey = response.data.encryptedPrivateKey;
        if (!encryptedPrivateKey) {
            throw new Error('Key not found');
        }
        const privateKey = (0, libs_1.decryptPrivateKey)(encryptedPrivateKey);
        const signature = await (0, libs_1.signMessage)(privateKey, dto.message);
        const messageHash = dto.message;
        const audit = this.signaturesRepository.create({
            wallet: { id: walletId },
            messageHash,
            signature,
        });
        await this.signaturesRepository.save(audit);
        return signature;
    }
};
exports.SigningService = SigningService;
exports.SigningService = SigningService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(libs_1.Signature)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService,
        config_1.ConfigService])
], SigningService);
//# sourceMappingURL=signing.service.js.map