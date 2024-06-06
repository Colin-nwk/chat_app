import MessageContainer from "../components/MessageContainer";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <>
      <div className=" p-6 bg-indigo-600 bg-opacity-0 shadow-md round-lg bg-clip-padding backdrop-filter backdrop-blur-lg sm:h-[450px] md:h-[550px] overflow-clip flex">
        <Sidebar />
        <MessageContainer />
      </div>
    </>
  );
};

export default Home;
