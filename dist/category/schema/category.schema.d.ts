import mongoose, { Document } from 'mongoose';
import { CONSTANT_CATEGORY } from './constant';
export declare type CategoryDocument = Category & Document;
export declare class Category {
    _id: mongoose.Types.ObjectId;
    title: CONSTANT_CATEGORY;
    sort: number;
}
export declare const CategorySchema: mongoose.Schema<Category, mongoose.Model<Category, any, any, any, any>, {}, {}, {}, {}, "type", Category>;
