/* eslint-disable @typescript-eslint/prefer-as-const */
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Textarea } from "@mui/joy";
import { useForm, SubmitHandler } from "react-hook-form";
import { AnnouncementInput } from "@/utils/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { createAnnouncement } from "@/utils/api";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddNewAnnouncement: React.FC<Props> = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  const user = useSelector((state: RootState) => state.user.data);

  const mutation = useMutation({
    mutationFn: async (data: AnnouncementInput) => {
      return await createAnnouncement(data);
    },
    onSuccess: (res) => {
      toast.success(res.data.message);
    },
    onError: (error) => {
      error && toast.error("please try again");
    },
  });

  const { register, handleSubmit } = useForm<AnnouncementInput>();
  const onSubmit: SubmitHandler<AnnouncementInput> = async (
    data: AnnouncementInput
  ) => mutation.mutate(data);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h3">
              Add New Announcement
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                "& > :not(style)": { width: "100%", marginBottom: "10px" },
              }}
            >
              <input type="hidden" value={user?.id} {...register("user_id")} />
              <Textarea
                aria-label="Announcement"
                minRows={3}
                placeholder="Minimum 3 rows"
                {...register("announcement_body")}
              />
              <Button type="submit">Add</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddNewAnnouncement;
