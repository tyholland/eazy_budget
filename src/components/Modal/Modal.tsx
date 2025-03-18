import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

interface ModalComponentProps {
  title: string;
  children: string | JSX.Element;
  isOpen: boolean;
  handleClose: () => void;
}

const ModalComponent = ({
  title,
  children,
  isOpen,
  handleClose,
}: ModalComponentProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Box sx={{ mt: 2 }}>{children}</Box>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
