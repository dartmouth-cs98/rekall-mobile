import axios from 'axios';
import { ActionTypes } from './index';
import firebase from '../services/firebase';

const API = 'https://rekall-server.herokuapp.com';
// const API = 'http://localhost:9090';

export const fetchUserInfo = (userID) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get(`${API}/user/getUser/${userID}`)
      .then((res) => {
        // console.log(res.data);
        // console.log(res.data.email)
        // console.log(res.data.friends)
        // console.log(res.data.userAlbums)
        dispatch({ type: ActionTypes.FETCH_PROFILE_INFO, payload: res.data });
        resolve();
      }).catch((e) => {
        console.log(`Error fetching user info: ${e}`);
        reject(e);
      });
    });

  };
};

export const createUser = (first, last, email) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post(`${API}/user/createUser`, {
        "firstname": first,
        "lastname": last,
        "email": email
      })
      .then((res) => {
        console.log(res.data)
        dispatch({ type: ActionTypes.CREATE_USER, payload: res.data });
        console.log("Successfully created user!")
        resolve();
      }).catch((e) => {
        console.log(`Error creating user: ${e}`);
        reject(e);
      });
    });

  };
};

export const logIn = (userId) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/users/' + userId).once('value', (snapshot) => {
        dispatch({ type: ActionTypes.LOGIN, payload: snapshot.val().id });
        console.log("Successfully logged in and got mongo ID!")
        resolve();
      })
      .catch((e) => {
        console.log(`Error logging in: ${e}`);
        reject(e);
      });
    });

  };
};
