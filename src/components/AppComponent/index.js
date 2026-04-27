import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { AppBar, Box, Toolbar,IconButton ,Typography,Button} from '@mui/material';

function AppComponent({ children, ...props }) {

	return (
		<BrowserRouter>

			<Box sx={{  width: '100%', height: '100%' }}>
				<AppLayout>
					{children}
				</AppLayout>
			</Box>
		</BrowserRouter>

	);
}

function AppLayout({ children }) {
	return (
		<Box sx={{ display: 'flex', width: '100%', height: '100%', backgroundColor:'green' }}>
			{/* <AppBar position='fixed' color='red' /> */}
			{children}
		</Box>
	)
}

export default AppComponent;
