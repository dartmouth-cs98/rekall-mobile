import axios from 'axios';
import { ActionTypes, API } from './index';

export const fetchUserInfo = (userID) => {
  return (dispatch) => {
    axios.get(`${API}/user/getUser/${userID}`)
      .then((res) => {
        console.log(res);
        dispatch({ type: ActionTypes.FETCH_PROFILE_INFO, payload: res.data });
      }).catch((e) => {
        console.log(`Error fetching user info: ${e}`);
      });
  };
};

