import { AuthService } from './auth/auth.service';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(body: any): Promise<{
        userId: import("mongoose").Types.ObjectId;
        access_token: string;
    }>;
    getProfile(req: any): any;
    doThrow(req: any, query: any): any;
}
