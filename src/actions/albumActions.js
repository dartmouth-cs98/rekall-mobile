import axios from 'axios';
import { ActionTypes } from './index';

const API = 'https://rekall-server.herokuapp.com';

export const addUserAlbum = (userID, albumName) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post(`${API}/album/createAlbum`,
      { 
          "_id": userID,
          "albumName": albumName
      },
      ).then((res) => {
        dispatch({ type: ActionTypes.ADD_USER_ALBUM, payload: albumName});
        resolve();
      }).catch((e) => {
          console.log(`Error putting user album: ${e}`);
          reject(e);
      });
    });
  };
};

export const addSharedAlbum = (userID, albumName, sharedWith) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post(`${API}/album/addSharedAlbum`,
      { 
          "user": {
            "_id": userID
          },
          "album": {
            "name": albumName,
            "sharedWith": sharedWith
          }
      },
      ).then((res) => {
        dispatch({ type: ActionTypes.ADD_SHARED_ALBUM, payload: albumName});
        resolve();
      }).catch((e) => {
          console.log(`Error putting shared album: ${e}`);
          reject(e);
      });
    });
  };
};
