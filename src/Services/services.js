import axios from './index'

export const checkUserName = (userName) => {
  return axios
    .get(`User/checkusername?userName=${userName}`)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })
}

export const register = (newUser) => {
  console.log('register -> ', newUser)
  return axios
    .post('User/signup', {
      FirstName: newUser.FirstName,
      LastName: newUser.LastName,
      UserName: newUser.UserName,
      Email: newUser.Email,
      Password: newUser.Password
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })
}

export const login = (user) => {
  return axios
    .post('User/login', {
      UserName: user.username,
      Password: user.password,
      sso: user.sso ? user.sso : undefined
    })
    .then((res) => {
      sessionStorage.setItem('userData', JSON.stringify(res.data))
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
}
