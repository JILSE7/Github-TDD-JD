import { TextField } from "@mui/material"
import { forwardRef } from 'react';

interface IProps {
  value:string,
  setValue: (q:string) => void
}

const props = {
    label: 'Filter By',
    id: 'filterBy',
    fullWidth:true,
    
}



export const SearchBy= forwardRef<HTMLDivElement | null,IProps>(({value,setValue}:{value:string,setValue: (q:string) => void}, ref) => {

  
  
  
  return (
    <TextField {...props} inputRef={ref} color='secondary' name="inputSearch" />
  )
})

