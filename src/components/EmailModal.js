import { useState, useEffect } from "react";
import Modal from "react-modal";
import { TextField, CircularProgress } from "@mui/material";
import { createCustomer, createSubscription } from "./../util/stripe";
import { disableButtonContainer } from "./../util/helpers";
import { STRIPE_WATCH_ID, STRIPE_JOIN_ID } from "./../util/constants";
import "./css/EmailModal.css";
import "./css/shared.css";

function EmailModal(props) {
  const [emailOk, setEmailOk] = useState(false);

  Modal.setAppElement("#root");
  const {
    emailModalVisible,
    setEmailModalVisible,
    setPaymentsModalVisible,
    membershipLevel,
    paymentMethod,
    setClientSecret,
    email,
    setEmail,
    setStripeUid,
    isLoading,
    setIsLoading,
  } = props;
  let priceId;
  if (membershipLevel === "watch") priceId = STRIPE_WATCH_ID;
  if (membershipLevel === "join") priceId = STRIPE_JOIN_ID;
  const payType = paymentMethod === "ach" ? "us_bank_account" : "card";

  function close() {
    setEmailModalVisible(false);
  }

  function checkEmail() {
    if (email?.indexOf("@") !== -1) {
      setEmailOk(true);
    } else {
      setEmailOk(false);
    }
  }

  async function continueToPayments() {
    setIsLoading(true);
    const { stripe_uid } = await createCustomer(email);
    const { client_secret } = await createSubscription(
      priceId,
      stripe_uid,
      payType
    );
    setClientSecret(client_secret);
    setStripeUid(stripe_uid);
    setIsLoading(false);
    setEmailModalVisible(false);
    setPaymentsModalVisible(true);
  }

  useEffect(() => {
    disableButtonContainer();
    checkEmail();
  });

  return (
    <Modal
      isOpen={emailModalVisible}
      onRequestClose={close}
      contentLabel="Stripe Email Modal"
      className="content"
      overlayClassName="overlay"
    >
      <div>
        <h3>Enter your email:</h3>
        <TextField
          label="email"
          sx={{ width: "70%" }}
          onChange={(event) => setEmail(event.target.value)}
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
