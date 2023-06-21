import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import Featured from "./components/Featured";
import Cart from "./components/CartSection";
import ItemDetailPage from "./components/ItemDetailPage";
import WishlistPage from "./components/WishlistPage";
import UserProfilePage from "./components/UserProfile";
import RemindersPage from "./components/RemindersPage";
import InventoryPage from "./components/InventoryPage";
import AboutMe from "./components/AboutMe";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/featured_items" exact>
            <Featured />
          </Route>

          <Route path="/item/:itemName" exact>
            <ItemDetailPage isLoaded={isLoaded}/>
          </Route>

          <Route path="/wishlist" exact>
            <WishlistPage />
          </Route>

          <Route path="/user_profile" exact>
            <UserProfilePage />
          </Route>

          <Route path="/login" >
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route path="/reminders">
            <RemindersPage />
          </Route>

          <Route path="/inventory">
            <InventoryPage />
          </Route>

          <Route path="/about_me">
            <AboutMe />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
