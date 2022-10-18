import mongoose from 'mongoose';
export declare class CreateCommentDto {
    readonly _id: mongoose.Types.ObjectId;
    readonly _cupId: string;
    readonly comment: string;
    readonly nickname: string;
    readonly winnerName: string;
    readonly created: number;
}
