import React from 'react'
import { Button } from 'semantic-ui-react'
import Slider from 'react-rangeslider'
import moment from 'moment'
import PropTypes from 'prop-types'

function UserFinalForm ({ values, userLog, nextStep, prevStep }) {
  const handleContinue = (evt) => {
    evt.preventDefault()
    userLog.history.push('/dashboard')
  }

  const handleBack = (evt) => {
    evt.preventDefault()
    prevStep(5)
  }

  if (values.userResponse.Position !== 'defaultPlayer') {
    values.playerAbilities = values.players.find(
      (cntry) => cntry.name === values.userResponse.Position
    ).techAbilities
  }
  const finalValues = values.userResponse
  return (
    <>
      <div className="player_information_form player_information_form_review">
        <div className="container">
          <div className="player_basic_information">
            <div className="verticle_line">
              <div className="hero"></div>
              <div className="triangle-right"></div>
              <div className="first-application-data first-application-data-kyc">
                <span>Final Review Form</span>
              </div>
            </div>

            <div className="player_information_box">
              <>
                <div className="row">
                  <div className="col-md-12">
                    <div className="reviewData reviewProfileData ">
                      {finalValues.Photo === '' ? (
                        <img
                          className="ImagePreview"
                          src={require('../../../Images/profile.jpg')}
                          alt=""
                        />
                      ) : (
                        <img
                          className="ImagePreview"
                          src={finalValues.Photo}
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                </div>
                <h1 className="FinalReviewHeader FinalReviewHeaderPT">
                  Basic Information
                </h1>
                <div className="row FinalReviewHeaderRow">
                  <div className="col-md-4">
                    <div className="reviewData">
                      <p className="reviewData--header">Firstname</p>
                      <p className="reviewData--value">
                        {finalValues.FirstName}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="reviewData">
                      <p className="reviewData--header">Lastname</p>
                      <p className="reviewData--value">
                        {finalValues.LastName}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="reviewData">
                      <p className="reviewData--header">Nationality</p>
                      <p className="reviewData--value">
                        {finalValues.Nationality}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="reviewData">
                      <p className="reviewData--header">Date of Birth</p>
                      <p className="reviewData--value">
                        {moment(finalValues.DateOfBirth).format('DD-MM-YYYY')}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="reviewData">
                      <p className="reviewData--header">Age</p>
                      <p className="reviewData--value">{values.age}</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="reviewData">
                      <p className="reviewData--header">Height</p>
                      <p className="reviewData--value">{finalValues.Height}</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="reviewData">
                      <p className="reviewData--header">Weight</p>
                      <p className="reviewData--value">{finalValues.Weight}</p>
                    </div>
                  </div>
                </div>
              </>

              <>
                <h1 className="FinalReviewHeader">Personal Information</h1>
                <div className="row FinalReviewHeaderRow">
                  <div className="col-md-4">
                    <div className="reviewData">
                      <p className="reviewData--header">Player Position</p>
                      <p className="reviewData--value">
                        {finalValues.Position}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="reviewData">
                      <p className="reviewData--header">Specific Role</p>
                      <p className="reviewData--value">{finalValues.Role}</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="reviewData">
                      <p className="reviewData--header">Player Foot</p>
                      <p className="reviewData--value">{finalValues.Foot}</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="reviewData">
                      <p className="reviewData--header">Player Agent</p>
                      <p className="reviewData--value">
                        {finalValues.Agent === '' ? (
                          'none'
                        ) : (
                          <span>{finalValues.Agent}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="reviewData">
                      <p className="reviewData--header">
                        Skills / Specialities
                      </p>
                      <p className="reviewData--value">
                        {finalValues.Skills === '' ? (
                          'none'
                        ) : (
                          <span>{finalValues.Skills}</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </>

              <>
                <h1 className="FinalReviewHeader">Technical Abilities</h1>
                <div className="row FinalReviewHeaderRow">
                  {values.playerAbilities.map((e, key) => {
                    return (
                      <div className="col-md-4" key={key}>
                        <div className="reviewData">
                          <p className="reviewData--header">{e}</p>
                          <div className="slider">
                            <Slider
                              min={0}
                              max={5}
                              disabled
                              value={values.userResponse.Ratings[e]}
                            />
                          </div>
                          <p
                            className="reviewData--value"
                            style={{ textAlign: 'center' }}
                          >
                            {values.userResponse.Ratings[e]}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>

              <div className="FinalReviewHeaderRow FinalReviewHeaderClubRow">
                <>
                  <h1 className="FinalReviewHeader">Club Experiance</h1>
                </>

                {finalValues.Clubs.length > 0 ? (
                  <div className="PrevClubData" style={{ paddingTop: '25px' }}>
                    {finalValues.Clubs.map((e, key) => {
                      return (
                        <div className="row" key={key}>
                          <div className="col-md-4">
                            <div className="reviewData">
                              <p className="reviewData--header">
                                Previously Played Clubs
                              </p>
                              <p className="reviewData--value">
                                {e.ClubName === ''
                                  ? 'Not Associated with any club'
                                  : e.ClubName}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="reviewData">
                              <p className="reviewData--header">From Date</p>
                              <p className="reviewData--value">
                                {e.From === null
                                  ? '-'
                                  : moment(e.From).format('DD-MM-YYYY')}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="reviewData">
                              <p className="reviewData--header">To Date</p>
                              <p className="reviewData--value">
                                {e.To === null
                                  ? '-'
                                  : moment(e.To).format('DD-MM-YYYY')}
                              </p>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="reviewData">
                              <p className="reviewData--header">Achievements</p>
                              <p className="reviewData--value">
                                {e.Achievements === '' ? '' : e.Achievements}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : null}
              </div>

              <>
                <h1 className="FinalReviewHeader">Contact Information</h1>
                <div className="row FinalReviewHeaderRow FinalReviewHeaderRowBT">
                  <div className="col-md-4">
                    <div className="reviewData">
                      <p className="reviewData--header">Mobile Number</p>
                      <p className="reviewData--value">
                        {finalValues.MobileNumber}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="reviewData">
                      <p className="reviewData--header">
                        Alternate Mobile Number
                      </p>
                      <p className="reviewData--value">
                        {finalValues.AlternateMobileNumber === '' ? (
                          '-'
                        ) : (
                          <span>{finalValues.AlternateMobileNumber}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="reviewData">
                      <p className="reviewData--header">Email ID</p>
                      <p className="reviewData--value">{finalValues.Email}</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="reviewData">
                      <p className="reviewData--header">
                        Reference of Any Coach
                      </p>
                      <p className="reviewData--value">
                        {finalValues.ReferencedCoach === '' ? (
                          'No'
                        ) : (
                          <span>{finalValues.ReferencedCoach}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="reviewData">
                      <p className="reviewData--header">
                        Your Ambition & Motivation
                      </p>
                      <p className="reviewData--value">
                        {finalValues.Ambition === '' ? (
                          'none'
                        ) : (
                          <span>{finalValues.Ambition}</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
          <div className="basicSubmitDetails">
            <Button className="NEXT-btn" onClick={handleBack}>
              EDIT
            </Button>
            <Button className="NEXT-btn" onClick={handleContinue}>
              CONFIRM
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

UserFinalForm.propTypes = {
  userLog: PropTypes.any,
  values: PropTypes.object,
  nextStep: PropTypes.func,
  prevStep: PropTypes.func
}

export default UserFinalForm
