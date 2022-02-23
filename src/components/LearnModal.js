import Modal from "react-modal";
import { createPaymentIntent } from './../util/stripe';
import './css/LearnModal.css';
import './css/shared.css';


function LearnModal(props) {
  Modal.setAppElement("#root");
  const choice = props.learnModalChoice;
  let action, amount, watchChecked, joinChecked;

  if (choice === "watch") {
    action = "Watch";
    amount = "50";
    watchChecked = "checked";
    joinChecked = "";
  } else
  if (choice === "join") {
    action = "Join";
    amount = "150";
    joinChecked = "checked";
    watchChecked = "";
  }

  function close() {
    props.setLearnModalVisible(false);
  }

  function continueToEmail () {
    props.setLearnModalVisible(false);
    props.setEmailModalVisible(true);
  }

  return (
    <Modal
			isOpen={props.learnModalVisible}
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
        <div className="modal-options-container">
          <div className="modal-option">
            <label for="watch">
              <p className="modal-option-name">Watch the discussion</p>
              <p className="modal-option-price">$50 / month</p>
            </label>
            <input type="radio" name="price-options" id="watch" onChange={() => props.setLearnModalChoice("watch")} checked={watchChecked} />
          </div>
          <div className="modal-option">
            <label for="join">
              <p className="modal-option-name">Join the discussion</p>
              <p className="modal-option-price">$150 / month</p>
            </label>
            <input type="radio" name="price-options" id="join" onChange={() => props.setLearnModalChoice("join")} checked={joinChecked} />
          </div>
        </div>
        <div className="modal-button-container">
          <button onClick={continueToEmail}>Continue</button>
        </div>
      </div>
    </Modal>
  );
}

export default LearnModal;
