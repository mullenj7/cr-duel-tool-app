import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { AppBar, Box } from '@mui/material';

function AppComponent({ children, ...props }) {
	console.debug('in app component');
	return (
		<BrowserRouter>
			<Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
				<AppLayout>
					{children}
				</AppLayout>
			</Box>
		</BrowserRouter>

	);
}

function AppLayout({ children }) {
	return (
		<Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
			{/* <AppBar position='fixed' color='red' /> */}
			{children}
		</Box>
	)
}

export default AppComponent;
