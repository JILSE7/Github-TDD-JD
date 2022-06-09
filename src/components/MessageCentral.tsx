import { FC, ReactNode } from 'react'
import { Box, Typography } from '@mui/material'

export const MessageCentral:FC<{message?:string}> = ({message = 'Please provide a search option'}) => {
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} height={200}>
        <Typography>
            { message }
        </Typography>
    </Box>
  )
}

