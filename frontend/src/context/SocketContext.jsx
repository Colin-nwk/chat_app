/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};
// export const SocketContextProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const { authUser } = useAuthContext();
//   useEffect(() => {
//     if (authUser) {
//       const socket = io("http://localhost:5001", {
//         query: {
//           userId: authUser._id,
//         },
//       });
//       setSocket(socket);
//       socket.on("getOnlineUsers", (users) => {
//         setOnlineUsers(users);
//       });

//       return () => socket.close();
//     } else {
//       if (socket) {
//         socket.close();
//         setSocket(null);
//       }
//     }
//   }, [authUser]);
//   return (
//     <SocketContext.Provider value={{ socket, onlineUsers }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };
export const SocketContextProvider = ({ children }) => {
  const { authUser } = useAuthContext();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (authUser) {
      const existingSocket = socket;
      const userId = authUser._id;

      if (existingSocket && existingSocket.userId !== userId) {
        // Close existing socket if the userId changes
        existingSocket.close();
        setSocket(null);
      }

      if (!existingSocket || existingSocket.userId !== userId) {
        // Create a new socket if it doesn't exist or the userId changes
        const newSocket = io("http://localhost:5001", {
          query: { userId },
        });

        newSocket.userId = userId; // Store userId in socket for comparison

        newSocket.on("connect", () => {
          console.log("Socket connected");
        });

        newSocket.on("disconnect", () => {
          console.log("Socket disconnected");
          setOnlineUsers([]);
        });

        newSocket.on("getOnlineUsers", (users) => {
          setOnlineUsers(users);
        });

        setSocket(newSocket);
      }
    } else {
      // Close socket if authUser is null
      if (socket) {
        socket.close();
        setSocket(null);
      }
      setOnlineUsers([]);
    }
  }, [authUser, socket]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
