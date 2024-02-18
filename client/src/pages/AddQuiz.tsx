import { Card } from "@mui/joy";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { AddQuizInput } from "@/utils/types";
import AlertMommon from "@/components/common/AlertMommon";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { createQuizThunk } from "@/store/quiz/quizThunk";

const AddQuiz = () => {
  const user = useSelector((state: RootState) => state?.user?.data);

  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddQuizInput>();
  const onSubmit: SubmitHandler<AddQuizInput> = async (data: AddQuizInput) =>
    dispatch(createQuizThunk(data));

  return (
    <Card
      sx={{
        display: "block",
        flexDirection: { xs: "column", sm: "row" },
        height: "100%",
      }}
    >
      {errors.quiz && (
        <>
          <AlertMommon body="All field is required" />
        </>
      )}
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add New Quiz
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Title..."
                  {...register("title", {
                    required: "This field is required",
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <input
                  type="hidden"
                  value={user?.id ?? ""}
                  {...register("user_id")}
                />
                <TextField
                  fullWidth
                  label="Topic..."
                  {...register("topic", {
                    required: "This field is required",
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Quiz"
                  {...register("quiz", {
                    required: "This field is required",
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="soltion correct"
                  {...register("soltion_correct", {
                    required: "This field is required",
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="solution one..."
                  {...register("soltion_one", {
                    required: "This field is required",
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="solution two..."
                  {...register("soltion_two", {
                    required: "This field is required",
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="solution three..."
                  {...register("soltion_three", {
                    required: "This field is required",
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Button type="submit" variant="contained">
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Card>
  );
};

export default AddQuiz;
