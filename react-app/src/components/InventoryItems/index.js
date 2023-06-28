import {useSelector, useDispatch} from 'react-redux'
import { setSeedItems, setDailyItems, setFeaturedItems, setCurrentItem, getSeedItems, getDailyItems, getFeaturedItems } from '../../store/items'
import { setLikes, getLikes } from '../../store/like'
import { getComments } from '../../store/comments'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import { getInventory } from '../../store/inventory'
import { getReminders } from '../../store/reminders'
import vbucks from '../../assets/images/vbucks-icon.webp'
import './InventoryItems.css'

const InventoryItems = () => {
    const dispatch = useDispatch();
    const inventory = useSelector(state => state.inventory);
    console.log('INVENTORY', inventory)
    const sessionUser = useSelector(state => state.session.user);
    const reminders = useSelector(state => state.reminders);
    const seedItems = useSelector(state => state.items.seedItems);
    const dailyItems = useSelector(state => state.items.dailyItems);
    const featuredItems = useSelector(state => state.items.featuredItems);

    const allItems = [...seedItems, ...dailyItems, ...featuredItems]
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } 

    //calculating the total value of the inventory
    const totalValue = inventory.reduce((total, inventoryItem) => {
        const item = allItems.find(item => item.itemId === inventoryItem.itemId);
        if (item) {
            const itemPrice = parseInt(item.price.replace(',', ''), 10);
            return total + (inventoryItem.quantity * itemPrice);
        }
        return total;
    }, 0);

    const formattedTotalValue = numberWithCommas(totalValue);

    //calculating the total quantity of the inventory
    const totalItems = inventory.reduce((total, inventoryItem) => {
        return total + inventoryItem.quantity;
    }, 0);

    return (
        <>
            <div className='inventory-heading'>
                {inventory.length > 0 &&
                    <h1 className='inventory-welcome'>Nice collection so far, {sessionUser.username}!</h1>
                }
                <h2>Member since: {sessionUser.created_at.slice(0, 16)}</h2>
                <div className='item-detail-price'>
                    <h2>Total Inventory value:</h2>
                    <img src={vbucks} className='vbucks-icon inventory-vbuck'/>
                    <h2>{formattedTotalValue}</h2>
                </div>
                <h2>Total items: ({totalItems})</h2>
                <h2>Unique items: ({inventory.length})</h2>
            </div>

            {inventory.map(inventoryItem => {
                const item = allItems.find(item => item.itemId === inventoryItem.itemId);

                return item ? (
                    <div className='inventory-item' key={inventoryItem.itemId}>
                        <div className='inventory-quantity'>{inventoryItem.quantity}x</div>
                        <div className='img-container'>
                            <img className='home-item-image' src={item.images.icon} alt={item.name} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}/>
                        </div>
                        <div className='inventory-item-info'>
                            <div className='inventory-item-name'>Item name: {item.name}</div>
                            <div className='inventory-rarity-section'>Rarity: <span className='rarity' style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}>{item.rarity}</span></div>

                            <div className='inventory-item-type'>Type: {item.type}</div>
                            <div className='item-detail-price'>
                                <img src={item.priceIconLink} alt={item.priceIcon} className='vbucks-icon'/>
                                <div className='inventory-item-price'>{item.price}</div>
                            </div>
                        </div>
                    </div>
                ) : null;
            })}
        </>
    )
} 

export default InventoryItems;