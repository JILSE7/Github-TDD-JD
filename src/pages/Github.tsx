import { FC, useRef, useState } from 'react'
import { Container, Grid, Typography } from '@mui/material'
import {SearchBy, ButtonSeacrh, MessageCentral} from '../components/';
import TableRepositories from '../components/github-table/TableRepositories';
import { AlertCustom } from '../components/Alert';
import UseAlert from '../hooks/useAlert';

import { Item } from '../interfaces/IMockResponse';
export interface IStateSearch {
  isSearching:boolean,
  isSearchApplied:boolean,
  totalCount: number,
  repos: Item[] | undefined
};

const Github:FC = () => {
    const {open, handleClose, handleOpen} = UseAlert();
    const [search, setSearch] = useState<IStateSearch>({isSearchApplied:false,isSearching:false, totalCount:0,repos:[]});
    const [input, setInput] = useState<string>('');
    const searchInput = useRef<HTMLInputElement | null>(null);


    
    
  return (
    <Container >
      <Typography 
          variant='h3' 
          className='textWhite'
      >
        Buscador de repositorios de github
      </Typography>

      <Grid container spacing={2} justifyContent='space-evenly' marginTop={2} marginBottom={10}>
        <Grid item md={6} xs={12}>
          <SearchBy value={input} setValue={setInput} ref={searchInput}/>
        </Grid >
        <Grid item md={3} xs={12}>
          <ButtonSeacrh 
              value={searchInput.current?.value}
              isSearching={search.isSearching} 
              setState={setSearch} 
              handleOpen={handleOpen}
          />
        </Grid>
      </Grid>
      {
        search.isSearching?
        ( <MessageCentral message={'Buscando'}/> ) 
                          : 
        search.isSearchApplied ?
                            ( !!search.repos?.length ? 
                                    (<TableRepositories data={search.repos} totalCount={search.totalCount} />) 
                                    : 
                                    (<MessageCentral message={'Your search has no results, try different search criteria.'}/>))
                               :
                            ( <MessageCentral message={'Please provide a search option' }/>)
      }
      
      <AlertCustom open={open} handleClose={handleClose}/>
      </Container>
    
  )
}

export default Github;