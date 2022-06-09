import React, { useContext } from 'react';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { IRowsPageContext, RowsPageContext } from '../context/RowsPageContext';



interface IProps {
    open:boolean;
    handleClose: (event: Event | React.SyntheticEvent<Element, Event>, reason?: string | undefined) => void;

}

export const AlertCustom:React.FC<IProps> = ({open, handleClose}) => {
  const {hasError} = useContext<IRowsPageContext>(RowsPageContext);
  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        Close
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
    
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={hasError.message}
        action={action}
      />
    </div>
  );
}