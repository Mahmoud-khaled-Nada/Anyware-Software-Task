import { Navigate, createBrowserRouter } from "react-router-dom";
import { Dashboard, Login, Register, GetUsers, AddQuiz } from "@/pages";
import { DefaultLayout, GuestLayout } from "@/layout";
import RequireAuth from "./RequireAuth";
import EditAnnouncement from "@/components/private/dashboard/EditAnnouncement";
import ShowQuizzes from "@/pages/ShowQuizzes";
import StartSolveQuiz from "@/components/private/dashboard/StartSolveQuiz";

const router = createBrowserRouter([
  //! create children router...
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      {
        //! Authentication required
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "/edit-announcement/:id",
        element: <EditAnnouncement />,
      },
      {
        path: "/get-all-users",
        element: <GetUsers />,
      },
      {
        path: "/add-quiz",
        element: (
          <RequireAuth>
            <AddQuiz />,
          </RequireAuth>
        ),
      },
      {
        path: "/show-quizzes",
        element: <ShowQuizzes />,
      },
      {
        path: "/start-solve-quiz/:id",
        element: <StartSolveQuiz />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
