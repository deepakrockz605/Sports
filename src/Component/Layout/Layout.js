import React, { PureComponent } from 'react'
import HomeLogin from '../Header/HomeLogin'
import Header from '../Header/Header'
import { getUserSession } from '../../Services/playerRegistration'
import PropTypes from 'prop-types'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

class Layout extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      isLogin: false,
      userLog: '',
      inSession: false
    }
  }

  componentDidMount () {
    let userLog = JSON.parse(sessionStorage.getItem('userData'))
    if (userLog) {
      this.setState({
        inSession: true,
        userLog : userLog
      })
    } else {
      this.setState({
        inSession: true
      })
    }
  }

  handleUserLogin = (langValue) => {
    this.setState({ isLogin: langValue })
  };

  render () {
    let user = ''
    if (
      this.state.userLog !== '' &&
      this.state.userLog !== 'undefined' &&
      this.state.userLog !== null
    ) {
      if (getUserSession(this.state.userLog)) {
        user = JSON.parse(sessionStorage.getItem('userData'))
      }
    }
    toastr.options = { positionClass: 'toast-top-center' }
    let show = <HomeLogin />

    if (user && user.success) {
      show = (
        <div>
          {this.state.inSession ? (
            <Header handleLoginType={this.handleUserLogin} />
          ) : null}

          <div className="corporate-wrapper">{this.props.children}</div>
        </div>
      )
    }

    return <div>{show}</div>
  }
}

Layout.propTypes = {
  children: PropTypes.any
}

export default Layout
