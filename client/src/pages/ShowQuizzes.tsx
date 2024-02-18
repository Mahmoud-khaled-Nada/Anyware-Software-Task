import { Box, Card, Typography } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { getQuizThunk } from "@/store/quiz/quizThunk";
import { useEffect, useState } from "react";
import { CardLoading } from "@/components/common/CardLoading";
import { formatRelative } from "date-fns";
import { Link } from "react-router-dom";

const ShowQuizzes = () => {
  const quizzes = useSelector((state: RootState) => state.quiz.data);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getQuizThunk());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      {loading ? (
        <CardLoading />
      ) : (
        quizzes.map((item, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <Box p={2} display="flex" flexDirection="column">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-start",
                    alignItems: "center",
                  }}
                >
                  <ListItemIcon>
                    <AccessTimeFilledIcon />
                  </ListItemIcon>
                  <Typography variant="h6">{item.title}</Typography>
                </Box>
                <Typography variant="body1">{item.topic}</Typography>
                <Typography variant="body1">{item.quiz}</Typography>
                <Typography variant="body1">
                  {formatRelative(new Date(item.createdAt), new Date())}
                </Typography>
                <Box mt={2} textAlign="center">
                  <Link to={`/start-solve-quiz/${item.id}`}>
                    <Button variant="outlined" fullWidth>
                      Start Quiz
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default ShowQuizzes;
