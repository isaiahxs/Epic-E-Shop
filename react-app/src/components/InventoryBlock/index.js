import React from 'react-redux'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import './InventoryBlock.css'

const InventoryBlock = ({item}) => {
    const history = useHistory();

    return (
        <>
            <div className={`img-container ${item.rarity}-container inv-clickable`} onClick={() => history.push(`/item/${item.name}`)}>
                <img className={`home-item-image ${item.rarity}`} src={item.images.icon} alt={item.name} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}/>
            </div>
            <div className='inventory-item-info inv-clickable' onClick={() => history.push(`/item/${item.name}`)}>
                <div className='inventory-item-name'>Item name: {item.name}</div>
                <div className='inventory-rarity-section'>Rarity: <span className='rarity' style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}>{item.rarity}</span></div>

                <div className='inventory-item-type'>Type: {item.type}</div>
                <div className='item-detail-price inventory-detail-price'>
                    <img src={item.priceIconLink} alt={item.priceIcon} className='vbucks-icon'/>
                    <div className='inventory-item-price'>{item.price}</div>
                </div>
            </div>
        </>
    )
}

export default InventoryBlock;