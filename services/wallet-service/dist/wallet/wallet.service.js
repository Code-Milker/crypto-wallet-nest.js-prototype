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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const config_1 = require("@nestjs/config");
const libs_1 = require("@shared/libs");
let WalletService = class WalletService {
    walletsRepository;
    httpService;
    configService;
    constructor(walletsRepository, httpService, configService) {
        this.walletsRepository = walletsRepository;
        this.httpService = httpService;
        this.configService = configService;
    }
    async create(userId) {
        const { publicAddress, privateKey } = (0, libs_1.generateWallet)();
        const encryptedPrivateKey = (0, libs_1.encryptPrivateKey)(privateKey);
        const wallet = this.walletsRepository.create({
            user: { id: userId },
            publicAddress,
            encryptedPrivateKey,
        });
        const savedWallet = await this.walletsRepository.save(wallet);
        const keyStorageUrl = this.configService.get('KEY_STORAGE_URL');
        await (0, rxjs_1.lastValueFrom)(this.httpService.post(`${keyStorageUrl}/${savedWallet.id}`, {
            encryptedPrivateKey,
        }));
        await this.walletsRepository.update(savedWallet.id, {
            encryptedPrivateKey: null,
        });
        return { id: savedWallet.id, publicAddress };
    }
    async findAll(userId) {
        return this.walletsRepository.find({ where: { user: { id: userId } } });
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(libs_1.Wallet)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService,
        config_1.ConfigService])
], WalletService);
//# sourceMappingURL=wallet.service.js.map