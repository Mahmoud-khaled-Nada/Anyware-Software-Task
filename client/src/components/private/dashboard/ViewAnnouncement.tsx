import * as React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import { Button, Card } from "@mui/joy";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteAnnouncementById, getAnnouncement } from "@/utils/api";
import { formatRelative } from "date-fns";
import Loading from "@/components/common/Loading";
import AddNewAnnouncement from "./AddNewAnnouncement";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { announcementsItem } from "@/utils/types";
export default function ViewAnnouncement() {
  const [open, setOpen] = React.useState<boolean>(false);

  const query = useQuery({
    queryKey: ["getAnnouncement"],
    queryFn: async () => {
      return await getAnnouncement();
    },
  });
  query.refetch();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteAnnouncementById(id);
    },
    onSuccess: (res) => {
      // console.log(res);
      toast.success(res.message);
    },
    onError: (error) => {
      console.log(error.message);
      error && toast.error("Please try again.");
    },
  });

  const deleteAnnouncement = (id: string) => mutation.mutate(id);

  return (
    <Card
      sx={{
        width: "100%",
        display: "block",
        flexDirection: { xs: "column", sm: "row" },
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography level="title-lg" textColor="text.secondary" component="h1">
          View Announcement
        </Typography>
        <Button onClick={() => setOpen(true)}>Add</Button>
      </Box>
      <ListDivider sx={{ m: 0 }} />
      <AddNewAnnouncement open={open} setOpen={setOpen} />
      <List
        sx={{
          [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]:
            {
              borderLeft: "2px solid",
              borderLeftColor: "var(--joy-palette-primary-outlinedBorder)",
            },
        }}
      >
        {query.isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            {query?.data.map((item: announcementsItem, index: number) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemButton>
                    <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
                      <Avatar alt="" srcSet="https://i.pravatar.cc/40?img=3" />
                    </ListItemDecorator>
                    <Box sx={{ pl: 2, width: "100%" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 0.5,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <Typography level="body-lg">
                            {item.users.name}
                          </Typography>
                          <Box
                            sx={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "99px",
                            }}
                          />
                        </Box>
                        <Typography level="body-xs" textColor="text.tertiary">
                          {formatRelative(new Date(item.createdAt), new Date())}
                          <Box
                            sx={{
                              marginLeft: "50%",
                              marginTop: "10px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Link
                              to={`/edit-announcement/${item.id}`}
                              style={{ color: "#2e7d32" }}
                            >
                              <ModeEditIcon />
                            </Link>

                            <HighlightOffIcon
                              onClick={() => deleteAnnouncement(item.id)}
                              style={{ color: "#b71c1c" }}
                            />
                          </Box>
                        </Typography>
                      </Box>
                      <div>
                        <Typography level="body-sm" sx={{ ml: 1 }}>
                          {item.body}
                        </Typography>
                      </div>
                    </Box>
                  </ListItemButton>
                </ListItem>
                <ListDivider sx={{ m: 0 }} />
              </React.Fragment>
            ))}
          </>
        )}
      </List>
    </Card>
  );
}
