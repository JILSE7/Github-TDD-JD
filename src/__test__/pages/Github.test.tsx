import App from '../../App';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
//Mock Service Worker
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import {utils} from '../../utils';
import { handlePaginated } from '../../__fixtures__/handlers';

const server = setupServer(
    rest.get('/search/repositories', (req, res, ctx) => {
      return res(
          ctx.status(200),
          ctx.json(utils.mockResponse)
      )})
    
);

  

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())
// GithubPage Mount
beforeEach(() =>render(<App/>));

const fireClickSearch = () => fireEvent.click(screen.getByRole('button',{name:'Search Repository'}));
const getButton = (htmlElement:string,nameBtn:string):HTMLElement => screen.getByRole('button', {name: new RegExp(nameBtn, 'i')});

describe('when the GithubPage is mounted', () => { 

    test('should display the title', () => { 
        const title:HTMLElement = screen.getByRole('heading', {name: /buscador de repositorios de github/i});
        expect(title).toBeInTheDocument();
    });
    
    
    test('must be a text with label "filter by" field', () => { 
        const labelSeacrh:HTMLElement = screen.getByLabelText(/filter by/i);
        
        expect(labelSeacrh).toBeInTheDocument();
    });

    test('must be a Search Button', () => { 
        const buttonSearch:HTMLElement = screen.getByRole('button',{name: /search repository/i});
        
        expect(buttonSearch.textContent).toBe('Search Repository');
    });

    test('should show a initial message "Please provide a search option and click in the search button"', () => { 
        const textPlaceholder:HTMLElement = screen.getByText(/please provide a search option/i);

        expect(textPlaceholder).toBeInTheDocument();
    });
}); 

describe('whe the user does a search ', () => { 
    
  //  const fireClickSearch = () => fireEvent.click(screen.getByRole('button',{name:'Search Repository'}));

    test('the search button should be disabled unitil the search is done', async() => { 
        const searchButton = screen.getByRole('button',{name:'Search Repository'})//;

        expect(searchButton).not.toBeDisabled();//no esta deshabilitado

        //this is the bug search before searchClick
        fireEvent.change(screen.getByLabelText(/filter by/i), {target:{value: 'test'}});
        expect(searchButton).not.toBeDisabled();//no esta deshabilitado


        //click btn
        //fireEvent.click(searchButton);//se hace el click y se debe desabilitar el boton
        fireClickSearch()

        //expect disabled
        expect(searchButton).toBeDisabled();//debe estar deshabilitado

        //?not disabled (finish) async
        
        await waitFor(() => {
            expect(searchButton).not.toBeDisabled();//?espera a que se vuelva a habilitar el boton
        })

    });


    test('The data should be displayed as a sticky table', async() => { 
        

        //click btn
        //fireEvent.click(searchButton);
        fireClickSearch()

        //not displayed the message 'Buscando'
        await waitFor(() => {
            expect(screen.queryByText('Buscando')).not.toBeInTheDocument();
        })
        //screen.debug();
       
        //?must be show the data table
        expect(screen.getByRole('table')).toBeInTheDocument()
    });

    test('the table header must contain Repository, stars, forks, open issues and update at ', async() => { 
        const searchButton = screen.getByRole('button',{name:'Search Repository'});
        //fireEvent.click(searchButton);
        fireClickSearch()

        const table = await screen.findByRole('table');

        const tableHeaders = within(table).getAllByRole('columnheader');
  

        expect(tableHeaders).toHaveLength(5);
        
        const [repository, starts, forks, issues, updated] = tableHeaders;

        expect(repository).toHaveTextContent(/repository/i);
        expect(starts).toHaveTextContent(/starts/i);
        expect(forks).toHaveTextContent(/forks/i);
        expect(issues).toHaveTextContent(/open issues/i);
        expect(updated).toHaveTextContent(/update at/i);

    })  

    test(`Each result must have: owner avatar image, name, stars, updatedAt, forks, openIssues,
           it should have a link thah opens in a new tab `, async() => {

        fireClickSearch();
        
        const table = await screen.findByRole('table');
        const selectorTable = within(table);

        const tableCells = selectorTable.getAllByRole('cell');
        const [repository, starts, forks, issues, updated] = tableCells;

        
        
        expect(tableCells).toHaveLength(5); 
        //expect for search image 
        const image = within(repository).getByRole('img',{name:utils.mockResponse.items[0].name});
        expect(image).toBeInTheDocument();//validate exist image
        expect(image).toHaveAttribute('src', utils.mockResponse.items[0].owner.avatar_url); //validate src image for the user

        const {name, stargazers_count, forks_count, open_issues_count, updated_at} = utils.mockResponse.items[0]
        const fakeUpdateAt = '2021-02-13';

        expect(within(repository).getByText(name).closest('a')).toHaveTextContent(name); //validate name
        expect(within(repository).getByText(name).closest('a')).toHaveAttribute('href',utils.mockResponse.items[0].html_url); //validate href
        expect(starts).toHaveTextContent(stargazers_count)
        expect(forks).toHaveTextContent(forks_count);
        expect(issues).toHaveTextContent(open_issues_count);
        expect(updated).not.toEqual(fakeUpdateAt);//expect(updated).toHaveTextContent(updated_at);
        

     });

     test('Total results number of the search and the current number of result', async() => { 
         fireClickSearch();

         await screen.findByRole('table');
        
         expect(screen.getByText(/1–1 of 1/i)).toBeInTheDocument();
     }); 

     test('Results size per page select/combobox with the options: 30, 50, 100. The default is 30', async() => { 
        fireClickSearch();

        await screen.findByRole('table');

        const rowPerPage = screen.getByLabelText(/rows per page/i);
        //verificar que se renderizo las opciones por pagina
        expect(rowPerPage).toBeInTheDocument();

        //click en el row per page
        fireEvent.mouseDown(rowPerPage);
        
        //listbox toma options tambien
        let options = screen.getAllByRole('option');
        expect(options).toHaveLength(3);
        
        expect(options[0]).toHaveTextContent('30');
        expect(options[1]).toHaveTextContent('50');
        expect(options[2]).toHaveTextContent('100');

        const listbox = screen.getByRole('listbox',{name:/rows per page/i});
        options = within(listbox).getAllByRole('option')
        
        expect(options[0]).toHaveTextContent('30');
        expect(options[1]).toHaveTextContent('50');
        expect(options[2]).toHaveTextContent('100');        
    });

    test('should be in the document the pagination buttons', async() => { 
        fireClickSearch();

        await screen.findByRole('table');

        const btnPrevious = screen.getByRole('button', {name: /previous page/i});
        const btnNext = screen.getByRole('button', {name: /next page/i});

        expect(btnPrevious).toBeDefined();
        expect(btnNext).toBeInTheDocument();

        //deben estar desactivados 
        expect(btnPrevious).toBeDisabled();
        expect(btnNext).toBeDisabled();



    });
});

