import axios from 'axios';
import API_KEY from '../../config.js';

const API_URL = 'https://www.googleapis.com/youtube/v3/search';

// Code taken from dartmouth cs52 react intro SA
const youtubeSearch = (term) => {
    const params = {
      part: 'snippet',
      key: API_KEY,
      q: term,
      type: 'video',
      maxResults: 15,
    };
  
    return new Promise((resolve, reject) => {
      axios.get(API_URL, { params })
        .then(response => {
          // console.log("HERE")
          // console.log(response.data.items)
          resolve(response.data.items);
        })
        .catch(error => {
          console.log(`youtube api error: ${error}`);
          reject(error);
        });
    });
  };
  
export default youtubeSearch;