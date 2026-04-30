import React from 'react';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { Box, Card, CardMedia, CardContent, Typography, Button, IconButton, MobileStepper } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import IMG1 from '../../static/img/20250920130405_1.jpg';
import IMG2 from '../../static/img/20250920130417_1.jpg';
import IMG3 from '../../static/img/20250920130521_1.jpg';
import IMG4 from '../../static/img/20250920130526_1.jpg';
import IMG5 from '../../static/img/20250920130811_1.jpg';


function SelectorDialog({  index, setIndex }) {
    const images = [IMG1, IMG2, IMG3, IMG4, IMG5];
    const huds = [
        {
            name: 'ahud',
            image: IMG1,
        },
        {
            name: 'toonHud',
            image: IMG2,
        },
        {
            name: 'flawHud',
            image: IMG3,
        },
        {
            name: 'default',
            image: IMG4,
        }
    ];

    const theme = useTheme();


    const handleArrow = (arrow) => {
        if (arrow === 'back') {
            setIndex((index > 0 ? index - 1 : 0));
        }
        else {
            setIndex(index < huds.length - 1 ? index + 1 : huds.length - 1);
        }
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <IconButton onClick={() => { handleArrow('back') }}>
                    <ArrowBackIosIcon />
                </IconButton>
                <Card sx={{ backgroundColor: 'red', height: 600, width: 1000, mx: 3 }} elevation={0} >
                    <img
                        //srcSet={`${IMG}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${huds[index].image}?w=164&h=164&fit=crop&auto=format`}
                        alt="{item.title}"
                        loading="lazy"
                        style={{ height: '100%', width: '100%' }}
                    />

                </Card>
                <IconButton onClick={() => { handleArrow('forward') }}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
            <Typography variant="h4">{huds[index].name}</Typography>
        </Box>
    );
}

export default SelectorDialog;
