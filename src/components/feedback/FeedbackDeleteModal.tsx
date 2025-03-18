'use client';
import Modal from 'react-modal';
import Button from '../buttons/Button';
import React, { useEffect } from 'react';

type FeedbackDeleteModalProps = {
  modalIsOpen: boolean;
  setModalIsOpen: (value: React.SetStateAction<boolean>) => void;
  handleRemoveFeedback: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
  isDeleting: boolean;
};

const FeedbackDeleteModal: React.FC<FeedbackDeleteModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
  handleRemoveFeedback,
  isSubmitting,
  isDeleting,
}) => {
  useEffect(() => {
    const appElement = document.getElementById('feedback');
    if (appElement) {
      Modal.setAppElement('#feedback');
    } else {
      console.warn('Element with id="feedback" not found in the DOM');
    }
  }, []);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      className="modal mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
      overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      aria={{ labelledby: 'delete-confirmation' }}
    >
      <h3 className="text-center text-base text-dark-400 md:text-lg" id="delete-confirmation">
        Are you sure you want to delete this feedback?
      </h3>
      <form
        className="mt-6 flex flex-col justify-center gap-4 md:flex-row"
        onSubmit={handleRemoveFeedback}
      >
        <Button type="button" size="xl" variant="dark-blue" onClick={() => setModalIsOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" size="xl" variant="orange" disabled={isSubmitting || isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </form>
    </Modal>
  );
};

export default FeedbackDeleteModal;
