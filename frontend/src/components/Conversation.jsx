import { GrDeploy } from "react-icons/gr";

const Conversation = () => {
  return (
    <>
      <div className="flex gap-2 p-2 py-1 mb-0.5 transition-all duration-300 ease-out rounded cursor-pointer hover:bg-indigo-800/80 group">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="user avatar"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="font-bold text-white ">John Doe</p>
            <span className="text-xl">
              <GrDeploy className="text-indigo-700 transition-all duration-300 ease-out group-hover:text-white" />
            </span>
          </div>
        </div>
      </div>
      <div className="h-[1px] py-0 my-0 divider"></div>
    </>
  );
};

export default Conversation;
