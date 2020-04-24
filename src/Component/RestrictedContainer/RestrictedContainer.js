import React, { PureComponent } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import HomeLogin from '../Header/HomeLogin'
import Home from '../Home/Home'
import Dashboard from '../Dashboard/Dashboard'
import Signup from '../Signup/Signup'
import Header from '../Header/Header'
import RegistrationSteps from '../UserRegistrationForm/JS/RegistrationSteps'
import PageNotFound from '../PageNotFound'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

class RestrictedContainer extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      isHeader: false,
      userAlready: false
    }
  }

  sayHello = (e) => {
    this.setState({
      isHeader: e
    })
  };

  headerVal = (e) => {
    this.setState({
      isHeader: e,
      userAlready: e
    })
  };

  componentDidMount = (e) => {
    console.log(this.state.isHeader)
    const userLog = JSON.parse(sessionStorage.getItem('userData'))
    if (userLog) {
      this.setState({
        userAlready: true,
        isHeader: true
      })
    }
  };

  render () {
    toastr.options = {
      positionClass: 'toast-top-center',
      closeButton: true
    }
    return (
      <Router>
        {this.state.isHeader ? <Header sayHeader={this.headerVal} /> : null}
        <Switch>
          {this.state.userAlready ? (
            <Route path="/" exact component={Dashboard} />
          ) : (
            <Route
              path="/"
              exact
              render={() => <HomeLogin sayHello={this.sayHello} />}
            />
          )}

          <Route path="/home" exact component={Home} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/player-register" exact component={RegistrationSteps} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    )
  }
}

export default RestrictedContainer
