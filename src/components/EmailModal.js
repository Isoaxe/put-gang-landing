import { useState, useEffect } from "react";
import Modal from "react-modal";
import { TextField, CircularProgress } from '@mui/material';
import { createCustomer, createSubscription } from './../util/stripe';
import { disableButtonContainer } from './../util/helpers';
import { STRIPE_WATCH_ID, STRIPE_JOIN_ID } from './../util/constants';
import './css/EmailModal.css';
import './css/shared.css';


function EmailModal(props) {
  const [isLoading, setIsLoading] = useState(false);

  Modal.setAppElement("#root");
  const choice = props.learnModalChoice;
  let priceId;
  if (choice === "watch") priceId = STRIPE_WATCH_ID;
  if (choice === "join") priceId = STRIPE_JOIN_ID;

  function close() {
    props.setEmailModalVisible(false);
  }

  async function continueToPayments () {
    setIsLoading(true);
    const { stripeUid } = await createCustomer(props.email);
    const { subscriptionId, clientSecret } = await createSubscription(priceId, stripeUid);
    props.setClientSecret(clientSecret);
    setIsLoading(false);
    props.setEmailModalVisible(false);
    props.setPaymentsModalVisible(true);
  }

  useEffect(() => {
    disableButtonContainer();
  });

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
        {isLoading ?
        <div className="spinner">
          <CircularProgress />
        </div> :
        <div className="modal-button-container disabled">
          <button onClick={continueToPayments} disabled={!props.email}>Continue</button>
        </div>}
      </div>
    </Modal>
  );
}

export default EmailModal;
