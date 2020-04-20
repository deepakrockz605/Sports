import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Dashboard.scss'
import { getUserSession } from '../../Services/playerRegistration'

class Dashboard extends PureComponent {
  updateInfo = () => {
    this.props.history.push('/player-register')
  }

  componentDidMount () {
    let userLog = sessionStorage.getItem('userData')
    userLog = JSON.parse(userLog)
    if (userLog) {
      getUserSession(userLog).then((res) => {
        if (res) {
          return true
        } else {
          this.props.history.push('/login')
        }
      })
    } else {
      this.props.history.push('/login')
    }
  }

  render () {
    return (
      <div className="dashBoard-wrapper">
        <div className="container bgImg">
          <div className="card">
            <div className="face face1">
              <div className="content">
                <img src={require('../../Images/resume.png')} alt="Resume" />
                <h4>Add Information</h4>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>
                  Your correct Information gives us better way to design your
                  portfolio.Try to give all information so that your portfolio
                  becomes impressive.
                </p>
                <button onClick={this.updateInfo}>Enter</button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="face face1">
              <div className="content">
                <img src={require('../../Images/user.png')} alt="User" />
                <h4>View portfolio</h4>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>
                  We Hope you have added your information now its time to see
                  your portfolio. Your portfolio will give you new identity and
                  help you to reach out to your dream club.
                </p>
                <button>Enter</button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="face face1">
              <div className="content">
                <img src={require('../../Images/eye.png')} alt="eye" />
                <h4>Visited By</h4>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>
                  We hope you have created your portfolio. Here you will see all
                  clubs/coaches/souts who have visited your profile and some of
                  them might be contacting you soon.
                </p>
                <button>Enter</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  history: PropTypes.object
  // push: PropTypes.func
}

export default withRouter(Dashboard)
