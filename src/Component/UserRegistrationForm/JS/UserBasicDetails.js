import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import PropTypes from "prop-types";
import { UserBasicValidation } from "./Validation";
import "../CSS/upload.scss";
import CardProfile from "./PhotoUpload";

function UserBasicDetails({
  values,
  handleChange,
  handleImageChange,
  handleDatePicker,
  nextStep,
}) {
  const finalValues = values.userResponse;
  const [errors, setErrors] = useState([]);

  const handleContinue = async (e) => {
    e.preventDefault();
    const error = UserBasicValidation({ values });
    setErrors(error.errors);
    if (error.count <= 0) {
      toastr.success("Data Saved Successfully !!");
      nextStep(2);
    }
  };

  const handleBlurEvent = (input) => (e) => {
    errors[input] = null;
    setErrors(errors);
  };

  if (values.userResponse.DateOfBirth !== null) {
    var today = new Date();
    var birthDate = new Date(values.userResponse.DateOfBirth);
    var ageNow = today.getFullYear() - birthDate.getFullYear();
    values.age = ageNow;
  }

  return (
    <>
      <div className="player_information_form">
        <div className="container">
          <div className="player_basic_information">
            <div className="verticle_line">
              <div className="hero"></div>
              <div className="triangle-right"></div>
              <div className="first-application-data first-application-data-kyc">
                <span>Basic Information</span>
              </div>
            </div>

            <div className="player_information_box">
              <div className="row">
                <div className="col-md-5">
                  <div className="registration_fields">
                    <label>First Name*</label>
                    <input
                      className="u-full-width"
                      placeholder="First Name"
                      type="text"
                      onChange={handleChange("FirstName")}
                      onBlur={handleBlurEvent("FirstName")}
                      defaultValue={finalValues.FirstName}
                      autoFocus
                      required
                    />

                    {errors.FirstName ? (
                      <p className="inputError">{errors.FirstName}</p>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-5">
                  <div className="registration_fields">
                    <label>Last Name*</label>
                    <input
                      className="u-full-width"
                      placeholder="Last Name"
                      type="text"
                      onChange={handleChange("LastName")}
                      onBlur={handleBlurEvent("LastName")}
                      defaultValue={finalValues.LastName}
                    />

                    {errors.LastName ? (
                      <p className="inputError">{errors.LastName}</p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <div className="registration_fields registration_fieldsDatePicker">
                    <label>Birth Date*</label>
                    <Datepicker
                      placeholderText="Click to select a date"
                      onChange={handleDatePicker("DateOfBirth")}
                      onBlur={handleBlurEvent("DateOfBirth")}
                      selected={finalValues.DateOfBirth}
                      className="u-full-width"
                      dateFormat="yyyy-MM-dd"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />

                    {errors.DateOfBirth ? (
                      <p className="inputError">{errors.DateOfBirth}</p>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-1"></div>

                <div className="col-md-5">
                  <div className="registration_fields">
                    <label>Age*</label>
                    <input
                      className="u-full-width"
                      type="text"
                      value={values.age + " Years"}
                      disabled
                    />
                    {errors.age ? (
                      <p className="inputError">{errors.age}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-5">
                  <div className="registration_fields">
                    <label>Height in C.M*</label>
                    <input
                      className="u-full-width"
                      placeholder="Height in C.M"
                      type="text"
                      onChange={handleChange("Height")}
                      onBlur={handleBlurEvent("Height")}
                      defaultValue={finalValues.Height}
                      minLength={0}
                      maxLength={3}
                    />
                    {errors.Height ? (
                      <p className="inputError">{errors.Height}</p>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-1"></div>

                <div className="col-md-5">
                  <div className="registration_fields">
                    <label>Weight in K.G*</label>
                    <input
                      className="u-full-width"
                      placeholder="Weight In K.G"
                      type="text"
                      onChange={handleChange("Weight")}
                      onBlur={handleBlurEvent("Weight")}
                      defaultValue={finalValues.Weight}
                      maxLength={3}
                    />
                    {errors.Weight ? (
                      <p className="inputError">{errors.Weight}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-5">
                  <div className="registration_fields">
                    <label>Nationality*</label>
                    <div className="customDropDownArrow">
                      <span>
                        <i className="right"></i>
                      </span>
                      <select
                        onChange={handleChange("Nationality")}
                        onBlur={handleBlurEvent("Nationality")}
                        value={finalValues.Nationality}
                        className="browser-default custom-select"
                      >
                        <option defaultValue value="default">
                          Select Nationality
                        </option>
                        <option value="india">India</option>
                        <option value="brazil">Brazil</option>
                      </select>

                      {errors.Nationality ? (
                        <p className="inputError">{errors.Nationality}</p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="col-md-1"></div>
                <div className="col-md-5">
                  <div
                    className="registration_fields"
                    style={{ paddingBottom: "0" }}
                  >
                    <label>Upload a Photo*</label>

                    <CardProfile
                      handleImageChange={handleImageChange}
                      values={values}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="basicSubmitDetails">
            <Button className="NEXT-btn" onClick={handleContinue}>
              Save & Continue
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

UserBasicDetails.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleDatePicker: PropTypes.func,
  handleImageChange: PropTypes.func,
  nextStep: PropTypes.func,
};

export default UserBasicDetails;
