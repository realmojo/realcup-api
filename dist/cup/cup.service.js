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
exports.CupService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const cup_schema_1 = require("./schema/cup.schema");
const googleapis_1 = require("googleapis");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const operators_1 = require("rxjs/operators");
const convert = require("xml-js");
const fs = require("fs");
const moment = require("moment");
let CupService = class CupService {
    constructor(cupModel, config, http) {
        this.cupModel = cupModel;
        this.config = config;
        this.http = http;
        const CLIENT_EMAIL = this.config.get('CLIENT_EMAIL');
        const PRIVATE_KEY = this.config.get('PRIVATE_KEY');
        this.jwtClient = new googleapis_1.google.auth.JWT(CLIENT_EMAIL, null, PRIVATE_KEY.replace(/"/g, ''), ['https://www.googleapis.com/auth/indexing'], null);
    }
    async findOne(_id) {
        return await this.cupModel.findOne({
            _id: new mongoose_1.default.Types.ObjectId(_id),
        });
    }
    async findOneByTitle(title) {
        return await this.cupModel.findOne({
            title,
        });
    }
    async getCup(_id) {
        const cup = await this.findOne(_id);
        return cup;
    }
    async getCupList({ category, page }) {
        const limit = 12;
        const skip = limit * (page - 1);
        if (category === 'all') {
            return await this.cupModel
                .find({ status: "active" })
                .sort({ playCount: -1 })
                .skip(skip)
                .limit(limit);
        }
        else {
            return await this.cupModel
                .find({ category, status: "active" })
                .sort({ playCount: -1 })
                .skip(skip)
                .limit(limit);
        }
    }
    async getMyCupList(_userId) {
        return await this.cupModel.find({ _userId }).sort({ created: -1 });
    }
    async addCup(createCupDto) {
        try {
            const params = {
                _id: new mongoose_1.default.Types.ObjectId(),
                _userId: createCupDto._userId,
                title: createCupDto.title,
                description: createCupDto.description,
                category: createCupDto.category,
                created: new Date().getTime(),
            };
            const createCup = new this.cupModel(params);
            const data = await createCup.save();
            console.log('sitemap add title: ', createCupDto.title);
            const p = process.env.NODE_ENV === 'production' ? '/opt' : '.';
            const f = process.env.NODE_ENV === 'production' ? '/realcup/public' : '';
            const json = fs.readFileSync(`${p}/sitemap.json`, 'utf8');
            const d = JSON.parse(json);
            d.urlset.url.push({
                loc: {
                    _text: `https://realcup.co.kr/cup/${encodeURI(data.title.replace(/ /g, '-'))}/${data._id}`,
                },
                lastmod: { _text: moment().format('YYYY-MM-DD') },
                priority: { _text: '1.0' },
            }, {
                loc: {
                    _text: `https://realcup.co.kr/rank/${data._id}`,
                },
                lastmod: { _text: moment().format('YYYY-MM-DD') },
                priority: { _text: '1.0' },
            });
            const options = { compact: true, ignoreComment: true, spaces: 2 };
            const result = convert.json2xml(JSON.stringify(d), options);
            fs.writeFile(`${p}/sitemap.json`, JSON.stringify(d), function (err) {
                if (err !== null) {
                    console.log('sitemap fail');
                }
            });
            fs.writeFile(`${p}${f}/sitemap.xml`, result, function (err) {
                if (err !== null) {
                    console.log('sitemap fail');
                }
            });
            return data;
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async patchCup(_id, body) {
        try {
            const filter = {
                _id: new mongoose_1.default.Types.ObjectId(_id),
            };
            const { title, description, category } = body;
            const set = {
                title,
                description,
                category,
            };
            return await this.cupModel.findOneAndUpdate(filter, set, {
                new: true,
            });
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async patchCupPlayCount(_id) {
        try {
            const filter = {
                _id: new mongoose_1.default.Types.ObjectId(_id),
            };
            const set = {
                $inc: {
                    playCount: 1,
                },
            };
            return await this.cupModel.findOneAndUpdate(filter, set, {
                new: true,
            });
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async patchCupStatus(_id, status) {
        try {
            const item = await this.findOne(_id);
            const filter = {
                _id: new mongoose_1.default.Types.ObjectId(_id),
            };
            const set = {
                status,
            };
            const http = this.http;
            if (status === "active") {
                this.jwtClient.authorize(async (err, tokens) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    const requestConfig = {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${tokens.access_token}`,
                        },
                    };
                    http
                        .post('https://indexing.googleapis.com/v3/urlNotifications:publish', {
                        url: `https://realcup.co.kr/cup/${item.title.replace(/ /g, '-')}/${_id}`,
                        type: 'URL_UPDATED',
                    }, requestConfig)
                        .pipe((0, operators_1.map)((res) => {
                        console.log(res.data);
                        return res.data;
                    }))
                        .toPromise();
                });
            }
            return await this.cupModel.findOneAndUpdate(filter, set, {
                new: true,
            });
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async patchCupImages(_id, images) {
        try {
            const filter = {
                _id: new mongoose_1.default.Types.ObjectId(_id),
            };
            const set = {
                images,
            };
            return await this.cupModel.findOneAndUpdate(filter, set, {
                new: true,
            });
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async patchCupImageWinnerCount(_id, _imageId) {
        try {
            const item = await this.getCup(_id);
            const filter = {
                _id: new mongoose_1.default.Types.ObjectId(_id),
            };
            const index = item.images.findIndex((imageItem) => {
                return imageItem._id === _imageId;
            });
            item.images[index].winnerCount += 1;
            const set = {
                images: item.images,
            };
            return await this.cupModel.findOneAndUpdate(filter, set, {
                new: true,
            });
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeCup(_id) {
        try {
            const filter = {
                _id: new mongoose_1.default.Types.ObjectId(_id),
            };
            const set = {
                $set: { active: "delete" },
            };
            return await this.cupModel.findByIdAndUpdate(filter, set, { new: true });
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
CupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(cup_schema_1.Cup.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        config_1.ConfigService,
        axios_1.HttpService])
], CupService);
exports.CupService = CupService;
//# sourceMappingURL=cup.service.js.map