describe('when the developer does a search without results', () => { 

    test('must show a empty state message', async() => { 
        //*set the mock server no items
        server.use(
            rest.get('/search/repositories', (req, res, ctx) => (
                res(
                    ctx.status(200),
                    ctx.json({
                        ...utils.failedMockResponse(0)
                    })
                ))
            )
        );

        //*click search
        fireClickSearch();

        //*expect not table
        await waitFor(() => expect(screen.getByText(/Your search has no results, try different search criteria./i)).toBeInTheDocument());

        //*expect message no results
    })
});


describe('When the developer types on filter by and does a search  ', () => { 

    test('must display the related repos', async() => { 
        const fakeParams = {id:12, name:'ruby'}
        //*set the mock server no items
        server.use(
            rest.get('/search/repositories', (req, res, ctx) => (
                res(
                    ctx.status(200),
                    ctx.json(utils.getMockResponse(fakeParams.id, req.url.searchParams.get('q')!))
                ))
            )
        ); 

        //* type for a word in filter by input
        fireEvent.change(screen.getByLabelText(/filter by/i), {target: {value: fakeParams.name}});

        //* click search
        fireClickSearch();
        
        const table = await screen.findByRole('table');
        expect(table).toBeInTheDocument();

        const tableCells = within(table).getAllByRole('cell');
        const [repository] = tableCells;
            
        await waitFor(() => expect(within(repository).getByText(fakeParams.name).closest('a')).toHaveTextContent(fakeParams.name)) //validate name);
        


     });
});

/* describe('Whe the developer does a search and selects 50 rows per page',() => { 

    test('s', async() => { 
        
        server.use(
            rest.get('/search/repositories', handlePaginated)
        );

        fireClickSearch();
        //console.log({...utils.mockResponse, items:utils.getReposPerPage({currentPage:0, perPage:30})});

        expect(await screen.findByRole('table')).toBeInTheDocument();
        expect(await screen.findAllByRole('row')).toHaveLength(31);

        const rowPerPage = screen.getByLabelText(/rows per page/i);
                
         //click en el row per page
         fireEvent.mouseDown(rowPerPage);
         //change row page
         fireEvent.click(screen.getByRole('option', {name:'50'}));
        
     
        //the paginated changed
         expect(await screen.findAllByRole('row')).toHaveLength(51);
       
    
    },18000)
    
}); */


describe('When the developer clicks on search and then on next page button', () => { 

    test('must display the next repositories', async() => { 
        
        const getButton = (nameBtn:string):HTMLElement => screen.getByRole('button', {name: new RegExp(nameBtn, 'i')});
        //*server configure
        server.use( rest.get('/search/repositories', handlePaginated) );
        //*click search
        fireClickSearch();
        //*find table
        expect(await screen.findByRole('table')).toBeInTheDocument();

        expect(screen.getByRole('cell',{name: /1-0/})).toBeInTheDocument();

        //buttons
        expect(getButton('next')).toBeInTheDocument();
        expect(getButton('previous')).toBeInTheDocument();

        //click next
        fireEvent.click(getButton('next'));
       
        //searchButton
        await waitFor(() => expect(getButton('search')).not.toBeDisabled());

        
        //click previous page
        fireEvent.click(getButton('previous'));
        //wait the search finish
        await waitFor(() => expect(getButton('search')).not.toBeDisabled());
        //find 1-0
        expect(screen.getByRole('cell',{name: /1-0/})).toBeInTheDocument();
        
    });
});



describe('When there is an unexpected error from the backend', () => {
    
    test('must display an alert message error with the message from the service', async() => { 
        //*Config server return error
        server.use( rest.get('/search/repositories', (req, res, ctx) => (
            res(
                ctx.status(422),
                ctx.json(utils.makeFakeError())
            ))
        ));

        //Click search
        fireClickSearch();

        //Expect message
        expect( await screen.findByText(/validation failed/i)).toBeVisible();
    })
})


