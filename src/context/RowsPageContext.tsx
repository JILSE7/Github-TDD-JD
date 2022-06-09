import { createContext, FC, ReactNode, useState } from 'react';

export interface IRowsPageContext {
    page: number;
    rowsPerPage: number;
    setPage: (newState?:number) => void;
    setRowsPerPage: (newState?:any) => void
    hasError: IErrorApi;
    sethasError: (newState?:IErrorApi) => void
}



export interface IErrorApi {
    message?:  string;
    errors?:   {resource:string, field:string, code:string}
}

export const RowsPageContext = createContext({} as any);

export const RowsPageProvider:FC<{children:ReactNode}> = ({children}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(30);
    const [hasError, sethasError] = useState<IErrorApi>({})


    return (
        <RowsPageContext.Provider value={{page,rowsPerPage,hasError, sethasError,setPage,setRowsPerPage,}}>
            {children}
        </RowsPageContext.Provider>
    )
}