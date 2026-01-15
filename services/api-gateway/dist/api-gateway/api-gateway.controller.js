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
exports.ApiGatewayController = void 0;
const common_1 = require("@nestjs/common");
const api_gateway_service_1 = require("./api-gateway.service");
const libs_1 = require("@shared/libs");
const passport_1 = require("@nestjs/passport");
let ApiGatewayController = class ApiGatewayController {
    apiGatewayService;
    constructor(apiGatewayService) {
        this.apiGatewayService = apiGatewayService;
    }
    async register(createUserDto) {
        return this.apiGatewayService.register(createUserDto);
    }
    async login(loginDto) {
        return this.apiGatewayService.login(loginDto);
    }
    async createWallet(req) {
        return this.apiGatewayService.createWallet(req.user.userId);
    }
    async listWallets(req) {
        return this.apiGatewayService.listWallets(req.user.userId);
    }
    async signMessage(req, walletId, dto) {
        return this.apiGatewayService.signMessage(walletId, dto);
    }
};
exports.ApiGatewayController = ApiGatewayController;
__decorate([
    (0, common_1.Post)('auth/register'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [libs_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], ApiGatewayController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('auth/login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [libs_1.LoginDto]),
    __metadata("design:returntype", Promise)
], ApiGatewayController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('wallets'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiGatewayController.prototype, "createWallet", null);
__decorate([
    (0, common_1.Get)('wallets'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiGatewayController.prototype, "listWallets", null);
__decorate([
    (0, common_1.Post)('sign/:walletId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('walletId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, libs_1.SignMessageDto]),
    __metadata("design:returntype", Promise)
], ApiGatewayController.prototype, "signMessage", null);
exports.ApiGatewayController = ApiGatewayController = __decorate([
    (0, common_1.Controller)('api/v1'),
    __metadata("design:paramtypes", [api_gateway_service_1.ApiGatewayService])
], ApiGatewayController);
//# sourceMappingURL=api-gateway.controller.js.map