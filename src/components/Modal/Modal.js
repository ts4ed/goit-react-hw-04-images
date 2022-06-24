import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ hiddenModal, lgImage, tags }) {
  useEffect(() => {
    const handleKeyDown = el => el.code === 'Escape' && hiddenModal();
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hiddenModal]);

  const handleBackdropClick = el =>
    el.currentTarget === el.target && hiddenModal();
  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img src={lgImage} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
}
