import axios from 'axios';
import { ActionTypes } from './index';

const API = 'https://rekall-server.herokuapp.com';
// const API = 'http://localhost:9090';

export const addFriend = (userID, email) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post(`${API}/friend/addFriend`,
      { 
          "uid": userID,
          "friendEmail": email
      },
      ).then((res) => {
        dispatch({ type: ActionTypes.FRIEND_SHENANIGANS, payload: email});
        resolve();
      }).catch((e) => {
          console.log(`Error putting friend: ${e}`);
          reject(e);
      });
    });
  };
};

export const requestFriend = (userID, email) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post(`${API}/friend/requestFriend`,
      { 
          "uid": userID,
          "friendEmail": email
      },
      ).then((res) => {
        dispatch({ type: ActionTypes.FRIEND_SHENANIGANS, payload: email});
        resolve();
      }).catch((e) => {
          console.log(`Error sending request: ${e}`);
          reject(e);
      });
    });
  };
};

export const declineRequest = (userID, email) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post(`${API}/friend/declineRequest`,
      { 
          "uid": userID,
          "friendEmail": email
      },
      ).then((res) => {
        dispatch({ type: ActionTypes.FRIEND_SHENANIGANS, payload: email});
        resolve();
      }).catch((e) => {
          console.log(`Error sending request: ${e}`);
          reject(e);
      });
    });
  };
};

export const removeFriend = (userID, email) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post(`${API}/friend/removeFriend`,
      { 
          "uid": userID,
          "friendEmail": email
      },
      ).then((res) => {
        console.log(res)
        resolve();
      }).catch((e) => {
          console.log(`Error removing friend: ${e}`);
          reject(e);
      });
    });
  };
};

export const banFriend = (userID, email) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post(`${API}/friend/banFriend`,
      { 
          "uid": userID,
          "friendEmail": email
      },
      ).then((res) => {
        console.log(res)
        resolve();
      }).catch((e) => {
          console.log(`Error banning friend: ${e}`);
          reject(e);
      });
    });
  };
};

export const banVideo = (userID, mediaID) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post(`${API}/friend/banVideo`,
      { 
          "uid": userID,
          "mid": mediaID
      },
      ).then((res) => {
        console.log(res)
        resolve();
      }).catch((e) => {
          console.log(`Error banning video: ${e}`);
          reject(e);
      });
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

