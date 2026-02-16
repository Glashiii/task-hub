import styles from "./Modal.module.css"

export function Modal({open, onClose, children}) {
    if (!open) return null;

    return (
        <div className={`${styles.modal} ${open ? styles.active : ""}`}  onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}