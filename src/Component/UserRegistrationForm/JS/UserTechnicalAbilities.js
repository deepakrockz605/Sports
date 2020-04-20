import React from 'react'
import { Button } from 'semantic-ui-react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import PropTypes from 'prop-types'

function UserTechnicalAbilities ({
  values,
  handleSliderChange,
  nextStep,
  prevStep
}) {
  const handleContinue = (evt) => {
    evt.preventDefault()
    nextStep(4)
  }

  const handleBack = (evt) => {
    evt.preventDefault()
    prevStep(2)
  }

  // debugger

  if (values.userResponse.Position !== 'defaultPlayer') {
    // values.skillsSet = values.players.find(
    //   cntry => cntry.name === values.userResponse.Position
    // ).playerskills;

    values.playerAbilities = values.players.find(
      (cntry) => cntry.name === values.userResponse.Position
    ).techAbilities
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
                <span>Technical Abilities</span>
              </div>
            </div>

            <div className="player_information_box">
              <div className="row">
                {values.playerAbilities.map((e, key) => {
                  return (
                    <div className="col-md-6" key={key}>
                      <div className="registration_fields registration_fields_error ">
                        <label>{e}</label>

                        <div className="slider">
                          <Slider
                            min={0}
                            max={5}
                            onChange={handleSliderChange.bind(
                              values.userResponse.Ratings[e],
                              e
                            )}
                            value={values.userResponse.Ratings[e]}
                          />
                          <div className="value">
                            {values.userResponse.Ratings[e]}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
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

UserTechnicalAbilities.propTypes = {
  values: PropTypes.object,
  handleSliderChange: PropTypes.func,
  nextStep: PropTypes.func,
  prevStep: PropTypes.func
}

export default UserTechnicalAbilities
