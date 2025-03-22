import * as Yup from 'yup';

export const commentSchema = Yup.object().shape({
  body: Yup.string().trim().required('Can`t be empty').min(1, 'Can`t be empty').max(250),
});

export const feedbackSchema = Yup.object().shape({
  title: Yup.string().min(1, "Can't be empty").required("Can't be empty"),
  category: Yup.string()
    .oneOf(['Feature', 'UI', 'UX', 'Enhancement', 'Bug'], 'Invalid category')
    .required('Category is required'),
  status: Yup.string().oneOf(['Suggestion', 'Planned', 'In-Progress', 'Live'], 'Invalid status'),
  description: Yup.string().min(1, "Can't be empty").required("Can't be empty"),
});

export const signInSchema = Yup.object().shape({
  username: Yup.string().min(1, 'At least 1 character').required('Username is required'),
  password: Yup.string().min(4, 'At least 4 characters').required('Password is required'),
});
