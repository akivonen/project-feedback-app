import * as Yup from 'yup';

export const commentSchema = Yup.object().shape({
  body: Yup.string().trim().required('Can`t be empty').min(1, 'Can`t be empty').max(250),
});
export const feedbackSchema = Yup.object().shape({
  title: Yup.string().min(1, "Can't be empty").required("Can't be empty"),
  category: Yup.string()
    .oneOf(['Feature', 'UI', 'UX', 'Enhancement', 'Bug'], 'Invalid category')
    .required('Category is required'),
  status: Yup.string().oneOf(['suggestion', 'planned', 'in-progress', 'live'], 'Invalid status'),
  description: Yup.string().min(1, "Can't be empty").required("Can't be empty"),
});
