import React, { useEffect, useState } from 'react';

import { useDrop } from 'react-dnd'
import { Box, Typography, Grid, Card, IconButton, CardActions } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';


import { CardDrag } from './Card';


export const CardSlot = ({ value, handleDropCard, index, handleRemoveCard }) => {
    const [showButton, setShowButton] = useState(false);

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'card',
        drop: () => ({ index: index, }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))
    const isActive = canDrop && isOver
    let backgroundColor = '#222'
    if (isActive) {
        backgroundColor = 'darkgreen'
    } else if (canDrop) {
        backgroundColor = 'darkkhaki'
    }
    return (
        <div ref={drop} style={{ backgroundColor, position: 'relative' }} data-testid="dustbin">
            <Card elevation={0} variant='outlined' onMouseEnter={()=>{setShowButton(true)}}
                onMouseLeave={()=>{setShowButton(false)}}>
                {value.name && showButton ? <IconButton 
                onClick={()=>{handleRemoveCard()}}
                sx={{
                    color: 'red',
                    bgcolor: 'white',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    m:0, p:0
                }}>
                    <CancelIcon />
                </IconButton> : <></>}
                <CardDrag value={value} handleDropCard={handleDropCard} index={index} /></Card>
        </div>
    )
}
