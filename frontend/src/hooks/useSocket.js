import { useContext } from 'react';
import SocketContext from '../contexts/SocketContext.js';

export const useSocket = () => useContext(SocketContext);