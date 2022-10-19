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
exports.CommentService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const comment_schema_1 = require("./schema/comment.schema");
let CommentService = class CommentService {
    constructor(commentModel) {
        this.commentModel = commentModel;
    }
    async findOne(_id) {
        return await this.commentModel.findOne({
            _id: new mongoose_1.default.Types.ObjectId(_id),
        });
    }
    async getCommentList({ _cupId, page }) {
        try {
            const limit = 3;
            const skip = limit * (page - 1);
            return await this.commentModel
                .find({ _cupId })
                .sort({ created: -1 })
                .skip(skip)
                .limit(limit);
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addComment(createCommentDto) {
        try {
            const { _cupId, comment, nickname, winnerName } = createCommentDto;
            const params = {
                _id: new mongoose_1.default.Types.ObjectId(),
                _cupId,
                comment,
                nickname,
                winnerName,
                created: new Date().getTime(),
            };
            const createComment = new this.commentModel(params);
            const data = await createComment.save();
            return data;
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map