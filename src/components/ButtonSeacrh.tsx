import { Button } from "@mui/material"
import { FC, useCallback, useContext, useEffect, useRef } from "react";
import { IRowsPageContext, RowsPageContext } from "../context/RowsPageContext";
import { IStateSearch } from "../pages/Github";
import { utils } from "../utils";
import UseAlert from '../hooks/useAlert';

interface IProps {
  isSearching:boolean;
  value:string | null | undefined;
  setState:(newState:IStateSearch)=>void;
  handleOpen: (newState:boolean) => void;
}

export const ButtonSeacrh:FC<IProps> = ({isSearching, value, setState, handleOpen}) => {
  const {rowsPerPage, page,sethasError} = useContext<IRowsPageContext>(RowsPageContext);

  
  
  
  const isMounted = useRef<boolean>(false);
  
  const handleSearch = useCallback(
    async(rowsPerPage:number = 30,page:number =0):Promise<void> => {
      try {
      
          setState({isSearching:true, isSearchApplied:false, totalCount:0, repos: undefined});

          const data = await utils.getRepos(value? value : '', page ,rowsPerPage);
          
          if(data.errors){
            setState({isSearching:false, isSearchApplied:true, repos:undefined, totalCount:data.total_count});
            sethasError({errors:{...data.errors[0]}, message:data.message});
            handleOpen(true);
            return;
          }

          setState({isSearching:false, isSearchApplied:true, repos:data.items, totalCount:data.total_count});
        
        } catch (error) {
          console.log(error);
        }
      },
      [value,setState, sethasError],
    )
    

  useEffect(() => {
      
    if(!isMounted.current){
      isMounted.current = true;
      return;
    }

    handleSearch(rowsPerPage, page);
  }, [handleSearch, page, rowsPerPage])
  
    

  return (
    <Button fullWidth disabled={isSearching} onClick={() => handleSearch()} variant="contained" color="secondary">Search Repository</Button>
  )
}
