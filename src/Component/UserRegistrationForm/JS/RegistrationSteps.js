import React, { PureComponent } from 'react'
import UserBasicDetails from './UserBasicDetails'
import UserPersonalDetails from './UserPersonalDetails'
import UserTechnicalAbilities from './UserTechnicalAbilities'
import UserClubExperiance from './UserClubExperiance'
import UserContactDetails from './UserContactDetails'
import UserFinalForm from './UserFinalForm'
import '../CSS/Steps.scss'
import { AddClubValidation } from './Validation'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import {
  getRegistrationDetails,
  getUserSession
} from '../../../Services/playerRegistration'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import FootballLoader from '../../Common/FootballLoader'

class RegistrationSteps extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isLoader: false,
      currentStep: 1,
      isLoading: true,
      isUserRegisterd: false,
      steps: {
        step1: true,
        step2: false,
        step3: false,
        step4: false,
        step5: false
      },
      userResponse: {
        // Step 1
        FirstName: '',
        LastName: '',
        DateOfBirth: null,
        Nationality: 'default',
        Height: '',
        Weight: '',
        file: '',
        Photo: '',
        // Step 2
        Position: 'defaultPlayer',
        Role: 'default0',
        Foot: 'default',
        Agent: '',
        Skills: '',

        // Step 3
        Ratings: {
          Catching: 0,
          Punching: 0,
          Throwing: 0,
          Reflexes: 0,
          Distribution: 0,
          Center_Defender: 0,
          Right_Back: 0,
          Left_Back: 0,
          Agility: 0,

          Tackle: 0,
          Strength: 0,
          Positioning: 0,
          Communication: 0,
          Ariel_Ability: 0,

          Vision: 0,
          Crossing: 0,
          Fitness: 0,

          Shooting: 0,
          Ball_Control: 0,
          Dribbling: 0,
          First_Touch: 0,
          Passing: 0,
          Heading: 0
        },

        // Step 4
        CurrentClubName: '',
        CurrentClubFrom: null,
        CurrentClubTo: null,
        CurrentClubsAchievements: '',
        Clubs: [
          {
            ClubName: '',
            From: null,
            To: null,
            Achievements: ''
          }
        ],
        ClubName: '',
        From: null,
        To: null,

        // Step 5
        MobileNumber: '',
        AlternateMobileNumber: '',
        Email: '',
        ReferencedCoach: '',
        Ambition: ''
      },

      age: 0,
      players: [],
      skillsSet: [],

      // Step 4

      playerAbilities: [],
      errors: {}
    }
  }

  handleImageChange = (e) => {
    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onloadend = () => {
      const userResponse = { ...this.state.userResponse }
      userResponse.file = file
      userResponse.Photo = reader.result
      this.setState({
        userResponse
      })
    }
    reader.readAsDataURL(file)
  }

  componentDidMount () {
    let userLog = sessionStorage.getItem('userData')
    userLog = JSON.parse(userLog)

    if (userLog) {
      this.setState({ isLoader: true })
      getUserSession(userLog).then((res) => {
        if (res) {
          getRegistrationDetails(userLog).then((res) => {
            if (res) {
              res.DateOfBirth = new Date(res.DateOfBirth)
              for (let i = 0; i < res.Clubs.length; i++) {
                if (res.Clubs[i].From !== null) {
                  res.Clubs[i].From = new Date(res.Clubs[i].From)
                }
                if (res.Clubs[i].To !== null) {
                  res.Clubs[i].To = new Date(res.Clubs[i].To)
                }
              }
              this.setState({
                userResponse: res,
                isUserRegisterd: true,
                isLoader: false
              })
            } else {
              const userResponse = { ...this.state.userResponse }
              userResponse.FirstName = userLog.FirstName
              userResponse.LastName = userLog.LastName
              userResponse.Email = userLog.Email
              this.setState({
                userResponse,
                isLoader: false
              })
            }
          })
        } else {
          sessionStorage.clear()
          this.props.history.push('/')
        }
      })
    } else {
      sessionStorage.clear()
      this.props.history.push('/')
    }

    this.setState({
      players: [
        {
          name: 'Goal Keeper',
          playerskills: ['Goal Keeper'],
          techAbilities: [
            'Catching',
            'Punching',
            'Throwing',
            'Reflexes',
            'Distribution',
            'Agility'
          ]
        },
        {
          name: 'Defender',
          playerskills: ['Center_Defender', 'Right_Back', 'Left_Back'],
          techAbilities: [
            'Tackle',
            'Strength',
            'Positioning',
            'Communication',
            'Ariel_Ability'
          ]
        },
        {
          name: 'Mid Fielder',
          playerskills: [
            'Center Attacking Mid-fielder(CAM)',
            'Center Defending Mid-fielder(CDM)',
            'Right Mid-Fielder',
            'Left Mid-Fielder',
            'Right Winger',
            'Left Winger'
          ],
          techAbilities: [
            'Passing',
            'Dribbling',
            'Ball_Control',
            'Vision',
            'Crossing',
            'Fitness'
          ]
        },
        {
          name: 'Striker',
          playerskills: ['Center Forward', 'Second Striker'],
          techAbilities: [
            'Shooting',
            'Ball_Control',
            'Dribbling',
            'First_Touch',
            'Passing',
            'Heading'
          ]
        }
      ]
    })
  }

  addPreviousClub = async (e) => {
    e.preventDefault()
    const obj = {
      ClubName: '',
      From: null,
      To: null,
      Achievements: ''
    }
    const error = AddClubValidation(this.state.userResponse)

    if (error.rowSucess) {
      const Clubs = [...this.state.userResponse.Clubs, obj]
      this.state.userResponse.Clubs = Clubs
      this.setState({
        Clubs
      })
    }
  }

  handlePrevStartDatePicker = (i) => (date) => {
    const Clubs = [...this.state.userResponse.Clubs]
    Clubs[i].From = date
    this.setState({
      Clubs
    })
  }

  handlePrevEndDatePicker = (i) => (date) => {
    const Clubs = [...this.state.userResponse.Clubs]
    Clubs[i].To = date
    this.setState({
      Clubs
    })
  }

  handleAchievementsChange = (i) => async (e) => {
    const Clubs = [...this.state.userResponse.Clubs]
    Clubs[i].Achievements = e.target.value
    this.setState({
      Clubs
    })
  }

  setSteps = (step1, step2, step3, step4, step5) => {
    const steps = {}
    steps.step1 = step1
    steps.step2 = step2
    steps.step3 = step3
    steps.step4 = step4
    steps.step5 = step5

    this.setState({
      steps: steps
    })
  }

  setTopBar = (val) => {
    if (val === 1) {
      this.setSteps(true, false, false, false, false)
    } else if (val === 2) {
      this.setSteps(true, true, false, false, false)
    } else if (val === 3) {
      this.setSteps(true, true, true, false, false)
    } else if (val === 4) {
      this.setSteps(true, true, true, true, false)
    } else if (val === 5) {
      this.setSteps(true, true, true, true, true)
    }
    return val
  }

  nextStep = (val) => {
    const topSteps = this.setTopBar(val)
    this.setState({
      currentStep: topSteps
    })
  }

  prevStep = (val) => {
    const topSteps = this.setTopBar(val)
    this.setState({
      currentStep: topSteps
    })
  }

  handleChange = (input) => (e) => {
    const userResponse = { ...this.state.userResponse }
    userResponse[input] = e.target.value
    this.setState({ userResponse })
  }

  handleChangeMobile = (input) => (e) => {
    const userResponse = { ...this.state.userResponse }
    userResponse[input] = e.target.value
    this.setState({ userResponse })
  }

  handleDatePicker = (input) => (date) => {
    const userResponse = { ...this.state.userResponse }
    userResponse[input] = date

    this.setState({ userResponse })
    console.log(this.state.userResponse.DateOfBirth)

    if (input === 'DateOfBirth') {
      if (this.state.userResponse.DateOfBirth !== null) {
        var today = new Date()
        var birthDate = new Date(this.state.userResponse.DateOfBirth)
        var ageNow = today.getFullYear() - birthDate.getFullYear()
        this.setState({
          age: ageNow
        })
      }
    }
  }

  handlePlayerPosition = (input) => (e) => {
    const userResponse = { ...this.state.userResponse }
    userResponse[input] = e.target.value
    this.setState({ userResponse })
  }

  handleSliderChange = (field, val) => {
    const fields = this.state.userResponse.Ratings
    fields[field] = val
    this.setState({ fields })
    this.forceUpdate()
  }

  handleText = (i) => (e) => {
    const Clubs = [...this.state.userResponse.Clubs]
    Clubs[i].ClubName = e.target.value
    this.setState({
      Clubs
    })
  }

  handleRemoveClub = (i) => async (e) => {
    e.preventDefault()
    const Clubs = [
      ...this.state.userResponse.Clubs.slice(i + 1),
      ...this.state.userResponse.Clubs.slice(0, i)
    ]
    this.state.userResponse.Clubs = Clubs
    this.setState({
      Clubs
    })
  }

  handleChangeSteps = (e) => {
    const topSteps = this.setTopBar(e)
    this.setState({ currentStep: topSteps })
    console.log(topSteps)
  }

  render () {
    const { currentStep } = this.state
    const values = { ...this.state }

    toastr.options = { positionClass: 'toast-top-center' }

    var data = ''
    switch (currentStep) {
      case 1:
        data = (
          <UserBasicDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleImageChange={this.handleImageChange}
            handleDatePicker={this.handleDatePicker}
            values={this.state}
          />
        )
        break
      case 2:
        data = (
          <UserPersonalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handlePlayerPosition={this.handlePlayerPosition}
            handleChange={this.handleChange}
            values={values}
          />
        )
        break
      case 3:
        data = (
          <UserTechnicalAbilities
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
            handleSliderChange={this.handleSliderChange}
          />
        )
        break
      case 4:
        data = (
          <UserClubExperiance
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleDatePicker={this.handleDatePicker}
            addPreviousClub={this.addPreviousClub}
            handleText={this.handleText}
            handleRemoveClub={this.handleRemoveClub}
            handlePrevStartDatePicker={this.handlePrevStartDatePicker}
            handlePrevEndDatePicker={this.handlePrevEndDatePicker}
            handleAchievementsChange={this.handleAchievementsChange}
            values={values}
          />
        )
        break
      case 5:
        data = (
          <UserContactDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleChangeMobile={this.handleChangeMobile}
            values={values}
          />
        )
        break
      default:
        return (
          <UserFinalForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
            userLog={this.props}
          />
        )
    }

    return (
      <div className="registration_Wrapper">
        {this.state.isLoader ? (
          <div className="loader-resto">
            <div className="loader">
              <FootballLoader />
              {/* <Loader type="Bars" color="#00BFFF" height={40} width={40} /> */}
            </div>
          </div>
        ) : null}
        <div className="Multistep--stepsBar">
          <div className="container">
            <ul className="Multistep--stepsBarUl">
              <li
                className={
                  this.state.steps.step1
                    ? ' Multistep--stepsBarList isvisited'
                    : ' Multistep--stepsBarList'
                }
              >
                <div className="multistep--box">
                  <p
                    className="multistep--Innerbox"
                    id="stepone"
                    onClick={
                      this.state.steps.step1
                        ? () => this.handleChangeSteps(1)
                        : null
                    }
                  >
                    1
                  </p>
                </div>
              </li>

              <li
                className={
                  this.state.steps.step2
                    ? ' Multistep--stepsBarList isvisited'
                    : ' Multistep--stepsBarList'
                }
              >
                <div className="multistep--box">
                  <p
                    className="multistep--Innerbox"
                    id="steptwo"
                    onClick={
                      this.state.steps.step2
                        ? () => this.handleChangeSteps(2)
                        : null
                    }
                  >
                    2
                  </p>
                </div>
              </li>
              <li
                className={
                  this.state.steps.step3
                    ? ' Multistep--stepsBarList isvisited'
                    : ' Multistep--stepsBarList'
                }
              >
                <div className="multistep--box">
                  <p
                    className="multistep--Innerbox"
                    id="stepthree"
                    onClick={
                      this.state.steps.step3
                        ? () => this.handleChangeSteps(3)
                        : null
                    }
                  >
                    3
                  </p>
                </div>
              </li>
              <li
                className={
                  this.state.steps.step4
                    ? ' Multistep--stepsBarList isvisited'
                    : ' Multistep--stepsBarList'
                }
              >
                <div className="multistep--box">
                  <p
                    className="multistep--Innerbox"
                    id="stepfour"
                    onClick={
                      this.state.steps.step4
                        ? () => this.handleChangeSteps(4)
                        : null
                    }
                  >
                    4
                  </p>
                </div>
              </li>
              <li
                className={
                  this.state.steps.step5
                    ? ' Multistep--stepsBarList isvisited'
                    : ' Multistep--stepsBarList'
                }
              >
                <div className="multistep--box">
                  <p
                    className="multistep--Innerbox"
                    id="stepfive"
                    onClick={
                      this.state.steps.step5
                        ? () => this.handleChangeSteps(5)
                        : null
                    }
                  >
                    5
                  </p>
                </div>
              </li>
            </ul>
            <div>
              <p className="mandatoryText">* All Fields are Mandatory</p>
            </div>
          </div>
        </div>
        <div>{data}</div>
      </div>
    )
  }
}

RegistrationSteps.propTypes = {
  loginData: PropTypes.object,
  history: PropTypes.object,
  push: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    loginData: state.data.loginData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegistrationSteps)
)
