import { Button } from '@mui/material'
import React from 'react'

type Child = {
    children: String,
}

const SvgLoadButton = ({ children }: Child) => {
    return (
        <Button
            variant="contained"
            className="bg-base-gray rounded-md"
        >
            {children}
        </Button>
    )
}

export default SvgLoadButton