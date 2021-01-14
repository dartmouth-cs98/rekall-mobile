import { ActionTypes } from '../actions';

const initState = {
  firstname: '',
  lastname: '',
  email: '',
  profilePic: ''
};

const UserReducer = (state = initState, action) => {
  switch(action) {
    case ActionTypes.FETCH_PROFILE_INFO:
      return {
        ...state,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        email: action.payload.email,
        profilePic: action.payload.email
      };
    default:
      return state;
  }
};

export default UserReducer;



