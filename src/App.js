import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary'
import routes from './routes';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import UsersProvider from './context/UserContextProvider';
import { CircularProgress, Grid, Paper, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import DefaultError from './screens/DefaultError';
import AppComponent from './components/AppComponent';
import AppContextProvider from './context/AppContextProvider';
import theme from './utils/theme/theme';

function Home() {
	const loading = () => <div style={{
		position: 'absolute',
		height: '100vh',
		width: '100vw',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}}><CircularProgress /></div>
	const { user, signOut } = useAuthenticator((context) => [context.user]);
	const muiTheme = createTheme({
		...theme
	});

	return (

		<AppContextProvider>
			<UsersProvider>
				<ThemeProvider theme={muiTheme}>
					<CssBaseline />
					<AppComponent signOut={signOut} user={user}>
						<Suspense fallback={loading()} >
							<Routes>
								{routes.map((route, id) => (route.component ? (
									<Route
										key={id}
										name={route.name}
										path={route.path}
										exact={route.exact}
										element={<ErrorBoundary
											onError={() => { <Navigate replace to='/error' /> }} // doesn't have to navigate to display fallbackcomponent
											FallbackComponent={DefaultError}

										><route.component /></ErrorBoundary>}
									/>
								) : (null)))}
								<Route path='/' element={<Navigate replace to='/home' />} />
							</Routes>
						</Suspense>
					</AppComponent>
				</ThemeProvider>
			</UsersProvider>
		</AppContextProvider>

	);
}

function Login() {
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

		</Suspense>
	)

}

function App() {
	const { route } = useAuthenticator((context) => [context.route]);
	// return route === 'authenticated' ? <Home /> : <Login />;
	return <Home />;

}

function AppWithProvider() {

	return (
		<Authenticator.Provider>
			<App />
		</Authenticator.Provider>
	);
}

const appExport = (AppWithProvider);
export default appExport;


