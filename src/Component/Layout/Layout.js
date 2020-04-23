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
      userResponse: '',
      inSession: false
    }
  }

  componentDidMount () {
    let userLog = sessionStorage.getItem('userData')
    userLog = JSON.parse(userLog)
    this.setState({
      userResponse : userLog
    })
    if (userLog) {
      this.setState({
        inSession: true
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
    const {userResponse} = this.state.userResponse
    let user = ''
    if (
      userResponse !== '' &&
      userResponse !== 'undefined' &&
      userResponse !== null
    ) {
      if (getUserSession(userResponse)) {
        user = userResponse
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
