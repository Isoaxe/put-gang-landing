import Modal from "react-modal";
import { PaymentElement } from '@stripe/react-stripe-js';
import './css/PaymentsModal.css';
import './css/shared.css';


function PaymentsModal(props) {
  Modal.setAppElement("#root");

  function close() {
    // Don't want the modal to accidentally close, so disable.
    return;
  }

  return (
    <Modal
			isOpen={props.paymentsModalVisible}
			onRequestClose={close}
			contentLabel="Stripe Payments Modal"
			className="content"
			overlayClassName="overlay"
		>
      <form>
        <PaymentElement />
        <div className="modal-button-container">
          <button>Submit</button>
        </div>
      </form>
    </Modal>
  );
}

export default PaymentsModal;
