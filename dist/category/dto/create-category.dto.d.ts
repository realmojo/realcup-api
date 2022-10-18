import mongoose from 'mongoose';
export declare class CreateCategoryDto {
    readonly _id: mongoose.Types.ObjectId;
    readonly title: string;
    readonly sort: number;
}
