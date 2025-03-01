import React from 'react';
import Button from './buttons/Button';
const AddComment = () => {
  return (
    <div className="flex w-full flex-col rounded-lg bg-white p-6 md:px-8 md:py-7">
      <h2 className="text-lg font-bold -tracking-[0.25px] text-dark-400">Add Comment</h2>
      <form>
        <label htmlFor="comment"></label>
        <textarea
          id="comment"
          className="border-1 mt-6 w-full rounded-md border-0 border-solid bg-light-200 p-4 text-sm text-dark-400 outline-none placeholder:text-sm placeholder:text-light-600 focus:border focus:border-solid focus:border-blue-300 md:text-[15px]"
          maxLength={250}
          rows={2}
          placeholder="Type your comment here"
          aria-label="Type your comment here"
        />
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-dark-200">250 characters left</span>
          <Button variant="purple" size="lg" type="submit">
            Post Comment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
