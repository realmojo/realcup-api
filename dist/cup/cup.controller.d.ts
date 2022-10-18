import { CupService } from './cup.service';
import { Cup } from './schema/cup.schema';
export declare class CupController {
    private readonly cupService;
    constructor(cupService: CupService);
    addCup(body: any, req: any): Promise<Cup>;
    patchCup(param: any, body: any): Promise<Cup>;
    patchCupStatus(param: any, body: any): Promise<Cup>;
    patchCupImages(param: any, body: any): Promise<Cup>;
    patchCupImageWinnerCount(param: any): Promise<Cup>;
    getCupList(query: any): Promise<Cup[] | []>;
    getMyCupList(req: any): Promise<Cup[] | []>;
    getCup(param: any, query: any): Promise<Cup>;
}
