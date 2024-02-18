import { useForm, SubmitHandler } from "react-hook-form";
import { EditAnnouncementInput } from "@/utils/types";
import { getAnnouncementById, updateAnnouncementById } from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@mui/joy";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { Textarea } from "@mui/joy";
import toast from "react-hot-toast";

const EditAnnouncement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: announcementData, isLoading } = useQuery({
    queryKey: ["getAnnouncementById", id],
    queryFn: async () => {
      return await getAnnouncementById(id);
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: EditAnnouncementInput) => {
      return await updateAnnouncementById(id, data);
    },
    onSuccess: (res) => {
      toast.success(res.message);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log(error.message);
      error && toast.error("Please try again.");
    },
  });

  const { register, handleSubmit } = useForm<EditAnnouncementInput>();

  const onSubmit: SubmitHandler<EditAnnouncementInput> = async (
    data: EditAnnouncementInput
  ) => mutation.mutate(data);

  return (
    <Card
      sx={{
        width: "100%",
        display: "block",
        flexDirection: { xs: "column", sm: "row" },
        height: "100%",
      }}
    >
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
            Edit
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 3, width: "100%" }}
          >
            {isLoading ? (
              <Typography>Loading...</Typography>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Textarea
                    aria-label="Announcement"
                    minRows={3}
                    placeholder="Minimum 3 rows"
                    defaultValue={
                      announcementData?.getData.body || "loading..."
                    }
                    {...register("edit_announcement_body")}
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Button type="submit" variant="contained">
                    Edit
                  </Button>
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
      </Container>
    </Card>
  );
};

export default EditAnnouncement;
