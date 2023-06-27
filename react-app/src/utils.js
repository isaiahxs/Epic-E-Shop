//returning specific background colors based on item's rarity

export const getItemBackgroundColor = (rarity) => {
    switch(rarity) {
        case 'uncommon':
            return '#5da81d';
        case 'rare':
            return '#28a8e7';
        case 'epic':
            return '#a94de3';
        case 'legendary':
            return '#b97034';
        case 'dc':
            return '#5171c1';
        case 'icon_series':
            return '#33aeae';
        case 'shadow':
            return '#626262';
        case 'marvel':
            return "#ba2f2f";
        case 'gaming_legends':
            return "#4c3fc6";
        default:
            return 'grey';
    }
}