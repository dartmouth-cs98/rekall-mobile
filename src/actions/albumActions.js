import axios from 'axios';
import { ActionTypes } from './index';

const API = 'https://rekall-server.herokuapp.com';

export const addUserAlbum = (userID, useralbum) => {
  return (dispatch) => {
    axios.post(`${API}/album/addUserAlbum`,
    { 
        "uid": userID,
        "userAlbums": useralbum
    },
    ).catch((e) => {
        console.log(`Error putting user album: ${e}`);
    });
  };
};

export const addSharedAlbum = (userID, sharedalbum) => {
  return (dispatch) => {
    axios.post(`${API}/album/addSharedAlbum`,
    { 
        "uid": userID,
        "sharedAlbums": sharedalbum
    },
    ).catch((e) => {
        console.log(`Error putting shared album: ${e}`);
    });
  };
};
