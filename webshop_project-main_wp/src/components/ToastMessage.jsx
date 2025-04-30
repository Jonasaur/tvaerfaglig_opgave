import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

export default function ToastMessage({ show, onClose }) {
  return (
    <ToastContainer position="bottom-end" className="p-3" containerPosition="fixed">
      <Toast
        show={show}
        onClose={onClose}
        delay={3000}
        autohide
        bg="success"
      >
        <Toast.Body className="text-white">
          ✅ Varen blev tilføjet til kurven!
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
