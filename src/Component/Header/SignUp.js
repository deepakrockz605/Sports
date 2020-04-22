import React, { PureComponent } from "react";
import { register, checkUserName } from "../../Services/services";
import FootballLoader from "../Common/FootballLoader";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

class SignUp extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      FirstName: "",
      LastName: "",
      UserName: "",
      Email: "",
      Password: "",
      PasswordConfirm: "",
      isLoader: false,
      isUserCheck: false,
      isUserAvail: "",
      isUser: false
    };
  }

  
  handleUserChange = (e) => {
    this.setState({ isUser: false });
    this.props.handleLoginType(this.state.isUser);
  };


  handleOnBlur = (e) => {
    this.setState({ isLoader: true });
    checkUserName(e.target.value).then((res) => {
      if (res.data.success) {
        this.setState({
          isUserAvail: true,
          isLoader: false,
          isUserCheck: true,
        });
      } else {
        toastr.error('Username already exists !!')
        this.setState({
          isUserAvail: false,
          isLoader: false,
          isUserCheck: true,
        });
      }
    });
  };

  handleChange = (e) => {
    e.target.classList.add("active");
    const re = /^[a-zA-Z]+$/;

    if (e.target.name === "FirstName" || e.target.name === "LastName") {
      if (e.target.value === "" || re.test(e.target.value)) {
        this.setState({ [e.target.name]: e.target.value });
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    this.showInputError(e.target.name);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.showFormErrors()) {
      console.log("form is invalid");
    } else {
      this.setState({ isLoader: true });

      const userDetail = {
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        UserName: this.state.UserName,
        Email: this.state.Email,
        Password: this.state.Password,
      };
      register(userDetail).then((res) => {
        if (res.data.userId) {
          this.setState({ isLoader: false, isUser: false });
          debugger
          this.props.handleLoginType(this.state.isUser);
          toastr.success("Successfully Signup !!!");
        } else {
          this.setState({ isLoader: false });
          toastr.error("Email Already Exists !!!");
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
    const isPasswordConfirm = refName === "PasswordConfirm";

    if (isPasswordConfirm) {
      if (this.refs.Password.value !== this.refs.PasswordConfirm.value) {
        this.refs.PasswordConfirm.setCustomValidity("Passwords do not match");
      } else {
        this.refs.PasswordConfirm.setCustomValidity("");
      }
    }

    if (!validity.valid) {
      if (validity.valueMissing) {
        error.textContent = `${label} is a required field`;
      } else if (validity.typeMismatch) {
        error.textContent = `${label} should be a valid email address`;
      } else if (isPassword && validity.patternMismatch) {
        error.textContent = `${label} should be longer than 6 chars`;
      } else if (isPasswordConfirm && validity.customError) {
        error.textContent = "Passwords do not match";
      }
      return false;
    }

    error.textContent = "";
    return true;
  }

  render() {
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
          {/* <span className="subHeaderSpan">Welcome To</span> */}
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
              ref="FirstName"
              autoComplete="off"
              value={this.state.FirstName}
              onChange={this.handleChange}
              pattern="^[a-zA-Z]+$"
              required
            />
            <div className="error" id="FirstNameError" />
          </div>

          <div className="form-group">
            <label className="userLable" id="LastNameLabel">
              Lastname
            </label>
            <input
              className="form-control userLableInput"
              type="text"
              name="LastName"
              ref="LastName"
              autoComplete="off"
              value={this.state.LastName}
              onChange={this.handleChange}
              required
            />
            <div className="error" id="LastNameError" />
          </div>

          <div className="form-group">
            <label className="userLable" id="UserNameLabel">
              Username
            </label>
            <input
              className="form-control userLableInput"
              type="text"
              name="UserName"
              ref="UserName"
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
                      ? "fa fa-check green check-icon"
                      : "fa fa-times red check-icon"
                  }
                  aria-hidden="true"
                ></i>
              )}
            </span>
            <div className="error" id="UserNameError" />
          </div>

          <div className="form-group">
            <label className="userLable" id="EmailLabel">
              Email
            </label>
            <input
              className="form-control userLableInput"
              type="email"
              name="Email"
              ref="Email"
              autoComplete="off"
              value={this.state.Email}
              onChange={this.handleChange}
              required
            />
            <div className="error" id="EmailError" />
          </div>

          <div className="form-group">
            <label className="userLable" id="PasswordLabel">
              Password
            </label>
            <input
              className="form-control userLableInput"
              type="password"
              name="Password"
              ref="Password"
              value={this.state.Password}
              onChange={this.handleChange}
              pattern=".{5,}"
              required
            />
            <div className="error" id="PasswordError" />
          </div>

          <div className="form-group">
            <label className="userLable" id="PasswordConfirmLabel">
              Confirm Password
            </label>
            <input
              className="form-control userLableInput"
              type="password"
              name="PasswordConfirm"
              ref="PasswordConfirm"
              value={this.state.PasswordConfirm}
              onChange={this.handleChange}
              pattern=".{5,}"
              required
            />
            <div className="error" id="PasswordConfirmError" />
          </div>

          <button className="submitBtn" onClick={this.handleSubmit}>
            SIGNUP
          </button>
        </form>

        <div className="SocialIcons">
          <p className="newHere">
            Already have an account ?{" "}
            <span className="createAccount" onClick={this.handleUserChange}>Login</span>
          </p>
        </div>
      </div>
    );
  }
}

export default SignUp;
