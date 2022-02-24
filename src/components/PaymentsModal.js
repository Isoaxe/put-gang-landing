import { useState } from "react";
import Modal from "react-modal";
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CONSOLE_URL } from './../util/urls';
import './css/PaymentsModal.css';
import './css/shared.css';


function PaymentsModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  Modal.setAppElement("#root");
  const choice = props.learnModalChoice;
  const stripe = useStripe();
  const elements = useElements();

  function close() {
    // Don't want the modal to accidentally close, so disable.
    return;
  }

  async function handleSubmit (event) {
    event.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${CONSOLE_URL}/session/signup?refId=${props.referrerId}&membLvl=${choice}`,
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }
    setIsLoading(false);
  }

  return (
    <Modal
			isOpen={props.paymentsModalVisible}
			onRequestClose={close}
			contentLabel="Stripe Payments Modal"
			className="content"
			overlayClassName="overlay"
		>
      <form onSubmit={handleSubmit}>
        <h3>Enter card details:</h3>
        <PaymentElement />
        <div className="modal-button-container">
          <button id="submit" disabled={isLoading || !stripe || !elements}>Submit</button>
        </div>
      </form>
    </Modal>
  );
}

export default PaymentsModal;
