import { Model } from 'mongoose';
import { User, UserDocument } from './schema/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findOne(_id: string): Promise<User | undefined>;
    findOneByEmail(email: string): Promise<User | undefined>;
    getUserByEmail(email: string): Promise<User | undefined>;
    getUser(_id: string): Promise<any | undefined>;
    addUser(createUserDto: CreateUserDto): Promise<User | undefined>;
}
