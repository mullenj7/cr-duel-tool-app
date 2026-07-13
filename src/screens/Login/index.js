import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { CircularProgress, Grid, Paper, Box } from '@mui/material';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';



function Login() {
    const { route } = useAuthenticator((context) => [context.route]);

    const loading = () => <div style={{
        position: 'absolute',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}><CircularProgress /></div>
    return (

        <Suspense fallback={loading()}>
            {route !== 'authenticated' ?
                <Grid container spacing={0} height="100vh">
                    <Grid item sm={4} md={7} sx={{
                        backgroundColor: 'rgb(2,125,149)'
                    }}>
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} padding={0}>
                        <Paper elevation={18} sx={{
                            minHeight: '100vh',
                            padding: '1.5rem',
                            marginTop: 0,
                        }}>
                            <Box sx={{ height: '100px' }} />
                            <Authenticator hideSignUp={false} initialState={'signIn'} />
                        </Paper>
                    </Grid>
                </Grid>
                :
                <Navigate replace to='/home' />
            }
        </Suspense>
    )
}


function AppWithProvider() {

	return (
			<Login />
	);
}
const appExport = (AppWithProvider);

export default appExport