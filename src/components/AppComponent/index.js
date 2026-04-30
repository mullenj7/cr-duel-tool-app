import React, { useState, useContext } from 'react';
import { BrowserRouter } from "react-router-dom";
import {
	AppBar, Box, Toolbar, IconButton, Button,
	Typography, MenuItem, Menu, Divider, Dialog,
	List, ListItem, DialogTitle
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import Home from '@mui/icons-material/Home';
import { UserContext } from '../../context/UserContext';
import { AppContext } from '../../context/AppContext';

function AppComponent({ children, signOut, user, }) {

	return (
		<BrowserRouter>
			{/* <Paper style={{ minHeight: '100vh' }}> */}
			<Box sx={{ minHeight: '100vh' }}>
				<AppLayout
					children={children}
					signOut={signOut}
					user={user}
				>
					{/* {children} */}
				</AppLayout>
			</Box>
			{/* </Paper> */}
		</BrowserRouter>
	);
}

function AppLayout({ children, signOut, user }) {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const dropdownOpen = Boolean(anchorEl);
	


	const { setLoading, } = useContext(AppContext);
	const theme = useTheme();
	console.log(theme);

	return (
		<Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

			<AppBar position='static' sx={{ py: 2 }}>

				<Toolbar>
					<IconButton onClick={() => { navigate('/home') }}><Home sx={{ color: 'white' }} /></IconButton>
					<Typography variant="h4" component="div" sx={{ flexGrow: 1, pl: 5 }}>
						TF2 Hud Customizer
					</Typography>
					<IconButton
						onClick={(event) => setAnchorEl(event.currentTarget)}
					>
						<PersonIcon sx={{ color: 'white' }} />

					</IconButton>
					<Menu
						id="client-settings"
						anchorEl={anchorEl}
						transformOrigin={{ horizontal: 'right', vertical: 'top' }}
						anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
						keepMounted
						sx={{ p: 0, m: 0 }}
						open={dropdownOpen}
						onClose={() => setAnchorEl(null)}
					>

						<Typography variant='h6' align="left" sx={{ pl: 2 }}>Name here</Typography>
						<Box sx={{ display: 'flex', pl: 2, pb: 2, justifyContent: 'flex-start' }}>
							<Typography align="left" >{'none selected'}</Typography>
							<Button onClick={() => { console.log('hi') }} sx={{ p: 0, m: 0, ml: 1 }}><Typography variant='subtitle2'>change</Typography></Button>
						</Box>
						<Divider variant="middle" />
						<MenuItem
						>
							<Button
								sx={{
									width: 200,
									display: 'flex',
									justifyContent: 'space-between',
									padding: 0,
									color: 'black',
									textTransform: 'none',
								}}
								onClick={signOut}>
								<Typography align="left">
									Log Out
								</Typography>
							</Button>
						</MenuItem>
					</Menu>

				</Toolbar>
			</AppBar>

			<Box sx={{ flexGrow: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
				{children}
			</Box>
		</Box >
	)
}

export default AppComponent;
