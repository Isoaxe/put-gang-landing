import Modal from "react-modal";
import { createPaymentIntent } from './../util/stripe';
import './css/EmailModal.css';


function EmailModal(props) {
  Modal.setAppElement("#root");
  const choice = props.learnModalChoice;

  function close() {
    // Don't want the modal to accidentally close, so disable.
    return;
  }

  async function continueToPayments () {
    const secret = await createPaymentIntent(choice);
    props.setClientSecret(secret);
    props.setLearnModalVisible(false);
    props.setPaymentsModalVisible(true);
  }

  return (
    <Modal
			isOpen={props.emailModalVisible}
			onRequestClose={close}
			contentLabel="Stripe Email Modal"
			className="content"
			overlayClassName="overlay"
		>
      <div>
        <div className="modal-button-container">
          <button onClick={continueToPayments}>Continue</button>
        </div>
      </div>
    </Modal>
  );
}

export default EmailModal;
