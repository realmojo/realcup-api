import mongoose, { Document } from 'mongoose';
import { CONSTANT_CATEGORY } from 'src/category/schema/constant';
import { CUP_STATUS } from './constant';
export declare type CupDocument = Cup & Document;
export declare class Images {
    winnerCount: number;
    name: string;
    url: string;
    _id: string;
}
export declare class Cup {
    _id: mongoose.Types.ObjectId;
    _userId: string;
    title: string;
    description: string;
    playCount: number;
    images: Images[];
    status: CUP_STATUS;
    category: CONSTANT_CATEGORY;
    created: number;
}
export declare const CupSchema: mongoose.Schema<Cup, mongoose.Model<Cup, any, any, any, any>, {}, {}, {}, {}, "type", Cup>;
