import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import queryString from 'query-string'
import PropTypes from 'prop-types'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import './Header.scss'
import { login } from '../../Services/services'

class Header extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      sidebar: false,
      isLogin: false,
      userLog: null,
      showDropdown: false,
      isUser: true,
      userDetails: ''
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const userDetails = JSON.parse(localStorage.getItem('userData'))
    if (userDetails) {
      console.log('in session')
    } else {
      toastr.error('Session Expired !!')
      this.props.sayHeader(false)
      this.props.history.push('/')
    }
  }

  handleUserDropdown = (e) => {
    this.setState((prevState) => ({
      showDropdown: !prevState.showDropdown
    }))
  };

  handleSidebar = (e) => {
    this.setState((prevstate) => ({ sidebar: !prevstate.sidebar }))
  };

  handleOverlay = (e) => {
    this.setState({
      sidebar: false
    })
  };

  updateLogout = () => {
    this.setState({
      sidebar: false, isUser: false
    })
    this.props.sayHeader(false)
    localStorage.clear()
    this.props.history.push('/')
    toastr.success('You Have Logged Out Successfully !!')
  };

  componentDidMount = e => {
    const userDetails = JSON.parse(localStorage.getItem('userData'))
    this.setState({
      userDetails
    })
    const query = queryString.parse(this.props.location.search)
    console.log(query)
    if (query.user) {
      console.log('Google User')
      const user = {
        UserName: query.token,
        Password: 'NA',
        sso: query.user
      }
      login(user).then(() => {
        this.setState({
          isLogin: true
        })
      })
    }
  }

  render () {
    let { isLogin } = this.state.isLogin

    if (this.state.userDetails) {
      if (this.state.userDetails.success) {
        isLogin = true
      }
    }
    return (
      <>
        <div className="headerFixed">
          <nav className="navbar navbar-expand-sm navbar-dark">
            <Link to="/home" className="navbar-brand">
              HEXOVO
            </Link>
            <button
              className={
                'sidebarBtn' +
                ' ' +
                (this.state.sidebar ? 'sidebarBtnTrue' : '')
              }
              type="button"
              onClick={this.handleSidebar}
            >
              <span className="sidebarBtnTop"></span>
              <span className="sidebarBtnMid"></span>
              <span className="sidebarBtnBot"></span>
            </button>

            {this.state.sidebar ? (
              <div className="overlay" onClick={this.handleOverlay}></div>
            ) : null}

            <div
              className={
                'HeaderSideBar' +
                ' ' +
                (this.state.sidebar ? 'HeaderSideBarRight' : '')
              }
            >
              <ul className="HeaderUl">
                <li className="HeaderList">
                  <div className="UserName">
                    {isLogin ? (
                      <div
                        className="loginUserBox"
                        onClick={this.handleUserDropdown}
                      >
                        <span
                          className={
                            this.state.showDropdown ? 'arrowUp' : 'arrowDown'
                          }
                        >
                          <i className="fa fa-caret-right"></i>
                        </span>

                        {`${this.state.userDetails.FirstName.charAt(
                          0
                        )}${this.state.userDetails.LastName.charAt(0)}`}
                        {this.state.showDropdown ? (
                          <div className="headerDropdown">
                            <p>Hello, </p>
                            <p className="headerDropdown--user">{`${this.state.userDetails.FirstName} ${this.state.userDetails.LastName}`}</p>
                            <p className="headerDropdown--logs headerDropdown--profile">
                              <Link
                                to="/home"
                                className="headerDropdown--links"
                              >
                                Home
                              </Link>
                            </p>
                            <p className="headerDropdown--logs">
                              <Link
                                to="/dashboard"
                                className="headerDropdown--links"
                              >
                                Your Profile
                              </Link>
                            </p>
                            <p className="headerDropdown--logs">
                              <Link
                                to="/dashboard"
                                className="headerDropdown--links"
                              >
                                Go to Dashboard
                              </Link>
                            </p>
                            <p
                              className="headerDropdown--logs"
                              onClick={this.updateLogout}
                            >
                              Logout
                            </p>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </li>
              </ul>
            </div>

            <div
              className={
                'HeaderSideBar HeaderSideBarUpdated' +
                ' ' +
                (this.state.sidebar
                  ? 'HeaderSideBarUpdated HeaderSideBarRight'
                  : '')
              }
            >
              <ul className="HeaderUl">
                {isLogin ? (
                  <>
                    <li className="HeaderList">
                      <div className="HeaderList--userInfo">
                        <i
                          className="fa fa-user-circle userProfile"
                          aria-hidden="true"
                          style={{ paddingRight: '10px', fontSize: '30px' }}
                        ></i>
                        <p>Hello,</p>
                        <p className="">&nbsp; {`${this.state.userDetails.FirstName}`}</p>
                      </div>
                    </li>
                    <li className="HeaderList">
                      <Link to="/home" onClick={this.handleOverlay}>
                        Home
                      </Link>
                    </li>
                    <li className="HeaderList">
                      <Link to="/dashboard" onClick={this.handleOverlay}>
                        Your Profile
                      </Link>
                    </li>
                    <li className="HeaderList">
                      <Link to="/dashboard" onClick={this.handleOverlay}>
                        Go to Dashboard
                      </Link>
                    </li>
                    <li className="HeaderList" onClick={this.updateLogout}>
                      Logout
                    </li>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={this.handleOverlay}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <i
                      className="fa fa-user-circle userProfile"
                      aria-hidden="true"
                      style={{ paddingRight: '10px', fontSize: '20px' }}
                    ></i>
                    Signup / Login
                  </Link>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </>
    )
  }
}

Header.propTypes = {
  sayHeader: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object
}

export default withRouter(connect()(Header))
