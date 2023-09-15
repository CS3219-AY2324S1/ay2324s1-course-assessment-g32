import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

export function DeletionWindow({ isOpen, onClose, onConfirm }) {

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Alert variant="danger">
        <Alert.Heading>Are you sure you want to delete this question?</Alert.Heading>
        <p>
          This question will be deleted from the database permanently.
        </p>
        <hr />

        <div className="d-flex justify-content-end">
          <button type="button" class="btn btn-outline-danger me-2" onClick={onClose}>No</button>
          <button type="button" class="btn btn-danger" onClick={onConfirm}>Yes</button>
        </div>
      </Alert>
    </>
  );
};

export function EditWindow({ isOpen, onClose, onConfirm }) {

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Alert variant="warning">
        <Alert.Heading>Do you wish to exit?</Alert.Heading>
        <p>
          All unsaved changes will be lost.
        </p>
        <hr />

        <div className="d-flex justify-content-end">
          <button type="button" class="btn btn-outline-danger me-2" onClick={onClose}>No</button>
          <button type="button" class="btn btn-danger" onClick={onConfirm}>Yes</button>
        </div>
      </Alert>
    </>
  );
};