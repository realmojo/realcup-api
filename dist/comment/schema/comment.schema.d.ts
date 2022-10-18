import mongoose, { Document } from 'mongoose';
export declare type CommentDocument = Comment & Document;
export declare class Comment {
    _id: mongoose.Types.ObjectId;
    _cupId: string;
    comment: string;
    nickname: string;
    winnerName: string;
    created: number;
}
export declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, any>, {}, {}, {}, {}, "type", Comment>;
