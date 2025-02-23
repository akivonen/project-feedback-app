import React from 'react';

export default async function FeedbackDetailsPage({ params }) {
  const { feedbackId } = await params;

  return <div>{feedbackId}</div>;
}
