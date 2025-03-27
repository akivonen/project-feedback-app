import * as Yup from 'yup';

export const commentSchema = Yup.object().shape({
  body: Yup.string().trim().required('Can`t be empty').min(1, 'Can`t be empty').max(250),
});

export const feedbackSchema = Yup.object().shape({
  title: Yup.string().trim().min(1, "Can't be empty").required("Can't be empty"),
  category: Yup.string()
    .oneOf(['Feature', 'UI', 'UX', 'Enhancement', 'Bug'], 'Invalid category')
    .required('Category is required'),
  status: Yup.string().oneOf(['Suggestion', 'Planned', 'In-Progress', 'Live'], 'Invalid status'),
  description: Yup.string().trim().min(1, "Can't be empty").required("Can't be empty"),
});

export const signInSchema = Yup.object().shape({
  username: Yup.string().trim().min(3, 'At least 3 character').required('Username is required'),
  password: Yup.string().trim().min(6, 'At least 6 characters').required('Password is required'),
});

export const signUpSchema = Yup.object().shape({
  name: Yup.string().trim().min(3, 'At least 2 character').required('Name is required'),
  username: Yup.string().trim().min(3, 'At least 3 character').required('Username is required'),
  password: Yup.string().trim().min(6, 'At least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .trim()
    .min(4, 'At least 6 characters')
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});
