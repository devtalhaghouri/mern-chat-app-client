import { useMedia } from "../../hook/hook";

import { ChatState } from "../../Context/ChatProvider";
import SingleChat from "./SingleChat";

const ChatBox = () => {
  const isMobile = useMedia("(max-width: 768px)");
  const { selectedChat } = ChatState();
  return (
    <>
      <section
        id="chatBox"
        className="bg-[white] max-w-[100%] h-[100%] rounded-[6px]"
        style={{
          display:
            isMobile && !selectedChat
              ? "none"
              : selectedChat
              ? "block"
              : "block",
        }}
      >
        <div className="container pt-[10px] py-[15px] px-[15px] flex flex-col gap-[10px] h-[100%] w-[100%] max-w-[100%]">
          <SingleChat />
        </div>
      </section>
    </>
  );
};

export default ChatBox;
