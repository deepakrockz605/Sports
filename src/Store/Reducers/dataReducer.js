const storeData = {
  userId: '',
  loginData: {},
  userDetails: null
}

export const dataReducer = (data = storeData, action) => {
  // debugger
  // console.log('dataReducer ', action)
  if (action.type === 'GET_USERID') {
    return { ...data, userId: action.payload }
  }

  if (action.type === 'LOGIN_USERID') {
    return { ...data, loginData: action.payload }
  }

  if (action.type === 'GET_USERDETAILS') {
    console.log('GET_USERDETAILS', action.payload)
    return {
      ...data,
      userDetails: action.payload
    }
  }

  return data
}
