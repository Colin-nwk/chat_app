import ConversationList from "./ConversationList";
import SearchInput from "./SearchInput";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineReload } from "react-icons/ai";
import useLogout from "../hooks/useLogout";

const Sidebar = () => {
  const { logout, loading } = useLogout();
  return (
    <div className="flex flex-col p-4 border-r border-white/20">
      <SearchInput />
      <div className="px-3 divider"></div>
      <ConversationList />

      <div className="mt-auto">
        {loading ? (
          <AiOutlineReload className="transition-all duration-500 ease-out cursor-not-allowed size-8 animate-spin " />
        ) : (
          <BiLogOut
            className="transition-all duration-300 ease-out cursor-pointer size-8 hover:text-indigo-800/80"
            onClick={logout}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
