import React from 'react'
import { Route, Switch } from 'react-router'
import HomeLogin from '../Header/HomeLogin'
import Home from '../Home/Home'
import Dashboard from '../Dashboard/Dashboard'
import Signup from '../Signup/Signup'
// import Login from '../Login/Login'
import RegistrationSteps from '../UserRegistrationForm/JS/RegistrationSteps'
import PageNotFound from '../PageNotFound'

function RestrictedContainer () {
  return (
    <Switch>
      <Route path="/" exact component={HomeLogin} />
      <Route path="/home" exact component={Home} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/signup" exact component={Signup} />
      {/* <Route path="/login" exact component={Login} /> */}
      <Route path="/player-register" exact component={RegistrationSteps} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  )
}

export default RestrictedContainer
