import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress size="md" />
    </Box>
  );
};

export default Loading;
