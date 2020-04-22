import React, { PureComponent } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import Slider from "./Slider";
import Login from "./Login";
import SignUp from "./SignUp";
import "./HomeLogin.scss";

class HomeLogin extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
    };
  }

  handleUserLogin = (langValue) => {
    console.log(langValue);
    this.setState({ isLogin: langValue });
  };

  render() {
    return (
      <div
        className={
          "HomeLogin--Wrapper" +
          " " +
          (this.state.isLogin ? "HomeLogin--RowWrapper" : "")
        }
      >
        <div className="HomeLogin--carausal">
          <Slider />
        </div>
        <div
          className={
            "HomeLogin--box" +
            " " +
            (this.state.isLogin ? "HomeLogin--box--RowWrapper" : "")
          }
        >
          {this.state.isLogin ? (
            <SignUp handleLoginType={this.handleUserLogin} />
          ) : (
            <Login handleLoginType={this.handleUserLogin} />
          )}
        </div>
      </div>
    );
  }
}

HomeLogin.propTypes = {
  getLoginDetailInfo: PropTypes.func,
  history: PropTypes.object,
};

export default connect()(HomeLogin);
