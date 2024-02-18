import { Box, Card, List, Checkbox, FormControlLabel } from "@mui/material";
import Typography from "@mui/joy/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ListItemText from "@mui/material/ListItemText";
import { Button, ListItem } from "@mui/joy";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useEffect, useState } from "react";
import { getQuizByIdThunk } from "@/store/quiz/quizThunk";
import { CardLoading } from "@/components/common/CardLoading";
import { useForm, SubmitHandler } from "react-hook-form";
import { AddQuizInput, SolveQuiz } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { solveQuizById } from "@/utils/api";
import toast from "react-hot-toast";

const StartSolveQuiz = () => {
  const { id } = useParams();
  const quiz = useSelector((state: RootState) => state.quiz.quiz);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedSolution, setSelectedSolution] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getQuizByIdThunk(id));
        setLoading(false);
        setError("");
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setLoading(false);
        setError("Failed to fetch quiz. Please try again.");
      }
    };

    fetchData();
  }, [id, dispatch]);

  console.log(error);

  const mutation = useMutation({
    mutationFn: async (data: SolveQuiz) => {
      return await solveQuizById(id, data);
    },
    onSuccess: (res) => {
      if(res.result) {
        toast('Good Job! correct answer', {
          icon: '👏',
        });
      }else{
        toast.error("Unfortunately, the answer is wrong");
      }
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  
  const { register, handleSubmit } = useForm<SolveQuiz>();
  const onSubmit: SubmitHandler<SolveQuiz> = async (data: SolveQuiz) => {
    mutation.mutate(data);
  };

  const handleCheckboxChange = (value: string) => {
    setSelectedSolution(value);
  };



  return (
    <Card
      sx={{
        display: "block",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box sx={{ margin: "10px" }}>
        {loading ? (
          <CardLoading />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {quiz.map((quizItem) => (
              <List component="nav" key={quizItem.title}>
                <ListItem>
                  <ListItemIcon>
                    <AccessTimeFilledIcon />
                  </ListItemIcon>
                  <ListItemText primary={quizItem.title} />
                </ListItem>

                <Typography level="title-md">{quizItem.quiz}</Typography>

                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("solution")}
                      checked={selectedSolution === quizItem.soltion_one}
                      onChange={() =>
                        handleCheckboxChange(quizItem.soltion_one)
                      }
                    />
                  }
                  label={quizItem.soltion_one}
                />
                {selectedSolution === quizItem.soltion_one && (
                  <>
                    <input
                      type="hidden"
                      value={quizItem.soltion_one}
                      {...register("solution")}
                    />
                  </>
                )}

                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("solution")}
                      checked={selectedSolution === quizItem.soltion_two}
                      onChange={() =>
                        handleCheckboxChange(quizItem.soltion_two)
                      }
                    />
                  }
                  label={quizItem.soltion_two}
                />
                {selectedSolution === quizItem.soltion_two && (
                  <>
                    <input
                      type="hidden"
                      value={quizItem.soltion_two}
                      {...register("solution")}
                    />
                  </>
                )}

                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("solution")}
                      checked={selectedSolution === quizItem.soltion_three}
                      onChange={() =>
                        handleCheckboxChange(quizItem.soltion_three)
                      }
                    />
                  }
                  label={quizItem.soltion_three}
                />
                {selectedSolution === quizItem.soltion_three && (
                  <>
                    <input
                      type="hidden"
                      value={quizItem.soltion_three}
                      {...register("solution")}
                    />
                  </>
                )}

                <Box m={2} textAlign="center">
                  <Button type="submit" variant="outlined">
                    Send
                  </Button>
                </Box>
              </List>
            ))}
          </form>
        )}
      </Box>
    </Card>
  );
};

export default StartSolveQuiz;
