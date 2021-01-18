import axios from 'axios';
import { ActionTypes } from './index';

const API = 'https://rekall-server.herokuapp.com';

export const addAlbum = (userID, useralbum, sharedalbum) => {
  return (dispatch) => {
    axios.put(`${API}/user/updateUserInfo`,
    { 
        uid: userID,
        newUserInfo: {
            userAlbums: useralbum,
            sharedAlbums: sharedalbum,
        }
    },
    ).catch((e) => {
        console.log(`Error putting album: ${e}`);
    });
  };
};
