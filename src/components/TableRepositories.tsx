import { FC, useContext, useId } from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from '@mui/material';
import { Item } from '../interfaces/IMockResponse';
import { IRowsPageContext, RowsPageContext } from '../context/RowsPageContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'purple',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'white',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: 'purple',
    color: 'purple',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));


const headRows : string[] = ['Repository','Starts','Forks','Open Issues','Update At'];

export const TableRepositories:FC<{data:Item[]}> = ({data}) => {
  const reactId = useId();
  /* const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30); */

  const {page, rowsPerPage, setPage, setRowsPerPage} = useContext<IRowsPageContext>(RowsPageContext);


  const handleChangePage = (_: unknown, newPage: number) => {
    console.log('cambie');
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('cambie');
    setRowsPerPage(+event.target.value);
    //setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {
                headRows.map((item,k) => (<StyledTableCell align="center" key={reactId + k}>{item}</StyledTableCell>))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
                data.map((row) => (
                  <StyledTableRow key={reactId + row.id}>
                  <StyledTableCell align="left">
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        variant="dot"
                      >
                      <Avatar alt={row.name} src={row.owner.avatar_url} style={{border:'1px solid purple', marginRight: '2px'}}/>
                      </StyledBadge>
                      <Link href={row.html_url} target='_blank'>{row.name}</Link>
                  </StyledTableCell>
                  <StyledTableCell align='center'>{row.stargazers_count}</StyledTableCell>
                  <StyledTableCell align="center">{row.forks_count}</StyledTableCell>
                  <StyledTableCell align="center">{row.open_issues_count}</StyledTableCell>
                  <StyledTableCell align="center">{row.updated_at}</StyledTableCell>
                  </StyledTableRow>
                ))                
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[30,50, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}





