import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import QuizIcon from "@mui/icons-material/Quiz";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const mainListItems = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    path: "/get-all-users",
    name: "Users",
    icon: <GroupIcon />,
  },
  {
    path: "/add-quiz",
    name: "Add Quiz",
    icon: <QuizIcon />,
  },
  {
    path: "/show-quizzes",
    name: "Show Quizzes",
    icon: <VisibilityIcon />,
  },
];
