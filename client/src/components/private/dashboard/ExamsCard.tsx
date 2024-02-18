import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import { useState } from "react";
import ExamTipsModel from "./ExamTipsModel";

const ExamsCard = () => {
  const [open, setOpen] = useState(false);
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        height: "100%",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8} md={8} lg={8}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="h5" gutterBottom>
            Exams Tips
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "start" }}>
              <Button
                variant="contained"
                disableElevation
                onClick={() => setOpen(true)}
              >
                View exams tips
              </Button>
              <ExamTipsModel open={open} setOpen={setOpen} />
            </Box>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <CardMedia
            component="img"
            image="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGV4YW18ZW58MHx8MHx8fDA%3D"
            alt="Live from space album cover"
            sx={{ width: "100%", height: "100%" }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default ExamsCard;
