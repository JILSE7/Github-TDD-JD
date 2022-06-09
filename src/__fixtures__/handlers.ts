import { DefaultBodyType, PathParams, ResponseComposition, RestContext, RestRequest } from 'msw';
import { utils } from '../utils';
//DRY
export const handlePaginated = (req:RestRequest<never, PathParams<string>>, res:ResponseComposition<DefaultBodyType>, ctx:RestContext) => (
    res(
        ctx.status(200),
        ctx.json({
            ...utils.mockResponse, 
            items:utils.getReposPerPage({currentPage:req.url.searchParams.get('page'), perPage:Number(req.url.searchParams.get('per_page'))})
        })
))
