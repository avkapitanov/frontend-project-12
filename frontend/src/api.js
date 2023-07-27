import axios from 'axios';
import routes from './routes';

export const getChannels = (token) => axios.get(routes.api.dataPath(), {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});