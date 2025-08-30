import { Bird, Send } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import assets from "../assets/assets";
import { formatMsgTime } from "../lib/utils";

export const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  const scrollEnd = useRef();

  const [input, setInput] = useState("");

  // send message
  async function handleSendMessage(e) {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessage({ text: input.trim() });
    setInput("");
  }

  // image sending
  async function handleSendImage(e) {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      toast.error("select and image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="h-full overflow-scroll relative bg-white">
      {/* header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-gray-200">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt=""
          className="w-8 rounded-full aspect-square"
        />
        <p className="flex-1 text-lg text-gray-800 flex items-center gap-2">
          {selectedUser.fullName}{" "}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="size-2 rounded-full bg-green-500" />
          )}
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt="arrow icon"
          className="md:hidden max-w-7"
        />
      </div>

      {/* chatarea */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-end gap-2 justify-end ${
              msg.senderId !== authUser._id && "flex-row-reverse"
            }`}
          >
            {msg.image ? (
              <img
                src={msg.image}
                className="max-w-[230px] border border-gray-300 rounded-lg overflow-hidden mb-8"
              />
            ) : (
              <p
                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all text-white ${
                  msg.senderId === authUser._id
                    ? "rounded-br-none bg-black"
                    : "rounded-bl-none bg-gray-400"
                }`}
              >
                {msg.text}
              </p>
            )}

            <div className="text-center text-xs">
              <img
                src={
                  msg.senderId === authUser._id
                    ? authUser?.profilePic
                    : selectedUser?.profilePic || assets.avatar_icon
                }
                alt=""
                className="w-7 rounded-full aspect-square object-cover"
              />
              <p className="text-gray-500">{formatMsgTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}

        <div ref={scrollEnd}></div>
      </div>

      {/* bottom input area */}

      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3 bg-white border-t border-gray-200">
        <div className="flex-1 flex items-center bg-gray-100 px-3 rounded-full">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
            type="text"
            placeholder="Send a message"
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-gray-800 placeholder-gray-500 bg-transparent"
          />
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            hidden
          />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              className="w-5 mr-2 cursor-pointer"
              alt=""
            />
          </label>
        </div>
        <Send
          onClick={handleSendMessage}
          className="w-7 h-7 cursor-pointer text-black hover:text-gray-700"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-gray-50 max-md:hidden">
      <Bird className="w-16 h-16 text-black" />
      <p className="text-lg font-medium text-gray-800">
        Chat anytime, anywhere
      </p>
    </div>
  );
};
