// import { createContext, useState, useEffect } from "react";
// import { useAuthContext } from "./AuthContext";
// import io from "socket.io-client";
// export const SocketContext = createContext();

// export const SocketContextProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const { authUser } = useAuthContext();
//   useEffect(() => {
//     if (authUser) {
//       const socket = io("ws://localhost:5001");
//       setSocket(socket);
//       return () => socket.close();
//     } else {
//       if (socket) {
//         socket.close();
//         setSocket(null);
//       }
//     }
//   }, [authUser, socket]);
//   return (
//     <SocketContext.Provider value={{ socket, onlineUsers }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  const memoizedSocket = useMemo(() => {
    if (authUser) {
      const newSocket = io("ws://localhost:5001");
      newSocket.on("online_users", (users) => {
        setOnlineUsers(users);
      });
      return newSocket;
    }
    return null;
  }, [authUser]);

  useEffect(() => {
    if (memoizedSocket) {
      setSocket(memoizedSocket);
      return () => {
        memoizedSocket.off("online_users");
        memoizedSocket.close();
      };
    }
  }, [memoizedSocket]);

  const sendUserStatus = useCallback(() => {
    if (socket) {
      socket.emit("user_status", authUser);
    }
  }, [socket, authUser]);

  useEffect(() => {
    if (socket) {
      sendUserStatus();
    }
  }, [socket, sendUserStatus]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
