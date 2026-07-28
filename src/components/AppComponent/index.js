import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import {
	AppBar, Box, Toolbar, IconButton, Button,
	Typography, MenuItem, Menu, Divider, Link, ButtonBase

} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import BoltIcon from '@mui/icons-material/Bolt';
import Home from '@mui/icons-material/Home';
import { UserContext } from '../../context/UserContext';
import { AppContext } from '../../context/AppContext';
import { setUpTOTP } from '@aws-amplify/auth';



import template from '../../template.svg'


function AppComponent({ children, signOut, user, }) {
	const theme = useTheme();

	return (
		<BrowserRouter>
			<Box sx={{ minHeight: '100vh' }}>
				<AppLayout
					children={children}
					signOut={signOut}
					user={user}
				>
				</AppLayout>
				<Box sx={{ bgcolor: theme.palette.background.dark, minHeight: 150, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', pb: 4 }}>
					<Typography variant='subtitle2' sx={{ color: theme.palette.text.gray }}>
						This material is unofficial and is not endorsed by Supercell. For more information see
						<Link target="_blank" href="https://supercell.com/en/fan-content-policy/"> Supercell's Fan Content Policy.
						</Link>
					</Typography>

				</Box>

			</Box>
		</BrowserRouter>
	);
}

function AppLayout({ children, signOut, user }) {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const dropdownOpen = Boolean(anchorEl);

	const { setLoading, } = useContext(AppContext);
	const { setUserSignedIn } = useContext(UserContext);
	const theme = useTheme();

	const handleSignIn = () => {
		setAnchorEl(false);

		navigate('/login');
	}
	const handleSignOut = () => {
		setUserSignedIn(false);
		signOut();
		setAnchorEl(false);
		navigate('/home', { replace: true });

	}

	return (
		<Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', }}>
			<AppBar position='static' elevation={3} sx={{ py: 1, backgroundImage: `url(${template})`, backgroundSize: 'content', }}>
				<Toolbar>
					<IconButton onClick={() => { navigate('/home') }} sx={{}} ><BoltIcon sx={{ color: 'gold', fontSize: 48 }} /></IconButton>
					<Typography variant="h3" color='primary' sx={{ flexGrow: 1, pl: 5, color: 'white' }} >
						Clash Royale Duel Tool
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
						onClose={() => setAnchorEl(false)}
					>
						{user && user.signInDetails && user.signInDetails.loginId &&
							<>
								<Typography align="left" sx={{ p: 2 }}>{user.signInDetails.loginId}</Typography>
								<Divider variant="middle" />
								<MenuItem
								>
									<Button
										sx={{
											width: 200,
											display: 'flex',
											justifyContent: 'space-between',
											p: 0,
											m: 0,
											textTransform: 'none',
										}}
										onClick={() => {
											navigate('/decks', { replace: true }); setAnchorEl(false);
										}}>
										<Typography align="left">
											My Decks
										</Typography>
									</Button>
								</MenuItem>
							</>
						}
						<MenuItem
						>
							<Button
								sx={{
									width: 200,
									display: 'flex',
									justifyContent: 'space-between',
									p: 0,
									m: 0,
									textTransform: 'none',
								}}
								onClick={user ? handleSignOut : handleSignIn}>
								<Typography align="left">
									{user ? 'Log Out' : 'Log In'}
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