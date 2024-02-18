import { Grid } from "@mui/material";
import ExamsCard from "./ExamsCard";
import ViewAnnouncement from "./ViewAnnouncement";
import ShowTwoQuiz from "./ShowTwoQuiz";

const DashboardPage = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <ExamsCard />
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <ViewAnnouncement />
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <ShowTwoQuiz />
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;
