import { FC, useId } from 'react';
import { Avatar, Badge, Link, TableBody } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { Item } from '../../interfaces/IMockResponse';


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
  
  
const TableRepositoriesBody:FC<{data:Item[]}> = ({data}) => {
 const reactId = useId();
  return (
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
  )
}

export default TableRepositoriesBody