import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterInput } from "@/utils/types";
import Alert from "@mui/material/Alert";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "@/utils/api";

const Register = () => {
  const navigate = useNavigate();
  
  const mutation = useMutation({
    mutationFn: async (data: RegisterInput) => {
      return await postRegister(data);
    },
    onSuccess: (res) => {
      toast.success(res.data.message);
      if (res.status == 201) {
        navigate("/login");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>();
  const onSubmit: SubmitHandler<RegisterInput> = async (data: RegisterInput) =>
    mutation.mutate(data);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
           Register
          </Typography>
          {errors.name && (
            <Alert severity="error">{errors.name?.message}: (name)</Alert>
          )}
          {errors.email && (
            <Alert severity="error">{errors.email?.message}: (email)</Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              label="Name"
              autoFocus
              {...register("name", {
                required: "This field is required",
              })}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              autoFocus
              {...register("email", {
                required: "This field is required",
              })}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              {...register("password", {
                required: "This field is required",
              })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link to={"/login"}>{"Don have an account? Sign In"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
