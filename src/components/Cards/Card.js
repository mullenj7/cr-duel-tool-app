import { useDrag } from 'react-dnd'


export const CardDrag = function CardDrag({ value, handleDropCard, index, swapCardType, isInteractive = false, isLarge, size }) {

    const getNewIMGString = (type) => {
        try {
            const split = (value.img).split(".");
            const newImg = `${split[0]}-${type}.${split[1]}`
            return newImg;
        }
        catch (e) { return 'Images/empty-slot.png'; }
    }

    const getIMG = () => {
        try {
            if (index <= 2) {
                if (index === 0) { // can only be evo or normal
                    if (value.hasEvo) {
                        return getNewIMGString('ev1');
                    }
                    return value.img;
                }
                else if (index === 1) { // can be hero or champion or normal
                    if (value.hasHero) {
                        return getNewIMGString('hero');
                    }
                    return value.img;
                }
                else { // can be evo or hero or champion or normal
                    if (value.hasEvo && value.hasHero) {
                        return !swapCardType ? getNewIMGString('ev1') : getNewIMGString('hero');
                    }
                    else if (value.hasEvo) {
                        return getNewIMGString('ev1');
                    }
                    else if (value.hasHero) {
                        return getNewIMGString('hero');
                    }
                    else return value.img;
                }
            }
            else return value.img;
        }
        catch (e) {
            console.debug(e);
            return 'Images/empty-slot.png';
        }
    }

    const [{ isDragging }, drag] = useDrag(() => ({
        type: value.id ? 'card' : 'none',
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
    const opacity = isInteractive ? (isDragging ? 0.4 : 1) : 1
    return (
        <img ref={drag} style={{ opacity, height: size }} data-testid={`box`} src={value.img ? getIMG() : 'Images/empty-slot.png'} alt={value.id ? value.id : ''}></img>
    )
}
