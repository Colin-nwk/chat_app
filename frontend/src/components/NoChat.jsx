import { PiChatsFill } from "react-icons/pi";
import { useAuthContext } from "../context/AuthContext";
const NoChat = () => {
  const { authUser } = useAuthContext();
  console.log(authUser);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center gap-2 px-4 font-semibold text-center text-white sm:text-lg md:text-xl">
        <p>
          {" "}
          Welcome,{" "}
          <span className="text-indigo-600">
            {authUser?.fullName}
            {" a.k.a "}({authUser?.username})
          </span>
        </p>
        <p> Select a chat to start messaging</p>
        <PiChatsFill className="text-center size-12 md:size-16" />
      </div>
    </div>
  );
};

export default NoChat;
