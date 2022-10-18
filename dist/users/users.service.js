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
exports.UsersService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const users_schema_1 = require("./schema/users.schema");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findOne(_id) {
        return await this.userModel.findOne({
            _id: new mongoose_1.default.Types.ObjectId(_id),
        });
    }
    async findOneByEmail(email) {
        return await this.userModel.findOne({ email });
    }
    async getUserByEmail(email) {
        const user = await this.findOneByEmail(email);
        return user;
    }
    async getUser(_id) {
        const user = await this.findOne(_id);
        return {
            _id: user._id,
            email: user.email,
        };
    }
    async addUser(createUserDto) {
        const User = await this.findOneByEmail(createUserDto.email);
        if (User === null) {
            const params = {
                _id: new mongoose_1.default.Types.ObjectId(),
                email: createUserDto.email,
                password: bcrypt.hashSync(createUserDto.password, 10),
                created: new Date().getTime(),
            };
            const createUser = new this.userModel(params);
            await createUser.save();
            return await this.findOne(createUser._id);
        }
        else {
            throw new common_1.BadRequestException('이미 등록된 사용자 입니다.');
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map