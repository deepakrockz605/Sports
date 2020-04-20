import { combineReducers } from 'redux'
import { dataReducer } from './dataReducer'
// import authReducer from './authReducer'
// import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  // auth: authReducer
  data: dataReducer
})
