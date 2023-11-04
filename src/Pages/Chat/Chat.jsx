import ChatBox from "../../Components/Chats/ChatBox";
import MyChats from "../../Components/Chats/MyChats";
import Header from "../../Components/Header/Header";
import MetaData from "../../Components/MetaData";
import { useMedia } from "../../hook/hook";

const Chat = () => {
  const isMobile = useMedia("(max-width: 768px)");

  return (
    <>
      <MetaData title={"Home -- Chat App"} />

      <section id="chat" className="w-[100%] h-[100%]">
        <Header />

        <div
          className="h-[89vh] px-[10px] py-[10px] gap-[10px]"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.3fr 3fr ",
          }}
        >
          <MyChats />
          <ChatBox />
        </div>
      </section>
    </>
  );
};

export default Chat;
