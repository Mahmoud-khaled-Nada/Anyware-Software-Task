export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};
export type AnnouncementInput = {
  user_id: string;
  announcement_body: string;
};

export type EditAnnouncementInput = {
  edit_announcement_body: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type UserStateType = {
  data: User | null;
  token: string;
};

export type PrivateRouteProps = {
  children: React.ReactNode;
};

export type announcementsItem = {
  id: string;
  body: string;
  userId?: string;
  createdAt?: string | undefined;
  users: User;
};

export type AddQuizInput = {
  user_id: string;
  title: string;
  topic: string;
  quiz: string;
  soltion_correct: string;
  soltion_one: string;
  soltion_two: string;
  soltion_three: string;
};

export type QuizStateType = {
  data: AddQuizInput | null;
  quiz: AddQuizInput | null;
};

export type SolveQuiz = {
  solution: string | null;
};
