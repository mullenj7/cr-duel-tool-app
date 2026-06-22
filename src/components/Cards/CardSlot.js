import React, { useEffect, useState } from 'react';

import { useDrop } from 'react-dnd'
import { Box, Typography, Grid, Card, IconButton, CardActions } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';

import { CardDrag } from './Card';


export const CardSlot = ({ value, handleDropCard, index, handleRemoveCard, handleSwitchType, swapCardType, isInteractive = false }) => {
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

    const InteractiveSlot = <div ref={drop} style={{ position: 'relative' }} data-testid="dustbin">
        <Card elevation={0} onMouseEnter={() => { setShowButton(true) }}
            onMouseLeave={() => { setShowButton(false) }}>
            {index === 2 && value.id && showButton && value.hasEvo && value.hasHero ? <IconButton
                onClick={() => { handleSwitchType(value) }}
                sx={{
                    color: swapCardType ? 'purple' : 'gold',
                    bgcolor: 'white',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    m: 0, p: 0
                }}>
                <SwapHorizRoundedIcon fontSize='medium' sx={{border:2, borderRadius: '50%'}} />
            </IconButton> : <></>}

            {value.id && showButton ? <IconButton
                onClick={() => { handleRemoveCard(index) }}
                sx={{
                    color: 'red',
                    bgcolor: 'white',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    m: 0, p: 0
                }}>
                <CancelIcon />
            </IconButton> : <></>}
            <CardDrag value={value} handleDropCard={handleDropCard} index={index} swapCardType={swapCardType} isInteractive={isInteractive} />
        </Card>
    </div>;

    const NonInteractiveSlot = <div style={{ position: 'relative' }}>
        <Card elevation={0}>
            <CardDrag value={value} index={index} swapCardType={swapCardType} isInteractive={isInteractive} />
        </Card>
    </div>;

    return (
        isInteractive ? InteractiveSlot : NonInteractiveSlot
    )
}
