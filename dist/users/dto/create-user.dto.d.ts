import mongoose from 'mongoose';
export declare class CreateUserDto {
    readonly _id: mongoose.Types.ObjectId;
    readonly email: string;
    readonly password: string;
    readonly status: string;
    readonly created: number;
}
