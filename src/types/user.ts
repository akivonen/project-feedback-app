type BaseUser = {
  id: string;
  name: string;
  username: string;
  image: string | null;
};

export type User = BaseUser & {
  password: string;
  created_at: Date;
};

export type UserCredentials = Pick<User, 'username' | 'password'>;

export type UserSignUpData = UserCredentials & {
  name: string;
  image?: File | null;
};

export type UserSignUpFormData = UserSignUpData & {
  confirmPassword: string;
};

export type UserInsertData = UserCredentials & {
  name: string;
  image?: string | null;
};

export type UserSessionProps = Omit<BaseUser, 'username'>;

export type UserProfileProps = UserSessionProps & {
  username: string;
};

export type UpdateUserProfileActionProps = Omit<UserSignUpData, 'password'> & {
  id: string;
  username: string;
};

export type UpdateUserProfileProps = Omit<UserSessionProps, 'image'> & {
  image?: string | null;
};

export type ChangeUserPasswordProps = {
  id: string;
  oldPassword: string;
  newPassword: string;
};
