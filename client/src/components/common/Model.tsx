/* eslint-disable @typescript-eslint/prefer-as-const */
import { Box, Typography, Modal } from "@mui/material";
import { FC } from "react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  head: string;
  body: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Model: FC<Props> = ({ open, setOpen, head, body }) => {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {head}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {body}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Model;
