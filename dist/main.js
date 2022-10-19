"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const Sentry = require("@sentry/node");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    Sentry.init({
        dsn: 'https://4eabac6c0f3846449d4f01f4d3f47dbf@o4504007509278720.ingest.sentry.io/4504007511965697',
    });
    app.enableCors();
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map