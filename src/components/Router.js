import React, { Fragment } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Auth from '../routes/Auth'
import Home from '../routes/Home'
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

const Router = ({ isLoggedIn }) => {

  return (
    <HashRouter>
      {isLoggedIn && <Navigation/>}
      <Switch>
        {isLoggedIn ?
          <Fragment>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route exact path='/profile'>
              <Profile/>
            </Route>
          </Fragment>
          :
          <Route exact path='/'>
            <Auth/>
          </Route>}
      </Switch>
    </HashRouter>
  )
}

export default Router
