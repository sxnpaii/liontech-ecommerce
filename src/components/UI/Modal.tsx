import { useContext } from "react";
import sass from "../../assets/styles/components/Modal.module.scss";
import { ProcessesContext } from "../../contexts/ProcessesContext";

const Modal = ({
  Ok,
  Cancel,
  message,
}: {
  Ok?: () => Promise<void>;
  Cancel?: () => Promise<void>;
  message?: string;
}) => {
  const { modal } = useContext(ProcessesContext);
  return (
    <section className={modal.modalState ? sass.ModalOpen : sass.ModalClosed}>
      <div className={sass.Dialog}>
        {/* these static texts will convert to json and use with t() function */}
        <p className={sass.Text}>
          {message ? message : "Ishonchingiz komilmi ?"}
        </p>
        <div className={sass.Confirmation}>
          <a
            className={sass.Cancel}
            onClick={Cancel ? Cancel : () => modal.mutateModal(false)}
          >
            Bekor qilish
          </a>
          <button
            className={sass.Confirm}
            onClick={Ok ? () => Ok() : () => modal.mutateModal(false)}
            type="submit"
          >
            Yaxshi
          </button>
        </div>
      </div>
    </section>
  );
};

export default Modal;
