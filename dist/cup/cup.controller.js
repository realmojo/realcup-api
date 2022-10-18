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
exports.CupController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const cup_service_1 = require("./cup.service");
let CupController = class CupController {
    constructor(cupService) {
        this.cupService = cupService;
    }
    async addCup(body, req) {
        console.log('add cup');
        const { id } = req.user;
        return await this.cupService.addCup(Object.assign(Object.assign({}, body), { _userId: id }));
    }
    async patchCup(param, body) {
        console.log('patch cup');
        const { _id } = param;
        return await this.cupService.patchCup(_id, body);
    }
    async patchCupStatus(param, body) {
        console.log('patch cup status');
        const { _id } = param;
        const { status } = body;
        return await this.cupService.patchCupStatus(_id, status);
    }
    async patchCupImages(param, body) {
        console.log('patch cup images');
        const { _id } = param;
        const { images } = body;
        return await this.cupService.patchCupImages(_id, images);
    }
    async patchCupImageWinnerCount(param) {
        console.log('patchCupImageWinnerCount');
        const { _id, _imageId } = param;
        return await this.cupService.patchCupImageWinnerCount(_id, _imageId);
    }
    async getCupList(query) {
        console.log('get cup list');
        const { category, page } = query;
        const params = {
            category: category || 'all',
            page: Number(page) || 1,
        };
        return await this.cupService.getCupList(params);
    }
    async getMyCupList(req) {
        console.log('get cup my list');
        const { id } = req.user;
        return await this.cupService.getMyCupList(id);
    }
    async getCup(param, query) {
        console.log('get cup');
        const { _id } = param;
        const { isPlay } = query;
        if (isPlay) {
            await this.cupService.patchCupPlayCount(_id);
        }
        return await this.cupService.getCup(_id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CupController.prototype, "addCup", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/:_id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CupController.prototype, "patchCup", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/:_id/status'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CupController.prototype, "patchCupStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/:_id/images'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CupController.prototype, "patchCupImages", null);
__decorate([
    (0, common_1.Patch)('/:_id/images/:_imageId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CupController.prototype, "patchCupImageWinnerCount", null);
__decorate([
    (0, common_1.Get)('/list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CupController.prototype, "getCupList", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/myList'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CupController.prototype, "getMyCupList", null);
__decorate([
    (0, common_1.Get)('/:_id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CupController.prototype, "getCup", null);
CupController = __decorate([
    (0, common_1.Controller)('cup'),
    __metadata("design:paramtypes", [cup_service_1.CupService])
], CupController);
exports.CupController = CupController;
//# sourceMappingURL=cup.controller.js.map