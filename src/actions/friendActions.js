import axios from 'axios';
import { ActionTypes } from './index';

const API = 'https://rekall-server.herokuapp.com';
// const API = 'http://localhost:9090';

export const addFriend = (userID, email) => {
  return (dispatch) => {
    axios.post(`${API}/friend/addFriend`,
    { 
        "uid": userID,
        "friendEmail": email
    },
    ).then((res) => {
      dispatch({ type: ActionTypes.ADD_FRIEND, payload: email});
    }).catch((e) => {
        console.log(`Error putting friend: ${e}`);
    });
  };
};

// export const getFriends = (userID) => {
//     return (dispatch) => {
//       axios.post(`${API}/friend/getFriends/${userID}`)
//       .then((res) => {
//         dispatch({ type: ActionTypes.GET_FRIENDS, payload: res});
//       }).catch((e) => {
//           console.log(`Error getting friend: ${e}`);
//       });
//     };
//   };

