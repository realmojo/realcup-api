"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const mongoose_1 = require("@nestjs/mongoose");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const version_controller_1 = require("./version/version.controller");
const cup_controller_1 = require("./cup/cup.controller");
const cup_module_1 = require("./cup/cup.module");
const category_controller_1 = require("./category/category.controller");
const category_module_1 = require("./category/category.module");
const config_1 = require("@nestjs/config");
const comment_controller_1 = require("./comment/comment.controller");
const comment_module_1 = require("./comment/comment.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.env.${process.env.NODE_ENV}`,
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URL || 'mongodb://localhost/realcup'),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            cup_module_1.CupModule,
            category_module_1.CategoryModule,
            comment_module_1.CommentModule,
        ],
        controllers: [
            app_controller_1.AppController,
            version_controller_1.VersionController,
            cup_controller_1.CupController,
            category_controller_1.CategoryController,
            comment_controller_1.CommentController,
        ],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map