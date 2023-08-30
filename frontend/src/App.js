import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import SpecificSpot from "./components/SpecificSpot";

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
        <Route exact path='/spots/new' />
        <Route exact path='/spots/current'  />
        <Route exact path='/spots/:spotId' component={SpecificSpot} />
        <Route exact path='/spots/:spotId/edit' />
      </Switch>
    </>
  );
}

export default App;