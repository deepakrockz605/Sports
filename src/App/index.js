import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import '../Style/stylesheet.css'
import HomeLogin from '../Component/Header/HomeLogin'
import Dashboard from '../Component/Dashboard/Dashboard.js'
import Signup from '../Component/Signup/Signup'
import Login from '../Component/Login/Login'
// import Home from '../Component/Home/Home'
import PageNotFound from '../Component/PageNotFound'
import RegistrationSteps from '../Component/UserRegistrationForm/JS/RegistrationSteps'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        {/* <Header /> */}
        <Switch>
        {/* <Route path="/" exact component={Home} /> */}
          <Route path="/" exact component={HomeLogin} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/player-register" exact component={RegistrationSteps} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
