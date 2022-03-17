import { useState, useEffect } from "react";
import Modal from "react-modal";
import { TextField, CircularProgress } from "@mui/material";
import PlaidLink from "./PlaidLink";
import { createCustomer, createSubscription } from "./../util/stripe";
import { disableButtonContainer } from "./../util/helpers";
import { STRIPE_WATCH_ID, STRIPE_JOIN_ID } from "./../util/constants";
import "./css/EmailModal.css";
import "./css/shared.css";

function EmailModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [emailOk, setEmailOk] = useState(false);
  const [achPayments, setAchPayments] = useState(false);
  const [customerId, setCustomerId] = useState("");

  Modal.setAppElement("#root");
  const { membershipLevel, paymentMethod } = props;
  let priceId;
  if (membershipLevel === "watch") priceId = STRIPE_WATCH_ID;
  if (membershipLevel === "join") priceId = STRIPE_JOIN_ID;

  function close() {
    props.setEmailModalVisible(false);
  }

  function checkEmail() {
    if (props.email?.indexOf("@") !== -1) {
      setEmailOk(true);
    } else {
      setEmailOk(false);
    }
  }

  async function continueToPayments() {
    setIsLoading(true);
    const { stripeUid } = await createCustomer(props.email);
    const { subscriptionId, clientSecret } = await createSubscription(
      priceId,
      stripeUid
    );
    props.setClientSecret(clientSecret);
    props.setStripeUid(stripeUid);
    setCustomerId(stripeUid);
    setIsLoading(false);
    if (paymentMethod === "card") {
      props.setEmailModalVisible(false);
      props.setPaymentsModalVisible(true);
    } else if (paymentMethod === "ach") {
      setAchPayments(true);
      props.setEmailModalVisible(false);
    }
  }

  useEffect(() => {
    disableButtonContainer();
    checkEmail();
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
        <PlaidLink
          achPayments={achPayments}
          setAchPayments={setAchPayments}
          stripeUid={customerId}
        />
        <h3>Enter your email:</h3>
        <TextField
          label="email"
          sx={{ width: "70%" }}
          onChange={(event) => props.setEmail(event.target.value)}
        />
        {isLoading ? (
          <div className="spinner">
            <CircularProgress />
          </div>
        ) : (
          <div className="modal-button-container disabled">
            <button onClick={continueToPayments} disabled={!emailOk}>
              Continue
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default EmailModal;
