import { useNavigate } from "react-router-dom";
import assets, { userDummyData } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { Bird, Menu, Search } from "lucide-react";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, onlineUsers } = useContext(AuthContext);
  const { getUsers, users, selectedUser, setSelectedUser, unseen, setUnseen } =
    useContext(ChatContext);

  const [input, setInput] = useState("");

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);
  return (
    <div
      className={`bg-gray-50 h-full p-5 rounded-r-2xl overflow-y-scroll text-gray-800 border-r border-gray-200 ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bird className="w-8 h-8 text-black" />
            <span className="text-xl font-semibold text-black">App</span>
          </div>

          <div className="relative p-2 group">
            <Menu className="w-5 h-5 cursor-pointer text-gray-700 hover:text-black" />
            <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-white border border-gray-200 text-gray-800 hidden group-hover:block shadow-lg">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm hover:text-black"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-200" />
              <p
                onClick={() => logout()}
                className="cursor-pointer text-sm hover:text-black"
              >
                Logout
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-full flex items-center gap-2 py-3 px-4 mt-5">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="bg-transparent border-none outline-none text-gray-800 text-xs placeholder-gray-500 flex-1"
            placeholder="Search User"
          />
        </div>
      </div>

      <div className="flex flex-col">
        {filteredUsers.map((user, idx) => (
          <div
            onClick={() => {
              setSelectedUser(user);
              setUnseen((prev) => ({ ...prev, [user._id]: 0 }));
            }}
            key={idx}
            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm hover:bg-gray-100 ${
              selectedUser?._id === user._id && "bg-gray-100"
            }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt="avatar"
              className="w-[35px] aspect-square rounded-full"
            />
            <div className="flex flex-col leading-5">
              <p className="text-gray-800">{user.fullName}</p>
              {onlineUsers.includes(user._id) ? (
                <span className="text-green-600 text-xs">Online</span>
              ) : (
                <span className="text-gray-500 text-xs">Offline</span>
              )}
            </div>

            {unseen[user._id] > 0 && (
              <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-black text-white">
                {unseen[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
