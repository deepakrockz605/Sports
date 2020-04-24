import React, { PureComponent } from 'react'
import { login } from '../../Services/services'
import FootballLoader from '../Common/FootballLoader'
import PropTypes from 'prop-types'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

class Login extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      UserName: '',
      Password: '',
      isLoader: false,
      isUser: true,
      errros: [],
      isHeader: false
    }
  }

  handleUserChange = (e) => {
    this.setState({ isUser: false })
    this.props.handleLoginType(this.state.isUser)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleErrors = (e) => {
    const fields = this.state
    const error = []
    let count = 0
    if (!fields.UserName) {
      error.UserName = 'Username cannot be empty!!'
      count = count + 1
    }

    if (fields.Password !== '') {
      if (fields.Password.length - 1 <= 5) {
        error.Password = 'Password lenghth should be greater than 6!!'
        count = count + 1
      }
    } else {
      error.Password = 'Password cannot be empty!!'
      count = count + 1
    }
    this.setState({
      errros: error
    })
    return { error, count }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const returnData = this.handleErrors(this.state)
    if (returnData.count <= 0) {
      this.setState({ isLoader: true })
      const userDetail = {
        UserName: this.state.UserName,
        Password: this.state.Password
      }
      login(userDetail).then((res) => {
        if (res.success) {
          toastr.success('Login Successfull !!!')
          this.setState({ isLoader: false, isHeader: true })
          this.props.sayH(this.state.isHeader)
          this.props.history.push('/dashboard')
        } else {
          toastr.error('Username or Password Incorrect !!!')
          this.setState({ isLoader: false })
        }
      })
    }
  }

  render () {
    return (
      <div className="Home--Login">
        {this.state.isLoader ? (
          <div className="loader-resto">
            <div className="loader">
              <FootballLoader />
            </div>
          </div>
        ) : null}
        <p className="subHeader">
          <span className="subHeaderBlock"> Hexovo</span>
        </p>
        <form noValidate>
          <div className="form-group">
            <label className="userLable" id="UserNameLabel">
              User Name
            </label>
            <input
              className="form-control userLableInput"
              type="text"
              name="UserName"
              autoComplete="off"
              value={this.state.UserName}
              onChange={this.handleChange}
              // onBlur={this.handleBlur}
              required
            />
            {this.state.errros.UserName ? (
              <div className="error">{this.state.errros.UserName}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label className="userLable" id="PasswordLabel">
              Password
            </label>
            <input
              className="form-control userLableInput"
              type="password"
              name="Password"
              value={this.state.Password}
              // onBlur={this.handleBlur}
              onChange={this.handleChange}
              pattern=".{5,}"
              required
            />
            {this.state.errros.Password ? (
              <div className="error">{this.state.errros.Password}</div>
            ) : null}
          </div>
          <button className="submitBtn" onClick={this.handleSubmit}>
            LOGIN
          </button>
        </form>

        <p className="orData">OR</p>

        <div className="SocialIcons">
          <p className="SocialIcons--header">Login In With</p>
          <div className="socialMedia--box">
            <button className="google socioIcon">
              <i className="fa fa-google-plus"></i>
            </button>
            <button className="facebook socioIcon">
              <i className="fa fa-facebook"></i>
            </button>
            <button className="instagram socioIcon">
              <i className="fa fa-instagram"></i>
            </button>
            <button className="twitter socioIcon">
              <i className="fa fa-twitter"></i>
            </button>
          </div>
          <div>
            <p className="newHere">
              New to Here ?{' '}
              <span className="createAccount" onClick={this.handleUserChange}>
                Create Account
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  handleLoginType: PropTypes.func,
  sayH: PropTypes.func,
  history: PropTypes.object
}

export default Login
