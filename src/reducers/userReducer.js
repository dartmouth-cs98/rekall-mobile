import { ActionTypes } from '../actions';

const initState = {
  uid: '',
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

      var friends = [];
      console.log(action)
      for (var i = 0; i < action.payload.friends.length; i++) {
          // friends.push(action.payload.friends[i].firstname + ' ' + action.payload.friends[i].lastname)
          friends.push({
            id: i.toString(),
            title: action.payload.friends[i].firstname + ' ' + action.payload.friends[i].lastname,
            email: action.payload.friends[i].email
        });
      }

      return {
        ...state,
        // uid: action.payload._id,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        email: action.payload.email,
        profilePic: action.payload.profilePic,
        friends: friends,
        userAlbums: action.payload.userAlbums,
        sharedAlbums: action.payload.sharedAlbums,
      };
    case ActionTypes.CREATE_USER:
      return {
        ...state,
        uid: action.payload._id,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        email: action.payload.email,
      };
    case ActionTypes.LOGIN:
      return {
        ...state,
        uid: action.payload,
      };
    case ActionTypes.ADD_USER_ALBUM:
      return {
        ...state,
        userAlbums: [...state.userAlbums, action.payload],
      };
    case ActionTypes.ADD_SHARED_ALBUM:
      return {
        ...state,
        sharedAlbums: [...state.sharedAlbums, action.payload],
      };
    case ActionTypes.ADD_FRIEND:
        return {
          ...state,
          friends: [...state.friends],
        };
    default:
      return state;
  }
};

export default UserReducer;



