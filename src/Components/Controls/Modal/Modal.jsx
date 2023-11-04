import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

const Model = ({ isOpen, onClose, children, ...rest }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} {...rest}>
        <ModalOverlay />
        <ModalContent style={{margin:"0 10px"}}>{children}</ModalContent>
      </Modal>
    </>
  );
};

export default Model;
