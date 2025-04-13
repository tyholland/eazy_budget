import React, { JSX } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { defaultModalStyle, MediumModalStyle } from "../../constants.ts";
import { ElementSize } from "../../types";

interface ModalComponentProps {
  title: string;
  children: string | JSX.Element;
  isOpen: boolean;
  handleClose: () => void;
  size?: ElementSize;
}

const ModalComponent = ({
  title,
  children,
  isOpen,
  handleClose,
  size = "small",
}: ModalComponentProps) => {
  const modalSize =
    size === "small"
      ? defaultModalStyle
      : size === "medium"
        ? MediumModalStyle
        : {};

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={modalSize}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          {title}
        </Typography>
        <Box sx={{ mt: 2 }}>{children}</Box>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
