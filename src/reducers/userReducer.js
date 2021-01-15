import { ActionTypes } from '../actions';

const initState = {
  firstname: '',
  lastname: '',
  email: '',
  profilePic: '',
  friends: [],
  userAlbums: [],
  sharedAlbums: [],
};

const UserReducer = (state = initState, action) => {
  switch(action.type) {
    case ActionTypes.FETCH_PROFILE_INFO:
      return {
        ...state,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        email: action.payload.email,
        profilePic: action.payload.profilePic,
        friends: action.payload.friends,
        userAlbums: action.payload.userAlbums,
        sharedAlbums: action.payload.sharedAlbums,
      };
    default:
      return state;
  }
};

export default UserReducer;



