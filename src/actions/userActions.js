import axios from 'axios';
import { ActionTypes } from './index';

const API = 'https://rekall-server.herokuapp.com';

export const fetchUserInfo = (userID) => {
  return (dispatch) => {
    axios.get(`${API}/user/getUser/${userID}`)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.email)
        console.log(res.data.friends)
        console.log(res.data.userAlbums)
        dispatch({ type: ActionTypes.FETCH_PROFILE_INFO, payload: res.data });
      }).catch((e) => {
        console.log(`Error fetching user info: ${e}`);
      });
  };
};

