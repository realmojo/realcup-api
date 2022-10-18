import { UsersService } from './users.service';
import { User } from './schema/users.schema';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    addUser(body: any): Promise<User>;
    getUser(param: any): Promise<User>;
    getOwn(req: any): Promise<User>;
    getUserByEmail(param: any): Promise<User>;
}
