'use client';
import React from 'react';
import { Comment } from '@/types';

type CommentsListItemProps = {
  comment: Comment;
};

const CommentListItem: React.FC<CommentsListItemProps> = ({ comment }) => {
  return (
    <li className="flex flex-col">
      <div className="flex">{comment.id}</div>
    </li>
  );
};

export default CommentListItem;
