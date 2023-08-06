import { useContext } from 'react';
import SocketApiContext from '../contexts/SocketApiContext';

const useSocketApi = () => useContext(SocketApiContext);

export default useSocketApi;
