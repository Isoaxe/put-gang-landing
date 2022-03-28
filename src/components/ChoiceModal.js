import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Tab, Tabs } from "@mui/material";
import { API_URL } from "./../util/urls";
import "./css/ChoiceModal.css";
import "./css/shared.css";

function ChoiceModal(props) {
  const [paymentChoice, setPaymentChoice] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  Modal.setAppElement("#root");
  const {
    choiceModalVisible,
    setChoiceModalVisible,
    membershipLevel,
    setMembershipLevel,
    setPaymentMethod,
    setEmailModalVisible,
  } = props;
  let action, amount;

  if (membershipLevel === "watch") {
    action = "Watch";
    amount = "50";
  } else if (membershipLevel === "join") {
    action = "Join";
    amount = "150";
  }

  function close() {
    setChoiceModalVisible(false);
  }

  function continueToEmail() {
    setChoiceModalVisible(false);
    setEmailModalVisible(true);
  }

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    setPaymentMethod(newValue ? "card" : "ach");
  };

  async function getPaymentConfig() {
    const response = await fetch(API_URL + "/config/all");
    const jsonResponse = await response.json();
    setPaymentChoice(jsonResponse.paymentChoices);
  }

  useEffect(() => {
    getPaymentConfig();
  }, []);

  return (
    <Modal
      isOpen={choiceModalVisible}
      onRequestClose={close}
      contentLabel="Learn More Modal"
      className="content"
      overlayClassName="overlay"
    >
      <div>
        <header className="modal-headlines">
          <h2 className="modal-heading">{action} the discussion</h2>
          <h5 className="modal-subheading">by Put Gang</h5>
          <h2 className="modal-heading-price">${amount} / month</h2>
        </header>
        {paymentChoice && (
          <Tabs value={tabValue} onChange={handleChange} variant="fullWidth">
            <Tab label="Join with Plaid" id="ach" />
            <Tab label="Join with Card" id="card" />
          </Tabs>
        )}
        <div className="modal-options-container">
          <div className="modal-option">
            <label for="watch-ach">
              <p className="modal-option-name">Watch the discussion</p>
              <p className="modal-option-price">$50 / month</p>
            </label>
            <input
              type="radio"
              name="price-options"
              id="watch-ach"
              onChange={() => setMembershipLevel("watch")}
              checked={membershipLevel === "watch"}
            />
          </div>
          <div className="modal-option">
            <label for="join-ach">
              <p className="modal-option-name">Join the discussion</p>
              <p className="modal-option-price">$150 / month</p>
            </label>
            <input
              type="radio"
              name="price-options"
              id="join-ach"
              onChange={() => setMembershipLevel("join")}
              checked={membershipLevel === "join"}
            />
          </div>
        </div>
        <div className="modal-button-container">
          <button onClick={continueToEmail}>Continue</button>
        </div>
      </div>
    </Modal>
  );
}

export default ChoiceModal;
