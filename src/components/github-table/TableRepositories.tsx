import { FC, useContext } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';

import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';


import { IRowsPageContext, RowsPageContext } from '../../context/RowsPageContext';
import { Item } from '../../interfaces/IMockResponse';
import TableHeader from './TableHeader';
import TableRepositoriesBody from './TableRepositoriesBody';


const TableRepositories:FC<{data:Item[], totalCount:number}> = ({data, totalCount}) => {

    const {page, rowsPerPage, setPage, setRowsPerPage} = useContext<IRowsPageContext>(RowsPageContext);

    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => setRowsPerPage(+event.target.value);
   
    const props = {
        rowsPerPageOptions: [30,50, 100],
        component: 'div',
        rowsPerPage:rowsPerPage,
        page,
        onPageChange: handleChangePage,
        onRowsPerPageChange : handleChangeRowsPerPage
    }

return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
         <TableHeader/>
         <TableRepositoriesBody data={data}/>
        </Table>
      </TableContainer>
      <TablePagination
        {...props}
        count= {totalCount}
      />
    </Paper>
  )
}


export default TableRepositories;





