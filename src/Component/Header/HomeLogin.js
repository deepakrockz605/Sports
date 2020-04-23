import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

import Slider from './Slider'
import Login from './Login'
import SignUp from './SignUp'
import './HomeLogin.scss'

class HomeLogin extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      isLogin: false
    }
  }

  handleUserLogin = (langValue) => {
    this.setState({ isLogin: langValue })
  }

  render () {
    return (
      <div
        className={
          'HomeLogin--Wrapper' +
          ' ' +
          (this.state.isLogin ? 'HomeLogin--RowWrapper' : '')
        }
      >
        <div className="HomeLogin--carausal">
          <Slider />
        </div>
        <div
          className={
            'HomeLogin--box' +
            ' ' +
            (this.state.isLogin ? 'HomeLogin--box--RowWrapper' : '')
          }
        >
          {this.state.isLogin ? (
            <SignUp handleLoginType={this.handleUserLogin} history={this.props} />
          ) : (
            <Login handleLoginType={this.handleUserLogin} history={this.props} />
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(HomeLogin)
