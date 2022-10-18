import mongoose, { Document } from 'mongoose';
import { USER_STATUS } from './constant';
export declare type UserDocument = User & Document;
export declare class User {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    status: USER_STATUS;
    created: number;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
