import { useContext, useState } from "react";
import { ChatContainer } from "../components/ChatContainer";
import { RightSidebar } from "../components/RightSidebar";
import { Sidebar } from "../components/Sidebar";
import { ChatContext } from "../../context/ChatContext";

export default function HomePage() {
  const { selectedUser } = useContext(ChatContext);
  return (
    <div className="w-full h-screen bg-white">
      <div
        className={`overflow-hidden h-[100%] grid grid-cols-1 relative bg-white shadow-xl ${
          selectedUser
            ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]"
            : "md:grid-cols-2"
        }`}
      >
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  );
}
