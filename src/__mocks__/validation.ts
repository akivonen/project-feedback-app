// src/__mocks__/validation.ts
export const commentSchema = {
  validate: jest.fn((values) => {
    const { body } = values;
    if (!body) {
      return Promise.reject({ body: 'Can`t be empty' });
    }
    if (body.length > 250) {
      return Promise.reject({ body: 'Comment must be 250 characters or less' });
    }
    return Promise.resolve({});
  }),
};
