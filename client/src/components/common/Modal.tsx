import { FC, ReactNode } from 'react';

type Props = {
  title: string;
  onClose: () => void;
  children: ReactNode;
  show: boolean;
  handleClose?: () => void;
  submitButtonText?: string;
};

const Modal: FC<Props> = ({
  title,
  onClose,
  children,
  show,
  handleClose,
  submitButtonText,
}) => {
  return (
    <div className={`modal-wrapper ${show ? 'modal-wrapper-show' : ''}`}>
      <div className={`modal ${!show ? 'modal-hide' : ''}`}>
        <h2>{title}</h2>
        <div className="content">{children}</div>
        <div className="modal-footer">
          {handleClose && (
            <button className="btn auth-btn" onClick={handleClose}>
              Cancel
            </button>
          )}
          <button className="btn auth-btn" onClick={onClose}>
            {submitButtonText ? submitButtonText : 'Ok'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
