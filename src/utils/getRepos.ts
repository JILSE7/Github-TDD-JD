import repos30Paginated from '../__fixtures__/repos-30-paginated.json';
import repos50Paginated from '../__fixtures__/repos-50-paginated.json';
import { MockeReponse } from '../interfaces/IMockResponse';
import { failedMockResponse, getMockResponse, mockResponse, makeFakeError } from './mockResponse';

const baseUrl = process.env.NODE_ENV === 'test' ? '' : process.env.REACT_APP_BASE_URL;
const token = process.env.REACT_APP_TOKEN;

 const getRepos = async (q:string, page:number=0, rowsPerPage:number=30):Promise< MockeReponse> => {
    try {
        return await (await fetch(`${baseUrl}/search/repositories?q=${q}&page=${page}&per_page=${rowsPerPage}`,{
            headers:{
                'Authorization': `token ${token}`
            }
        })).json() as MockeReponse;
        
    } catch (error) {
        console.log('jpasss');
        return failedMockResponse(0);
    }

}


const getReposPerPage = ({currentPage,perPage}:{currentPage:any, perPage:number}) => {
    
    return perPage === 30 ? 
        repos30Paginated[currentPage] : repos50Paginated[currentPage]
}


export default {
    mockResponse,
    failedMockResponse,
    getRepos,
    getMockResponse,
    getReposPerPage,
    makeFakeError
}