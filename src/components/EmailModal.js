import Modal from "react-modal";
import { TextField } from '@mui/material';
import { createPaymentIntent } from './../util/stripe';
import './css/EmailModal.css';
import './css/shared.css';


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
    props.setEmailModalVisible(false);
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
        <h3>Enter your email:</h3>
        <TextField
          label="email"
          sx={{ width: '70%' }}
          onChange={(event) => props.setEmail(event.target.value)}
        />
        <div className="modal-button-container">
          <button onClick={continueToPayments} disabled={!props.email}>Continue</button>
        </div>
      </div>
    </Modal>
  );
}

export default EmailModal;
