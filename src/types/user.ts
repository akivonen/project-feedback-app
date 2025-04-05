export type User = {
  id: string;
  name: string;
  password: string;
  username: string;
  image: string | null;
  created_at: Date;
};

export type UserSignInData = {
  username: string;
  password: string;
};

export type UserSignUpData = UserSignInData & {
  name: string;
};

export type UserSessionProps = {
  id: string;
  username: string;
  name: string;
  image: string | null;
};
