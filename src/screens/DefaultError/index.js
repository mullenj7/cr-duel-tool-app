import React from 'react';
import { Typography, Box } from '@mui/material';

function DefaultError() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            <Typography textAlign={'center'}>Error Occured</Typography>
        </Box>
    );
}

export default DefaultError;
