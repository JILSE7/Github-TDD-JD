import { TableHead, TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { FC, useId } from "react";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'purple',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
const headRows : string[] = ['Repository','Starts','Forks','Open Issues','Update At'];

const TableHeader:FC = () => {
  const headerId = useId()
  return (
    <TableHead>
        <TableRow>
        {
            headRows.map((item,k) => (<StyledTableCell align="center" key={headerId + k}>{item}</StyledTableCell>))
        }
        </TableRow>
  </TableHead>
  )
}

export default TableHeader