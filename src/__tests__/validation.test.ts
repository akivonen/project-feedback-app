import { commentSchema } from '@/validation';

describe('commentSchema', () => {
  it('validates non-empty comment', async () => {
    await expect(commentSchema.validate({ body: 'Valid comment' })).resolves.toEqual({
      body: 'Valid comment',
    });
  });

  it('rejects empty comment', async () => {
    await expect(commentSchema.validate({ body: '' })).rejects.toThrow('Validation failed');
  });
});
