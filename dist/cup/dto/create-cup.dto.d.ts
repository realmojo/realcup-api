import mongoose from 'mongoose';
export declare class CreateCupDto {
    readonly _id: mongoose.Types.ObjectId;
    readonly _userId: string;
    readonly title: string;
    readonly description: string;
    readonly category: string;
    readonly playCount: number;
    readonly images: object;
    readonly status: string;
    readonly created: number;
}
