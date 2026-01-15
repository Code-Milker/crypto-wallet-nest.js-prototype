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
exports.SigningController = void 0;
const common_1 = require("@nestjs/common");
const signing_service_1 = require("./signing.service");
const libs_1 = require("@shared/libs");
let SigningController = class SigningController {
    signingService;
    constructor(signingService) {
        this.signingService = signingService;
    }
    async sign(walletId, dto) {
        return this.signingService.sign(walletId, dto);
    }
};
exports.SigningController = SigningController;
__decorate([
    (0, common_1.Post)(':walletId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('walletId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, libs_1.SignMessageDto]),
    __metadata("design:returntype", Promise)
], SigningController.prototype, "sign", null);
exports.SigningController = SigningController = __decorate([
    (0, common_1.Controller)('sign'),
    __metadata("design:paramtypes", [signing_service_1.SigningService])
], SigningController);
//# sourceMappingURL=signing.controller.js.map