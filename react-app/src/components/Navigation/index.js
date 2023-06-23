import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../assets/images/logo.png';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();

	return (
		<div className='nav-bar'>

			<div>
				<img src={logo} className='nav-logo' alt='Battle Royale logo' onClick={() => history.push('/')}/>
			</div>

			<div className='nav-options'>
				<NavLink to="/" exact className="nav-home" activeClassName="active-link">
                    Home
                </NavLink>
				<div className='nav-shop'>Shop</div>
				<NavLink to="/about_me" className="nav-about-me" activeClassName="active-link">
                    About Me
                </NavLink>
				<div className='nav-view-cart'>View Cart</div>
				{isLoaded && (
					<div className='user-icon'>
						<ProfileButton user={sessionUser} />
					</div>
				)}
			</div>

		</div>
	);
}

export default Navigation;