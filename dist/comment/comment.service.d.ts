import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schema/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentService {
    private commentModel;
    constructor(commentModel: Model<CommentDocument>);
    findOne(_id: string): Promise<Comment | undefined>;
    getCommentList({ _cupId, page }: {
        _cupId: any;
        page: any;
    }): Promise<Comment[] | undefined>;
    addComment(createCommentDto: CreateCommentDto): Promise<Comment | undefined>;
}
