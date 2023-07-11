import React from 'react';
import { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../assets/images/Logo.png';
import { getCart } from '../../store/cart';
import Cart from '../Cart';
import './Navigation.css';
import './ProfileButton.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();
	const dispatch = useDispatch();

	const [isCartOpen, setIsCartOpen] = useState(false);

    //dispatch getCart whenever CartPanel is mounted or whenever sessionUser changes
    useEffect(() => {
        if (sessionUser) {
            dispatch(getCart())
        }
    }, [dispatch, sessionUser])

	useEffect(() => {
        return () => {
            //removes the no-scroll class when the component unmounts
            document.body.classList.remove('no-scroll');
        };
    }, []);

	//so i can disable background scrolling while cart is opened
	const toggleCartOpen = () => {
		setIsCartOpen(!isCartOpen);
		if (!isCartOpen) {
			document.body.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
		}
	}

	return (
		<div className='nav-bar'>
			{isCartOpen && <div className="overlay" onClick={toggleCartOpen}></div>}
			<div className='nav-options'>
				<div className='nav-logo-container'>
					<img src={logo} className='nav-logo' alt='Battle Royale logo' onClick={() => history.push('/')}/>
				</div>
				<div className='nav-alt-container'>
					<NavLink to="/" exact className="nav-home" activeClassName="active-link">
						Home
					</NavLink>
					<NavLink to="/search" className="nav-search" activeClassName="active-link">
						Search
					</NavLink>
					<NavLink to="/about_me" className="nav-about-me" activeClassName="active-link">
						About
					</NavLink>
					<button className='nav-cart' onClick={toggleCartOpen}>
						{isCartOpen ? 'Close Cart' : 'Cart'}
					</button>
					{isLoaded && (
						<div className='user-icon'>
							<ProfileButton user={sessionUser} />
						</div>
					)}
				</div>
			</div>
			<Cart isCartOpen={isCartOpen} toggleCartOpen={toggleCartOpen}/>
		</div>
	);
}

export default Navigation;