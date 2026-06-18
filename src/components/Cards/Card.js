import { useDrag } from 'react-dnd'
import { Box, Button, Grid, Card } from '@mui/material';


export const CardDrag = function CardDrag({ value, handleDropCard, index }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: value.name ? 'card' : 'none',
        item: value,
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                handleDropCard(index, dropResult.index);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }), [value, handleDropCard])
    const opacity = isDragging ? 0.4 : 1
    return (
        <img ref={drag} style={{ opacity }} data-testid={`box`} src={value.img ? value.img : 'Images/Placeholder.png'} alt={value.name ? value.name : ''}></img> 
    )
}
