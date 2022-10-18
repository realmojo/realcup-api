import { Model } from 'mongoose';
import { Cup, CupDocument } from './schema/cup.schema';
import { CreateCupDto } from './dto/create-cup.dto';
export declare class CupService {
    private cupModel;
    constructor(cupModel: Model<CupDocument>);
    findOne(_id: string): Promise<Cup | undefined>;
    findOneByTitle(title: string): Promise<Cup | undefined>;
    getCup(_id: string): Promise<Cup | undefined>;
    getCupList({ category, page }: {
        category: any;
        page: any;
    }): Promise<Cup[] | undefined>;
    getMyCupList(_userId: any): Promise<Cup[] | undefined>;
    addCup(createCupDto: CreateCupDto): Promise<Cup | undefined>;
    patchCup(_id: string, body: {
        title: string;
        description: string;
        category: string;
    }): Promise<Cup | undefined>;
    patchCupPlayCount(_id: string): Promise<Cup | undefined>;
    patchCupStatus(_id: string, status: string): Promise<Cup | undefined>;
    patchCupImages(_id: string, images: object): Promise<Cup | undefined>;
    patchCupImageWinnerCount(_id: string, _imageId: string): Promise<Cup | undefined>;
    removeCup(_id: string): Promise<Cup | undefined>;
}
