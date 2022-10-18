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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CupSchema = exports.Cup = exports.Images = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Images = class Images {
};
__decorate([
    (0, mongoose_1.Prop)({
        default: 0,
    }),
    __metadata("design:type", Number)
], Images.prototype, "winnerCount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Images.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Images.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Images.prototype, "_id", void 0);
Images = __decorate([
    (0, mongoose_1.Schema)()
], Images);
exports.Images = Images;
const ImagesSchema = mongoose_1.SchemaFactory.createForClass(Images);
let Cup = class Cup {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], Cup.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Cup.prototype, "_userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Cup.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Cup.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 0,
    }),
    __metadata("design:type", Number)
], Cup.prototype, "playCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [ImagesSchema] }),
    __metadata("design:type", Array)
], Cup.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: "wait",
    }),
    __metadata("design:type", String)
], Cup.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Cup.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Cup.prototype, "created", void 0);
Cup = __decorate([
    (0, mongoose_1.Schema)()
], Cup);
exports.Cup = Cup;
exports.CupSchema = mongoose_1.SchemaFactory.createForClass(Cup);
//# sourceMappingURL=cup.schema.js.map