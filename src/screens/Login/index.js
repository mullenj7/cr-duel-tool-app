import React, { Suspense } from 'react';
import { Navigate } from 'react-router-dom';

import { Box } from '@mui/material';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '../../index.css'



function Login() {
    const { route } = useAuthenticator((context) => [context.route]);

    const loading = () => <div style={{
        position: 'absolute',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}> <img src='Blue Crown Animated 2.gif' alt='Blue Crown Animated 2.gif' style={{ height: 150 }}></img></div>
    return (

        <Suspense fallback={loading()}>
            {route !== 'authenticated' ?
                <Box elevation={18} sx={{
                    height: '100%',
                    flexGrow: 1,
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <Authenticator hideSignUp={false} initialState={'signIn'} style={{ color: 'red' }} />
                </Box>
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