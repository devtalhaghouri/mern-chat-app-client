import { Box, CloseButton } from "@chakra-ui/react";

const UserBageItem = ({ user, handleFunction }) => {
  return (
    <>
      <Box
        className="px-[6px] py-[5px] mx-[8]  flex gap-[4px] rounded-lg text-[12px] text-[white] bg-[purple] cursor-pointer items-center justify-start max-w-fit"
        onClick={handleFunction}
      >
        {user?.name}
        <CloseButton pl={1} height={"fit-content"} className="h-fit" />
      </Box>
    </>
  );
};

export default UserBageItem;
