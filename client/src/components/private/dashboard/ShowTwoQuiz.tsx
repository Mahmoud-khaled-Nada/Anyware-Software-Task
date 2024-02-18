import { Box, Card, Divider, List } from "@mui/material";
import Typography from "@mui/joy/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ListItemText from "@mui/material/ListItemText";
import { ListItem } from "@mui/material";
import Button from "@mui/material/Button";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { getQuizThunk } from "@/store/quiz/quizThunk";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CardLoading } from "@/components/common/CardLoading";
import { formatRelative } from "date-fns";

const ShowTwoQuiz = () => {
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
    <Card
      sx={{
        display: "block",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box
        sx={{
          margin: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <Typography level="h3">
            what's due
            <br />
            <Typography level="body-xs">Lorem ipsum dolor sit amet.</Typography>
          </Typography>
          <Link to={"/show-quizzes"}>
            <Button>All</Button>
          </Link>
        </Box>
        <Divider />
        {loading ? (
          <CardLoading />
        ) : (
          quizzes.slice(-2).map((item, index) => (
            <List component="nav" key={index}>
              <ListItem>
                <ListItemIcon>
                  <AccessTimeFilledIcon />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
              <Typography level="title-md">{item.topic}</Typography>
              <Typography level="body-xs">{item.quiz}</Typography>
              <Typography level="body-xs">
                {formatRelative(new Date(item.createdAt), new Date())}
              </Typography>
              <Box m={2} textAlign="center">
              <Link to={`/start-solve-quiz/${item.id}`}>
                <Button variant="outlined" fullWidth>
                  Start Quiz
                </Button>
                </Link>
              </Box>
              <Divider />
            </List>
          ))
        )}
      </Box>
    </Card>
  );
};

export default ShowTwoQuiz;
