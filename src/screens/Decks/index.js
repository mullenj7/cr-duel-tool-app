import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import {
    Box, Typography, Card, CardActions, Button, Tab, Tabs, IconButton, Tooltip, Paper, Link, CardContent,
    Menu, MenuItem
} from '@mui/material';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';


import ConfirmationDialog from '../../components/Dialogs/ConfirmationDialog';
import DeckComponent from '../../components/Cards/DeckComponent';
import DeckBuilder from '../../components/Dialogs/DeckBuilder';
import { GeneralButton } from '../../components/Buttons/GeneralButton';
import { UserContext } from '../../context/UserContext';
import { AppContext } from '../../context/AppContext';



function Decks() {
    const EMPTY_DECK = [{}, {}, {}, {}, {}, {}, {}, {}];

    const [decks, setDecks] = useState([]);
    const [currentDeck, setCurrentDeck] = useState(EMPTY_DECK);
    const [copiedDeck, setCopiedDeck] = useState();
    const [value, setValue] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const deckDropdownOpen = Boolean(anchorEl);

    const { userDetails, updateUserAttributes, userSignedIn } = useContext(UserContext);
    const { loading } = useContext(AppContext);



    const handleChange = (newValue) => {
        if (newValue >= decks.length) { // if adding new deck
            const arr = [...decks];
            arr.push(EMPTY_DECK); // insert blank deck
            setDecks(arr);
        }
        else {
            setCurrentDeck(decks[newValue]);
        };
        setValue(newValue);

    };

    useEffect(() => {
        if (userDetails && userDetails.decks) {
            setDecks(userDetails.decks);
            //setCurrentDeck(userDetails.decks[value]);
        }
    }, [userDetails]);


    useEffect(() => {
        if (decks && decks.length >= 1) {
            setCurrentDeck(decks[value]);
        }
        //else setValue(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [decks]);

    const handleSaveDeck = async (userDecks) => {
        await updateUserAttributes({ decks: userDecks });
    }

    const handleDeleteDeck = async () => {
        var arr = [...decks];
        arr = arr.filter((d, index) => { return index !== value })
        await updateUserAttributes({ decks: arr });

        if (arr.length <= 0) { // no more decks
            setValue(false);
            setCurrentDeck(EMPTY_DECK);
        }
        else {
            setValue(0);
            setCurrentDeck(decks[0]);
        }
        setDeleteDialogOpen(false);
    }

    const handleCopyDeck = () => {
        setCopiedDeck(currentDeck);
    }

    const handlePasteDeck = async () => {
        const newDecks = decks.map((d, i) => {
            if (i === value) {
                return copiedDeck;
            } else {
                return d;
            }
        });
        setDecks(newDecks);
        await handleSaveDeck(newDecks);

    };

    const DeckButtons = () => {
        return <Box sx={{ width: '100%', mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title={'Edit Deck'}><IconButton size={'medium'} color='blue' sx={{ border: 2 }} onClick={() => { }}><CreateRoundedIcon /></IconButton></Tooltip>
        </Box>
    }

    const DeckMenu = () => {
        return <Menu
            anchorEl={anchorEl}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            keepMounted
            sx={{ p: 0, m: 0 }}
            open={deckDropdownOpen}
            onClose={() => setAnchorEl(false)}
        >
            <MenuItem
            >
                <Button
                    sx={{

                        display: 'flex',
                        justifyContent: 'space-between',
                        p: 0,
                        m: 0,
                        textTransform: 'none',
                    }}
                    onClick={() => { handleCopyDeck(); setAnchorEl(false); }}>
                    <Typography align="left">
                        Copy Deck
                    </Typography>
                </Button>
            </MenuItem>
            <MenuItem
            >
                <Button
                    sx={{

                        display: 'flex',
                        justifyContent: 'space-between',
                        p: 0,
                        m: 0,
                        textTransform: 'none',
                    }}
                    onClick={() => { handlePasteDeck(); setAnchorEl(false); }}
                    disabled={!copiedDeck}>
                    <Typography align="left">
                        Paste Deck
                    </Typography>
                </Button>
            </MenuItem>
        </Menu>
    }

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', pt: 0, flexGrow: 1, }}>
            {userSignedIn && !loading ? <>
                <Box elevation={1} sx={{ width: '90%', display: 'flex', justifyContent: 'center', p: 8 }}>
                    {decks && decks.length > 0 && currentDeck && currentDeck.length > 0 ?
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
                            <Card elevation={0} sx={{ border: 1, borderBottom: 1, py: 4, mb: 3, width: '25%' }}>
                                <Typography align='center' variant='h3' sx={{ fontWeight: 600 }}>My Decks</Typography>
                            </Card>
                            <Box sx={{ display: 'flex', width: '80%', height: '70%', justifyContent: 'center', }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Paper elevation={0} sx={{ border: 1, py: 1, }}>
                                        <Tabs value={value} onChange={(event, val) => { handleChange(val) }} orientation="vertical" indicatorColor='secondary' sx={{}}>
                                            {decks.map((d, i) => {
                                                return <Tab label={'Deck ' + (i + 1)} key={`saved-deck-tab-${i}`} sx={{ width: '100%', mr: 2, my: 0.4 }} />
                                            })}
                                            {
                                                decks.length < 10 && // max 10 decks
                                                <Tooltip title={'Add New Deck'}><Tab label={<AddRoundedIcon />}></Tab></Tooltip>
                                            }
                                        </Tabs>
                                    </Paper>
                                </Box>
                                <Card sx={{ width: '65%', height: '95%', display: 'flex', flexDirection: 'column', border: 1, borderLeft: 0, }} elevation={0}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 0.5, pr: 0.5 }}>
                                        <IconButton size='medium' sx={{}}
                                            onClick={(event) => setAnchorEl(event.currentTarget)}
                                        >
                                            <MoreVertIcon sx={{}} />
                                        </IconButton>
                                        <DeckMenu />
                                    </Box>
                                    <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0, m: 0, height: '100%', }}>
                                        {decks.map((d, i) => {
                                            return <Box value={value} index={i} hidden={value !== i} key={`saved-deck-${i}`} sx={{}}>
                                                <Button onClick={() => { setDialogOpen(true); }} sx={{ p: 0, m: 0 }}>
                                                    <Card elevation={0}>
                                                        <DeckComponent slots={currentDeck} setSlots={setCurrentDeck} isInteractive={false} DeckButtons={DeckButtons} isClickable={true} isLarge={true} size={150} />
                                                    </Card>
                                                </Button>
                                            </Box>
                                        })}
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: 'flex-end', alignItems: 'end', }} disableSpacing>
                                        <Tooltip title={'Delete Deck'}>
                                            <IconButton size='medium' color='error' sx={{ border: 2, mb: 1, mr: 1 }}
                                                onClick={() => { setDeleteDialogOpen(true); }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </CardActions>
                                </Card>
                            </Box>
                        </Box>
                        :
                        <Card sx={{ mt: 7, height: 400, width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <Typography variant='h4' align='center'>You currently have no saved decks</Typography>
                            <GeneralButton focusRipple
                                onClick={() => { handleChange(0) }}>
                                <Typography
                                    component="span"
                                    variant="subtitle1"
                                    sx={[
                                        {
                                            color: 'inherit',
                                        },
                                        (theme) => ({
                                            position: 'relative',
                                            p: 4,
                                            pt: 2,
                                            pb: `calc(${theme.spacing(1)} + 6px)`,
                                        }),
                                    ]}
                                >
                                    Add Deck
                                </Typography>
                            </GeneralButton>
                        </Card>
                    }
                </Box>
                {dialogOpen &&
                    <DeckBuilder slotArray={decks} setSlotArray={setDecks} slotIndex={value} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} decks={decks}
                        setDecks={setDecks} loadDeck={false} filterUsedCards={false}
                        saveDeck={true} handleSaveDeck={handleSaveDeck} />
                }
                {
                    deleteDialogOpen &&
                    <ConfirmationDialog title={'Delete Deck'} body={'Are you sure you want to delete this deck?'} onClose={() => { setDeleteDialogOpen(false) }} onSubmit={() => { handleDeleteDeck() }}
                        closeText={'Cancel'} submitText={'Delete'} dialogOpen={deleteDialogOpen} />
                }
            </> : <>{userSignedIn ?
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <img src='Blue Crown Animated 2.gif' alt='Blue Crown Animated 2.gif' style={{ height: 150 }}></img></Box>
                : <Box sx={{ p: 4, minHeight: 400, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <Typography variant='h4'>
                        You must be <Link href="http://localhost:3000/login">signed in</Link> to save decks
                    </Typography>
                </Box>}</>}
        </Box>

    );
}

export default Decks;
