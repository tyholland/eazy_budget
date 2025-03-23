import { fn } from "@storybook/test";
import Modal from "../components/Modal/Modal.tsx";

const ModalStory = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { handleClose: fn() },
};

export const Primary = {
  args: {
    title: "Netflix",
    isOpen: true,
    children: "Body of modal",
  },
};

export default ModalStory;
