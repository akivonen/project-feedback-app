import * as Yup from 'yup';

export const commentSchema = Yup.object().shape({
  body: Yup.string().trim().required('Can`t be empty').min(1, 'Can`t be empty').max(250),
});
