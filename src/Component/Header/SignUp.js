import React, { PureComponent } from 'react'
import { register, checkUserName } from '../../Services/services'
import FootballLoader from '../Common/FootballLoader'
import PropTypes from 'prop-types'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

class SignUp extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      FirstName: '',
      LastName: '',
      UserName: '',
      Email: '',
      Password: '',
      PasswordConfirm: '',
      isLoader: false,
      isUserCheck: false,
      isUserAvail: '',
      isUser: false,
      errros: []
    }
  }

  handleUserChange = (e) => {
    this.setState({ isUser: false })
    this.props.handleLoginType(this.state.isUser)
  }

  handleOnBlurChange = (input) => async (e) => {}

  handleOnBlur = (e) => {
    if (this.state.UserName !== '') {
      if (this.state.UserName.length <= 6) {
        toastr.error('Username must be minimum 6 characters!!')
        this.setState({
          isUserAvail: false
        })
      } else {
        this.setState({ isLoader: true })
        checkUserName(e.target.value).then((res) => {
          if (res.data.success) {
            this.setState({
              isUserAvail: true,
              isLoader: false,
              isUserCheck: true
            })
          } else {
            toastr.error('Username already exists !!')
            this.setState({
              isUserAvail: false,
              isLoader: false,
              isUserCheck: true
            })
          }
        })
      }
    }
  }

  handleChange = (e) => {
    e.target.classList.add('active')
    const re = /^[a-zA-Z]+$/

    if (e.target.name === 'FirstName' || e.target.name === 'LastName') {
      if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({ [e.target.name]: e.target.value })
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const returnData = this.handleErrors(this.state)
    console.log(returnData)
    if (returnData.count < 0) {
      this.setState({ isLoader: true })
      const userDetail = {
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        UserName: this.state.UserName,
        Email: this.state.Email,
        Password: this.state.Password
      }
      register(userDetail).then((res) => {
        if (res.data.userId) {
          this.setState({ isLoader: false, isUser: false })
          this.props.handleLoginType(this.state.isUser)
          toastr.success('Successfully Signup !!!')
        } else {
          this.setState({ isLoader: false })
          toastr.error('Email Already Exists !!!')
        }
      })
    }
  }

  handleErrors = (e) => {
    const fields = this.state
    const error = []
    let count = 0
    if (!fields.FirstName) {
      error.FirstName = 'FirstName cannot be empty!!'
      count = count + 1
    }

    if (!fields.LastName) {
      error.LastName = 'LastName cannot be empty!!'
      count = count + 1
    }

    if (!fields.UserName || !this.state.isUserAvail) {
      error.UserName = 'Username required!!'
      count = count + 1
    }

    if (!fields.Email) {
      error.Email = 'Email cannot be empty'
      count = count + 1
    }

    if (typeof fields.Email !== 'undefined') {
      const lastAtPos = fields.Email.lastIndexOf('@')
      const lastDotPos = fields.Email.lastIndexOf('.')

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields.Email.indexOf('@@') === -1 &&
          lastDotPos > 2 &&
          fields.Email.length - lastDotPos > 2
        )
      ) {
        error.Email = 'Email is not valid'
        count = count + 1
      }
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

    if (fields.PasswordConfirm !== '') {
      if (fields.Password !== fields.PasswordConfirm) {
        error.PasswordConfirm = 'Password does not matched!!'
        count = count + 1
      }
    } else {
      error.PasswordConfirm = 'Confirm Password cannot be empty!!'
      count = count + 1
    }

    this.setState({
      errros: error
    })
    return { error, count }
  }

  render () {
    return (
      <div className="Home--Login Home--SignUp">
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
            <label className="userLable" id="FirstNameLabel">
              Firstname
            </label>
            <input
              className="form-control userLableInput"
              type="text"
              name="FirstName"
              autoComplete="off"
              value={this.state.FirstName}
              onChange={this.handleChange}
              onBlur={this.handleOnBlurChange('FirstName')}
              required
            />
            {this.state.errros.FirstName ? (
              <div className="error">{this.state.errros.FirstName}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label className="userLable" id="LastNameLabel">
              Lastname
            </label>
            <input
              className="form-control userLableInput"
              type="text"
              name="LastName"
              autoComplete="off"
              value={this.state.LastName}
              onChange={this.handleChange}
              onBlur={this.handleOnBlurChange('LastName')}
              required
            />
            {this.state.errros.LastName ? (
              <div className="error">{this.state.errros.LastName}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label className="userLable" id="UserNameLabel">
              Username
            </label>
            <input
              className="form-control userLableInput"
              type="text"
              name="UserName"
              autoComplete="off"
              value={this.state.UserName}
              onChange={this.handleChange}
              onBlur={this.handleOnBlur}
              required
            />
            <span>
              {this.state.isUserCheck && (
                <i
                  className={
                    this.state.isUserAvail
                      ? 'fa fa-check green check-icon'
                      : 'fa fa-times red check-icon'
                  }
                  aria-hidden="true"
                ></i>
              )}
            </span>
            {this.state.errros.UserName ? (
              <div className="error">{this.state.errros.UserName}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label className="userLable" id="EmailLabel">
              Email
            </label>
            <input
              className="form-control userLableInput"
              type="email"
              name="Email"
              autoComplete="off"
              value={this.state.Email}
              onChange={this.handleChange}
              onBlur={this.handleOnBlurChange('Email')}
              required
            />
            {this.state.errros.Email ? (
              <div className="error">{this.state.errros.Email}</div>
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
              onChange={this.handleChange}
              onBlur={this.handleOnBlurChange('Password')}
              required
            />
            {this.state.errros.Password ? (
              <div className="error">{this.state.errros.Password}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label className="userLable" id="PasswordConfirmLabel">
              Confirm Password
            </label>
            <input
              className="form-control userLableInput"
              type="password"
              name="PasswordConfirm"
              value={this.state.PasswordConfirm}
              onChange={this.handleChange}
              onBlur={this.handleOnBlurChange('PasswordConfirm')}
              required
            />
            {this.state.errros.PasswordConfirm ? (
              <div className="error">{this.state.errros.PasswordConfirm}</div>
            ) : null}
          </div>

          <button className="submitBtn" onClick={this.handleSubmit}>
            SIGNUP
          </button>
        </form>

        <div className="SocialIcons">
          <p className="newHere">
            Already have an account ?{' '}
            <span className="createAccount" onClick={this.handleUserChange}>
              Login
            </span>
          </p>
        </div>
      </div>
    )
  }
}

SignUp.propTypes = {
  handleLoginType: PropTypes.func
}

export default SignUp
