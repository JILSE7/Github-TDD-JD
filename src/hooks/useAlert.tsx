import { SyntheticEvent, useState } from "react";

const UseAlert = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    return {
        open,
        handleOpen,
        handleClose
    };
}

export default UseAlert