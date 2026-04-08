import React, { Suspense } from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import routes from './routes';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { CircularProgress } from '@mui/material';
import DefaultErrorBoundary from './components/errors/DefaultErrorBoundary'
import AppComponent from './components/AppComponent';

function App() {
	const loading = () => <CircularProgress />

	const testFunction = (route, id) => {
		console.debug('route is ', route);
		return (<Route
			key={id}
			name={route.name}
			path={route.path}
			exact={route.exact}
			element={route.component}
		/>)
	}
	console.debug('in app')
	return (

		// <Authenticator.Provider>
		<React.StrictMode>
			<AppComponent>
				{/* <BrowserRouter> */}
					<Suspense fallback={loading()}>
						<Routes>
							{routes.map((route, id) => (route.component ? (
								<Route
									key={id}
									name={route.name}
									path={route.path}
									exact={route.exact}
									element={<route.component />}
								/>
							) : (null)))}
							<Route path='/' element={<Navigate replace to='/home' />} />
						</Routes>
					</Suspense>
				{/* </BrowserRouter> */}
			</AppComponent>
		</React.StrictMode>
		//</Authenticator.Provider>
	);
}

export default App;