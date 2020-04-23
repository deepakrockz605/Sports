import React, { PureComponent } from 'react'
import { getUserSession } from '../../Services/playerRegistration'
import PropTypes from 'prop-types'

class Home extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount () {
    let userLog = sessionStorage.getItem('userData')
    userLog = JSON.parse(userLog)
    if (userLog) {
      getUserSession(userLog).then((res) => {
        if (res) {
          return true
        } else {
          sessionStorage.clear()
          this.props.history.push('/')
        }
      })
    } else {
      sessionStorage.clear()
      this.props.history.push('/')
    }
  }

  render () {
    return (
      <div className="wrapper"></div>
    )
  }
}

Home.propTypes = {
  history: PropTypes.object
}

export default Home
