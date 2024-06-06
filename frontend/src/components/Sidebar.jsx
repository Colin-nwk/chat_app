import ConversationList from "./ConversationList";
import SearchInput from "./SearchInput";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
  return (
    <div className="flex flex-col p-4 border-r border-white/20">
      <SearchInput />
      <div className="px-3 divider"></div>
      <ConversationList />

      <div className="mt-auto">
        <BiLogOut className="transition-all duration-300 ease-out cursor-pointer size-8 hover:text-indigo-800/80" />
      </div>
    </div>
  );
};

export default Sidebar;
