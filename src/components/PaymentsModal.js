import Modal from "react-modal";
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './css/PaymentsModal.css';
import './css/shared.css';


function PaymentsModal(props) {
  Modal.setAppElement("#root");
  const stripe = useStripe();
  const elements = useElements();

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
        <h3>Enter card details:</h3>
        <PaymentElement />
        <div className="modal-button-container">
          <button>Submit</button>
        </div>
      </form>
    </Modal>
  );
}

export default PaymentsModal;
