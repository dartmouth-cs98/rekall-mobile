import axios from 'axios';
import { ActionTypes } from './index';

const API = 'https://rekall-server.herokuapp.com';

export const addUserAlbum = (userID, albumName) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.put(`${API}/album/createAlbum`,
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
      axios.put(`${API}/album/createSharedAlbum`,
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

export const getAlbums = (userID) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get(`${API}/album/getAlbums/${userID}`)
      .then((res) => {
        dispatch({ type: ActionTypes.GET_ALBUMS, payload: res.data });
        resolve();
      }).catch((e) => {
        console.log(`Error fetching albums: ${e}`);
        reject(e);
      });
    });

  };
};

export const getSharedAlbums = (userID) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get(`${API}/album/getSharedAlbums/${userID}`)
      .then((res) => {
        dispatch({ type: ActionTypes.GET_SHARED_ALBUMS, payload: res.data });
        resolve();
      }).catch((e) => {
        console.log(`Error fetching shared albums: ${e}`);
        reject(e);
      });
    });

  };
};