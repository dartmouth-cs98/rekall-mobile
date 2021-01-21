import axios from 'axios';
import { ActionTypes } from './index';

const API = 'https://rekall-server.herokuapp.com';

export const addUserAlbum = (userID, albumName) => {
  return (dispatch) => {
    axios.post(`${API}/album/addUserAlbum`,
    { 
        "uid": userID,
        "userAlbums": albumName
    },
    ).then((res) => {
      dispatch({ type: ActionTypes.ADD_USER_ALBUM, payload: albumName});
    }).catch((e) => {
        console.log(`Error putting user album: ${e}`);
    });
  };
};

export const addSharedAlbum = (userID, albumName) => {
  return (dispatch) => {
    axios.post(`${API}/album/addSharedAlbum`,
    { 
        "uid": userID,
        "sharedAlbums": albumName
    },
    ).then((res) => {
      dispatch({ type: ActionTypes.ADD_SHARED_ALBUM, payload: albumName});
    }).catch((e) => {
        console.log(`Error putting shared album: ${e}`);
    });
  };
};
