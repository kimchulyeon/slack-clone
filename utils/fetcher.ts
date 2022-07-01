import axios from 'axios';

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((response) => {
    // 유저 데이터: {id: 1, nickname: 'test', email: 'test@test.com'} || false
    return response.data;
  });

export default fetcher;
