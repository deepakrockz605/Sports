import axios from './index'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

export const getRegistrationDetails = (userLog) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userLog.token}`
    }
  }
  return axios
    .get(`Player?playerId=${userLog.userId}`, config)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

export const userRegister = (userDetails, userLog) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userLog.token}`
    }
  }
  return axios
    .post(
      'Player/create',
      {
        UserId: userLog.userId,
        FirstName: userDetails.FirstName,
        LastName: userDetails.LastName,
        DateOfBirth: userDetails.DateOfBirth,
        Nationality: userDetails.Nationality,
        Height: userDetails.Height,
        Weight: userDetails.Weight,
        Photo: userDetails.Photo,
        Position: userDetails.Position,
        Role: userDetails.Role,
        Foot: userDetails.Foot,
        Skills: userDetails.Skills,
        Agent: userDetails.Agent,
        Clubs: userDetails.Clubs,
        Ratings: userDetails.Ratings,
        Ambition: userDetails.Ambition,
        MobileNumber: userDetails.MobileNumber,
        AlternateMobileNumber: userDetails.AlternateMobileNumber,
        Email: userDetails.Email,
        ReferencedCoach: userDetails.ReferencedCoach
      },
      config
    )
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })
}

export const userUpdate = (userDetails, userLog) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userLog.token}`
    }
  }
  return axios
    .post(
      'Player/update',
      {
        UserId: userLog.userId,
        FirstName: userDetails.FirstName,
        LastName: userDetails.LastName,
        DateOfBirth: userDetails.DateOfBirth,
        Nationality: userDetails.Nationality,
        Height: userDetails.Height,
        Weight: userDetails.Weight,
        Photo: userDetails.Photo,
        Position: userDetails.Position,
        Role: userDetails.Role,
        Foot: userDetails.Foot,
        Skills: userDetails.Skills,
        Agent: userDetails.Agent,
        Clubs: userDetails.Clubs,
        Ratings: userDetails.Ratings,
        Ambition: userDetails.Ambition,
        MobileNumber: userDetails.MobileNumber,
        AlternateMobileNumber: userDetails.AlternateMobileNumber,
        Email: userDetails.Email,
        ReferencedCoach: userDetails.ReferencedCoach
      },
      config
    )
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getUserSession = (userLog) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userLog.token}`
    }
  }
  return axios
    .get('User/verifysession', config)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
      toastr.error('Session Expired !!!')
      localStorage.clear()
    })
}
