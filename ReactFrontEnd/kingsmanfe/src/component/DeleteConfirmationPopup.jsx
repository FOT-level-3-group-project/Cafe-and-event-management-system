import React from 'react';
import './DeleteConfirmationPopup.css';

function DeleteConfirmationPopup({ itemName, onCancel, onConfirm }) {
  return (
    <div className="del shadow">
      <p>Are you sure you want to delete {itemName}?</p>
      <button className="btn btn-danger mx-2" onClick={onConfirm}>Yes</button>
      <button className="btn btn-primary mx-2" onClick={onCancel}>No</button>
    </div>
  );
}

export default DeleteConfirmationPopup;
