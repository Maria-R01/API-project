import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import SpecificSpot from "./components/SpecificSpot";
import UserSpots from "./components/UserSpots";
import CreateSpot from "./components/CreateSpot";
import EditSpot from "./components/EditSpot";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch></Switch>}
      <Switch>
        <Route exact path='/' component={Spots} />
        <Route exact path='/spots/new' component={CreateSpot} />
        <Route exact path='/spots/current' component={UserSpots} />
        <Route exact path='/spots/:spotId' component={SpecificSpot} />
        <Route exact path='/spots/:spotId/edit' component={EditSpot} />
        <Route>
          <h1>We can't seem to find the page you're looking for...</h1>
          {/* <Redirect to='/' /> */}
        </Route>
      </Switch>
    </>
  );
}

export default App;