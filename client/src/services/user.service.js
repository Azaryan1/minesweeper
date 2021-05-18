import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class UserService {
  submitResult(username, level, time, isWin) {
    return axios.post(
      `${API_URL}submit`,
      { username, level, time, isWin },
      {
        headers: authHeader(),
      }
    );
  }
}

export default new UserService();
