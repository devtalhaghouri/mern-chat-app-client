import { Skeleton } from "@chakra-ui/react";

const ChatLoading = () => {
  return (
    <>
      {[1, 2, 3, 4, 5]?.map((item, key) => (
        <>
          <Skeleton
            height="70.5px"
            className="rounded-lg mb-[10px]"
            key={key}
            fadeDuration={1}

          />
        </>
      ))}
    </>
  );
};

export default ChatLoading;
