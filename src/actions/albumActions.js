import axios from 'axios';
import { ActionTypes } from './index';

const API = 'https://rekall-server.herokuapp.com';

export const addUserAlbum = (userID, useralbum, sharedalbum) => {
  return (dispatch) => {
    axios.post(`${API}/user/updateUserInfo`,
    { 
        uid: '5fb47383de4e8ebf1d79d3b4',
        newUserInfo: {
            userAlbums: useralbum,
            sharedAlbums: sharedalbum,
        }
    }
      }).catch((e) => {
        console.log(`Error posting album: ${e}`);
      });
  };
};
