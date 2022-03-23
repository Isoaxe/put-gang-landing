import { useState, useEffect } from "react";
import Modal from "react-modal";
import { TextField, CircularProgress } from "@mui/material";
import PlaidLink from "./PlaidLink";
import { createCustomer, createSubscription } from "./../util/stripe";
import { disableButtonContainer } from "./../util/helpers";
import { STRIPE_WATCH_ID, STRIPE_JOIN_ID } from "./../util/constants";
import { API_URL, CONSOLE_URL } from "./../util/urls";
import "./css/EmailModal.css";
import "./css/shared.css";

function EmailModal(props) {
  const [emailOk, setEmailOk] = useState(false);
  const [achPayments, setAchPayments] = useState(false);
  const [tokensExchanged, setTokensExchanged] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");

  Modal.setAppElement("#root");
  const {
    membershipLevel,
    paymentMethod,
    email,
    stripeUid,
    referrerId,
    isLoading,
    setIsLoading,
  } = props;
  let priceId;
  if (membershipLevel === "watch") priceId = STRIPE_WATCH_ID;
  if (membershipLevel === "join") priceId = STRIPE_JOIN_ID;

  function close() {
    props.setEmailModalVisible(false);
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
    const { client_secret, payment_intent_id } = await createSubscription(
      priceId,
      stripe_uid
    );
    props.setClientSecret(client_secret);
    props.setStripeUid(stripe_uid);
    setPaymentIntentId(payment_intent_id);
    setIsLoading(false);
    if (paymentMethod === "card") {
      props.setEmailModalVisible(false);
      props.setPaymentsModalVisible(true);
    } else if (paymentMethod === "ach") {
      setAchPayments(true);
      props.setEmailModalVisible(false);
    }
  }

  async function saveBankAccount() {
    const fetchConfig = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accountId, stripeUid }),
    };
    const response = await fetch(API_URL + "/plaid/save-bank", fetchConfig);
    const jsonResponse = await response.json();
    setIsLoading(false);
    console.log(jsonResponse);
  }

  async function makeAchPayment() {
    const fetchConfig = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentIntentId }),
    };
    const response = await fetch(API_URL + "/stripe/payment", fetchConfig);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    window.location.href = `${CONSOLE_URL}/session/signup?refId=${referrerId}&membLvl=${membershipLevel}&stripeUid=${stripeUid}&email=${email}`;
  }

  useEffect(() => {
    disableButtonContainer();
    checkEmail();
  });

  useEffect(() => {
    if (tokensExchanged) saveBankAccount();
  }, [tokensExchanged, saveBankAccount]);

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
          setTokensExchanged={setTokensExchanged}
          setAccountId={setAccountId}
          setIsLoading={setIsLoading}
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
