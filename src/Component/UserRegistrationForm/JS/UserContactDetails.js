import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { UserContactValidation } from './Validation'
import { userRegister, userUpdate } from '../../../Services/playerRegistration'

function UserContactDetails ({
  values,
  handleChange,
  handleChangeMobile,
  nextStep,
  prevStep
}) {
  const [errors, setErrors] = useState([])
  const handleContinue = (e) => {
    e.preventDefault()
    const error = UserContactValidation({ values })
    setErrors(error.errors)

    if (error.count <= 0) {
      const userDetails = values.userResponse
      let userLog = sessionStorage.getItem('userData')
      userLog = JSON.parse(userLog)
      if (values.isUserRegisterd) {
        userUpdate(userDetails, userLog).then((res) => {
          return true
        })
      } else {
        userRegister(userDetails, userLog).then((res) => {
          return true
        })
      }
      nextStep(6)
    }
  }

  const handleBlurEvent = (input) => (e) => {
    errors[input] = null
  }

  const handleBack = (evt) => {
    evt.preventDefault()
    prevStep(4)
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
                <span>Contact Information</span>
              </div>
            </div>

            <div className="player_information_box">
              <div className="row">
                <div className="col-md-5">
                  <div className="registration_fields">
                    <label>Mobile Number*</label>
                    <input
                      className="u-full-width"
                      placeholder="Please Enter Mobile Number"
                      type="text"
                      onChange={handleChangeMobile('MobileNumber')}
                      onBlur={handleBlurEvent('MobileNumber')}
                      defaultValue={values.userResponse.MobileNumber}
                      minLength={10}
                      maxLength={10}
                      required
                    />
                    {errors.MobileNumber ? (
                      <p className="inputError">{errors.MobileNumber}</p>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-1"></div>

                <div className="col-md-5">
                  <div className="registration_fields">
                    <label>Alternate Mobile Number</label>
                    <input
                      className="u-full-width"
                      placeholder="Please Enter Alternate Mobile Number"
                      type="text"
                      onChange={handleChangeMobile('AlternateMobileNumber')}
                      onBlur={handleBlurEvent('AlternateMobileNumber')}
                      defaultValue={values.userResponse.AlternateMobileNumber}
                      minLength={10}
                      maxLength={10}
                      required
                    />
                    {errors.AlternateMobileNumber ? (
                      <p className="inputError">
                        {errors.AlternateMobileNumber}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-5">
                  <div className="registration_fields">
                    <label>EmailID*</label>
                    <input
                      className="u-full-width"
                      placeholder="Please Enter EmailID"
                      type="text"
                      onChange={handleChange('Email')}
                      onBlur={handleBlurEvent('Email')}
                      defaultValue={values.userResponse.Email}
                      required
                      style={{ textTransform: 'lowercase' }}
                    />
                    {errors.Email ? (
                      <p className="inputError">{errors.Email}</p>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-5">
                  <div className="registration_fields">
                    <label>Reference of Any Coach</label>
                    <input
                      className="u-full-width"
                      placeholder="Reference of Any Coach"
                      type="text"
                      onChange={handleChange('ReferencedCoach')}
                      defaultValue={values.userResponse.ReferencedCoach}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-11">
                  <div className="registration_fields">
                    <label>Your Ambition & Motivation</label>
                    <textarea
                      placeholder="Please add the skills"
                      onChange={handleChange('Ambition')}
                      defaultValue={values.userResponse.Ambition}
                      style={{ width: '100%', height: '60px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="basicSubmitDetails">
            <Button className="NEXT-btn" onClick={handleBack}>
              Back
            </Button>
            <Button className="NEXT-btn" onClick={handleContinue}>
              Save & Continue
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

UserContactDetails.propTypes = {
  values: PropTypes.object,
  handleChangeMobile: PropTypes.func,
  handleChange: PropTypes.func,
  nextStep: PropTypes.func,
  prevStep: PropTypes.func
}

export default UserContactDetails
