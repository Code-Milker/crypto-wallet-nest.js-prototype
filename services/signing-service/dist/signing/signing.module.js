"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigningModule = void 0;
const common_1 = require("@nestjs/common");
const signing_service_1 = require("./signing.service");
const signing_controller_1 = require("./signing.controller");
const typeorm_1 = require("@nestjs/typeorm");
const libs_1 = require("@shared/libs");
const axios_1 = require("@nestjs/axios");
let SigningModule = class SigningModule {
};
exports.SigningModule = SigningModule;
exports.SigningModule = SigningModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([libs_1.Signature]), axios_1.HttpModule],
        controllers: [signing_controller_1.SigningController],
        providers: [signing_service_1.SigningService],
    })
], SigningModule);
//# sourceMappingURL=signing.module.js.map