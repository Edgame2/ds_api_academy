import axios from 'axios';
const API_URL = 'http://localhost:7000';

export const getPosts = async () => {
    return await axios.get(`${API_URL}/posts`);
}
