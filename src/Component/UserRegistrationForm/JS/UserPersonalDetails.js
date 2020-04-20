import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import PropTypes from 'prop-types'
import { UserPersonalValidation } from './Validation'

function UserPersonalDetails ({
  values,
  handlePlayerPosition,
  handleChange,
  nextStep,
  prevStep
}) {
  const [errors, setErrors] = useState([])

  const handleContinue = async (e) => {
    e.preventDefault()
    const error = UserPersonalValidation({ values })
    await setErrors(error.errors)

    if (error.count <= 0) {
      toastr.success('Data Saved Successfully !!')
      nextStep(3)
    }
  }

  const handleBack = (evt) => {
    evt.preventDefault()
    prevStep(1)
  }

  const handleBlurEvent = (input) => (e) => {
    errors[input] = null
  }

  if (values.userResponse.Position !== 'defaultPlayer') {
    values.skillsSet = values.players.find(
      (cntry) => cntry.name === values.userResponse.Position
    ).playerskills
  }

  return (
    <div className="player_information_form">
      <div className="container">
        <div className="player_basic_information">
          <div className="verticle_line">
            <div className="hero"></div>
            <div className="triangle-right"></div>
            <div className="first-application-data first-application-data-kyc">
              <span>Player Information</span>
            </div>
          </div>

          <div className="player_information_box">
            <div className="row">
              <div className="col-md-5">
                <div className="registration_fields">
                  <label>Player Position*</label>
                  <div className="customDropDownArrow">
                    <span>
                      <i className="right"></i>
                    </span>
                    <select
                      value={values.userResponse.Position}
                      onChange={handlePlayerPosition('Position')}
                      className="browser-default custom-select"
                      onBlur={handleBlurEvent('Position')}
                    >
                      <option value="defaultPlayer">--Player Position--</option>
                      {values.players.map((e, key) => {
                        return (
                          <option value={e.name} key={key}>
                            {e.name}
                          </option>
                        )
                      })}
                    </select>
                    {errors.Position ? (
                      <p className="inputError">{errors.Position}</p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-md-1"></div>

              <div className="col-md-5">
                <div className="registration_fields">
                  <label>Specific Role*</label>
                  <div className="customDropDownArrow">
                    <span>
                      <i className="right"></i>
                    </span>
                    <select
                      value={values.userResponse.Role}
                      onChange={handlePlayerPosition('Role')}
                      onBlur={handleBlurEvent('Role')}
                      className="browser-default custom-select"
                    >
                      <option value="default0">--Player Role--</option>
                      {values.skillsSet.map((e, key) => {
                        return (
                          <option value={e} key={key}>
                            {e}
                          </option>
                        )
                      })}
                    </select>
                    {errors.Role ? (
                      <p className="inputError">{errors.Role}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-5">
                <div className="registration_fields">
                  <label>Playing Foot*</label>
                  <div className="customDropDownArrow">
                    <span>
                      <i className="right"></i>
                    </span>
                    <select
                      value={values.userResponse.Foot}
                      onChange={handlePlayerPosition('Foot')}
                      onBlur={handleBlurEvent('Foot')}
                      className="browser-default custom-select"
                    >
                      <option defaultValue value="default">
                        Select Foot
                      </option>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                    {errors.Foot ? (
                      <p className="inputError">{errors.Foot}</p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-5">
                <div className="registration_fields">
                  <label>Player Agent</label>
                  <input
                    className="u-full-width"
                    placeholder="Agent Name"
                    type="text"
                    onChange={handleChange('Agent')}
                    defaultValue={values.userResponse.Agent}
                    autoFocus
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-11">
                <div className="registration_fields">
                  <label>Skills / Specialities</label>
                  <textarea
                    className=""
                    placeholder="Please add Skills / Specialities"
                    type="text"
                    onChange={handleChange('Skills')}
                    defaultValue={values.userResponse.Skills}
                    style={{ width: '100%', height: '60px' }}
                    required
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
  )
}

UserPersonalDetails.propTypes = {
  values: PropTypes.object,
  handlePlayerPosition: PropTypes.func,
  handleChange: PropTypes.func,
  nextStep: PropTypes.func,
  prevStep: PropTypes.func
}

export default UserPersonalDetails
