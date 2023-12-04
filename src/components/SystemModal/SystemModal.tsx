import { ReactNode, createContext, useCallback, useContext } from 'react';
import styles from './SystemModal.module.css';
import { CloseSVG } from '../../assets/svg';

// Context
interface SystemModalContextProps {
  onClose: () => void;
}

const SystemModalContext = createContext<SystemModalContextProps | null>(null);

const useSystemModal = (): SystemModalContextProps => {
  const context = useContext(SystemModalContext);
  if (!context) {
    throw new Error('SystemModal Context Error');
  }
  return context;
};

// Component
interface SystemModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

function SystemModal({ visible, onClose, children }: SystemModalProps): JSX.Element {
  const value = { onClose };

  return (
    <SystemModalContext.Provider value={value}>
      <div className={[styles.background, visible ? styles.show : ''].join(' ')}>
        <div className={[styles.modal, visible ? styles.showModal : ''].join(' ')}>{children}</div>
      </div>
    </SystemModalContext.Provider>
  );
}

interface HeaderProps {
  title: string;
  isCloseIcon?: boolean;
}

const Header = ({ title, isCloseIcon = true }: HeaderProps): JSX.Element => {
  const { onClose } = useSystemModal();

  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      {isCloseIcon && (
        <CloseSVG title='close-icon' className={styles.closeIcon} width={20} height={20} onClick={onClose} />
      )}
    </div>
  );
};

const Content: React.FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
  return <div className={styles.content}>{children}</div>;
};

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const ConfirmButton = ({ text, onClick }: ButtonProps): JSX.Element => (
  <button className={[styles.button, styles.confirmButton].join(' ')} onClick={onClick}>
    {text}
  </button>
);
const CancelButton = ({ text, onClick }: ButtonProps): JSX.Element => (
  <button className={[styles.button, styles.cancelButton].join(' ')} onClick={onClick}>
    {text}
  </button>
);

interface FooterProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  type?: 'all' | 'cancel' | 'confirm';
  confirmText?: string;
  cancelText?: string;
}

const Footer = ({ type, confirmText = '확인', cancelText = '취소', onConfirm, onCancel }: FooterProps): JSX.Element => {
  const { onClose } = useSystemModal();

  const handleConfirm = useCallback(() => {
    onConfirm && onConfirm();
    onClose();
  }, [onClose, onConfirm]);

  const handleCancel = useCallback(() => {
    onCancel && onCancel();
    onClose();
  }, [onClose, onCancel]);

  const footer = () => {
    switch (type) {
      case 'all':
        return (
          <>
            <ConfirmButton text={confirmText} onClick={handleConfirm} />
            <CancelButton text={cancelText} onClick={handleCancel} />
          </>
        );

      case 'confirm':
        return <ConfirmButton text={confirmText} onClick={handleConfirm} />;

      case 'cancel':
        return <CancelButton text={cancelText} onClick={handleCancel} />;

      default:
        return (
          <>
            <ConfirmButton text={confirmText} onClick={handleConfirm} />
            <CancelButton text={cancelText} onClick={handleCancel} />
          </>
        );
    }
  };

  return <div className={styles.footer}>{footer()}</div>;
};

SystemModal.Header = Header;
SystemModal.Content = Content;
SystemModal.Footer = Footer;

export default SystemModal;
