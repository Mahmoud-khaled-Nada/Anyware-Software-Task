/* eslint-disable @typescript-eslint/prefer-as-const */
import { FC } from "react";
import { Box, Typography, Modal } from "@mui/material";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ExamTipsModel: FC<Props> = ({ open, setOpen }) => {
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
            Exams tips
          </Typography>

          <Tabs aria-label="Basic tabs" defaultValue={0}>
            <TabList>
              <Tab> Start Early</Tab>
              <Tab>Create a Study Schedule</Tab>
              <Tab> Practice Regularly</Tab>
            </TabList>
            <TabPanel value={0}>
              <b>First</b> Begin your exam preparation well in advance to avoid
              last-minute cramming. This allows you to cover the material
              thoroughly and
            </TabPanel>
            <TabPanel value={1}>
              <b>Second</b> Plan a study schedule that allocates sufficient time
              for each subject or topic. Break down your study sessions into
              manageable chunks to maintain focus and productivity.
            </TabPanel>
            <TabPanel value={2}>
              <b>Third</b> Practice past exam papers or sample questions to
              familiarize yourself with the exam format and improve your
              problem-solving skills. Practice helps build confidence and
              reduces anxiety on
            </TabPanel>
          </Tabs>
        </Box>
      </Modal>
    </div>
  );
};

export default ExamTipsModel;
