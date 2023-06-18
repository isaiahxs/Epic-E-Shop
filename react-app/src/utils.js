//returning specific background colors based on item's rarity

export const getItemBackgroundColor = (rarity) => {
    switch(rarity) {
        case 'common':
            return 'green';
        case 'rare':
            return '#28a8e7';
        case 'epic':
            return 'purple';
        case 'legendary':
            return 'orange';
        default:
            return 'grey';
    }
}