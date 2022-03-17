import Modal from "react-modal";
import "./css/ChoiceModal.css";
import "./css/shared.css";

function LearnModal(props) {
  Modal.setAppElement("#root");
  const choice = props.membershipLevel;
  let action, amount, watchChecked, joinChecked;

  if (choice === "watch") {
    action = "Watch";
    amount = "50";
    watchChecked = "checked";
    joinChecked = "";
  } else if (choice === "join") {
    action = "Join";
    amount = "150";
    joinChecked = "checked";
    watchChecked = "";
  }

  function close() {
    props.setChoiceModalVisible(false);
  }

  function continueToEmail() {
    props.setChoiceModalVisible(false);
    props.setEmailModalVisible(true);
  }

  return (
    <Modal
      isOpen={props.choiceModalVisible}
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
        <h4 className="modal-payment-options">
          Pay by <span>card</span>
        </h4>
        <div className="modal-options-container">
          <div className="modal-option">
            <label for="watch">
              <p className="modal-option-name">Watch the discussion</p>
              <p className="modal-option-price">$50 / month</p>
            </label>
            <input
              type="radio"
              name="price-options"
              id="watch"
              onChange={() => {
                props.setMembershipLevel("watch");
                props.setPaymentMethod("card");
              }}
              checked={watchChecked}
            />
          </div>
          <div className="modal-option">
            <label for="join">
              <p className="modal-option-name">Join the discussion</p>
              <p className="modal-option-price">$150 / month</p>
            </label>
            <input
              type="radio"
              name="price-options"
              id="join"
              onChange={() => {
                props.setMembershipLevel("join");
                props.setPaymentMethod("card");
              }}
              checked={joinChecked}
            />
          </div>
        </div>
        <h4 className="modal-payment-options">
          Or pay by <span>bank transfer</span>
        </h4>
        <div className="modal-button-container">
          <button onClick={continueToEmail}>Continue</button>
        </div>
      </div>
    </Modal>
  );
}

export default LearnModal;
