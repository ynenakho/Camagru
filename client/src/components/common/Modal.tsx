import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  onClose: () => void;
  children: ReactNode;
  show: boolean;
};

const Modal: FC<Props> = ({ title, onClose, children, show }) => {
  return (
    <div className={`modal-wrapper ${show ? 'modal-wrapper-show' : ''}`}>
      <div className={`modal ${!show ? 'modal-hide' : ''}`}>
        <h2>{title}</h2>
        <div className="content">{children}</div>
        <div className="modal-footer">
          <button className="btn auth-btn" onClick={onClose}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
