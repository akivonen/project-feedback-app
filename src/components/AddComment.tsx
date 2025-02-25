import React from 'react';
import Button from './buttons/Button';
const AddComment = () => {
  return (
    <div className="flex w-full flex-col rounded-lg bg-white p-6 md:px-8 md:py-7">
      <h2 className="text-lg font-bold -tracking-[0.25px] text-dark-400">Add Comment</h2>
      <div>
        <label htmlFor="comment"></label>
        <textarea
          id="comment"
          className="placehlder:text-sm border-1 mt-6 w-full rounded-md border-solid border-blue-300 bg-light-200 p-4 placeholder:text-light-600"
          maxLength={250}
          rows={2}
          placeholder="Type your comment here"
          aria-label="Type your comment here"
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-dark-200">250 characters left</span>
        <Button variant="purple" size="lg">
          Post Comment
        </Button>
      </div>
    </div>
  );
};

export default AddComment;
