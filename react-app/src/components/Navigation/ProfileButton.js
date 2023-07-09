import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { clearCart } from "../../store/cart";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory, NavLink } from "react-router-dom";
import userIcon from '../../assets/images/user.png';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const sessionUser = useSelector(state => state.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(clearCart());
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const closeMenu = () => setShowMenu(false);

  return (
    <div style={{position: 'relative'}}>
      <button className="profile-icon-button" onClick={openMenu}>
        {!sessionUser &&
          // <i className="fas fa-user-circle profile-icon-default" />
          <img src={userIcon} alt="profile" className="profile-icon-default" />
        }

        {sessionUser && sessionUser.profile_image &&
          <img src={sessionUser?.profile_image} alt="profile" className="profile-icon" />
        }

        {sessionUser && !sessionUser.profile_image &&
          <img src={userIcon} alt="profile" className="profile-icon-default" />
        }

      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="dropdown-options">
            <div className="dropdown-username">
              Hi, {user.username}
            </div>
            <button className="dropdown-inventory-button" onClick={() => history.push("/inventory")}>Inventory</button>
            <button className="dropdown-logout-button" onClick={handleLogout}>Log Out</button>
          </div>
        ) : (
          <div className="dropdown-options">
            <OpenModalButton
              className="login-button"
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              className="signup-button"
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
