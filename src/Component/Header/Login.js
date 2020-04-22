import React, { PureComponent } from "react";
import { login } from "../../Services/services";
import FootballLoader from "../Common/FootballLoader";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      UserName: "",
      Password: "",
      isLoader: false,
      isUser: true,
    };
  }

  handleUserChange = (e) => {
    this.setState({ isUser: false });
    this.props.handleLoginType(this.state.isUser);
  };

  handleChange = (e) => {
    e.target.classList.add("active");

    this.setState({
      [e.target.name]: e.target.value,
    });

    this.showInputError(e.target.name);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.showFormErrors()) {
      console.log("form is invalid: do not submit");
    } else {
      this.setState({ isLoader: true });
      const userDetail = {
        UserName: this.state.UserName,
        Password: this.state.Password,
      };
      login(userDetail).then((res) => {
        if (res.success) {
          toastr.success("Login Successfull !!!");
          this.setState({ isLoader: false });
        } else {
          toastr.error("Username or Password Incorrect !!!");
          this.setState({ isLoader: false });
        }
      });
    }
  };

  showFormErrors() {
    const inputs = document.querySelectorAll("input");
    let isFormValid = true;

    inputs.forEach((input) => {
      input.classList.add("active");

      const isInputValid = this.showInputError(input.name);

      if (!isInputValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  showInputError(refName) {
    const validity = this.refs[refName].validity;
    const label = document.getElementById(`${refName}Label`).textContent;
    const error = document.getElementById(`${refName}Error`);
    const isPassword = refName.indexOf("Password") !== -1;

    if (!validity.valid) {
      if (validity.valueMissing) {
        error.textContent = `${label} is a required field`;
      } else if (isPassword && validity.patternMismatch) {
        error.textContent = `${label} should be longer than 6 chars`;
      }
      return false;
    }

    error.textContent = "";
    return true;
  }

  render() {
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
          <span className="subHeaderSpan">Welcome To</span>
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
              ref="UserName"
              autoComplete="off"
              value={this.state.UserName}
              onChange={this.handleChange}
              required
            />
            <div className="error" id="UserNameError" />
          </div>
          <div className="form-group">
            <label className="userLable" id="PasswordLabel">
              Password
            </label>
            <input
              className="form-control userLableInput"
              type="password"
              name="Password"
              autoComplete="off"
              ref="Password"
              value={this.state.Password}
              onChange={this.handleChange}
              pattern=".{5,}"
              required
            />
            <div className="error" id="PasswordError" />
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
              New to Here ?{" "}
              <span className="createAccount" onClick={this.handleUserChange}>
                Create Account
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
