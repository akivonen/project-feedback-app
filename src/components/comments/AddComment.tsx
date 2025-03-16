'use client';
import React from 'react';
import MessageForm from '../forms/MessageForm';
const AddComment = () => {
  return (
    <div className="flex w-full flex-col rounded-lg bg-white p-6 md:px-8 md:py-7">
      <h2 className="text-lg font-bold -tracking-[0.25px] text-dark-400">Add Comment</h2>
      <MessageForm />
    </div>
  );
};

export default AddComment;
