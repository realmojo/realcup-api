import { CommentService } from './comment.service';
import { Comment } from './schema/comment.schema';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    addComment(body: any): Promise<Comment>;
    getCommentList(query: any): Promise<Comment[] | []>;
}
