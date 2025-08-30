import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import assets from "../assets/assets";

export const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  // get all images
  useState(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, []);

  return (
    selectedUser && (
      <div
        className={`bg-gray-50 text-gray-800 w-full relative overflow-y-scroll border-l border-gray-200 ${
          selectedUser ? "max-md:hidden" : ""
        }`}
      >
        <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt=""
            className="w-20 aspect-square rounded-full"
          />
          <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2 text-gray-800">
            {onlineUsers.includes(selectedUser._id) && (
              <span className="size-2 rounded-full bg-green-500 inline-block" />
            )}
            {selectedUser.fullName}
          </h1>
          <p className="px-10 mx-auto text-gray-600">{selectedUser.bio}</p>
        </div>
        <hr className="border-gray-200 my-4" />

        <div className="px-5 text-xs">
          <p className="text-gray-800">Media</p>
          <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4">
            {msgImages.map((url, idx) => (
              <div
                key={idx}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded hover:opacity-80"
              >
                <img src={url} alt="" className="h-full rounded-md" />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => logout()}
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-black hover:bg-gray-800 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer transition-colors"
        >
          Logout
        </button>
      </div>
    )
  );
};
