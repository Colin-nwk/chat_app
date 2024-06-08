import { useState } from "react";
import useConversation from "../zustand/useConversation";
import useGetConversation from "../hooks/useGetConversation";
import toast from "react-hot-toast";
const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("search must be at least 3 characters");
    }

    const foundConversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (foundConversation) {
      setSelectedConversation(foundConversation);
      setSearch("");
    } else {
      toast.error(`No such user as ${search}`);
      setSearch("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label className="flex items-center gap-2 text-white input input-bordered bg-indigo-950/20">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="cursor-pointer size-7 opacity-70 hover:text-indigo-600"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </label>
    </form>
  );
};

export default SearchInput;
