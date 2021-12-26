import Modal from "react-modal";
import './css/LearnModal.css';


function LearnModal(props) {
  Modal.setAppElement("#root");
  const choice = props.learnModalChoice;
  let action, amount;

  if (choice === "watch") {
    action = "Watch";
    amount = "50";
  } else
  if (choice === "join") {
    action = "Join";
    amount = "150";
  }

  function close() {
    props.setLearnModalVisible(false);
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
        <div className="modal-headlines">
          <h2 className="modal-heading">{action} the discussion</h2>
          <h5 className="modal-subheading">by Put Gang</h5>
          <h2 className="modal-heading-price">${amount} / month</h2>
        </div>
        <div className="modal-options-container">
          <div className="modal-option">
            <label for="watch">
              <p className="modal-option-name">Watch the discussion</p>
              <p className="modal-option-price">$50 / month</p>
            </label>
            <input type="radio" name="price-options" id="watch" onClick={() => props.setLearnModalChoice("watch")} />
          </div>
          <div className="modal-option">
            <label for="join">
              <p className="modal-option-name">Join the discussion</p>
              <p className="modal-option-price">$150 / month</p>
            </label>
            <input type="radio" name="price-options" id="join" onClick={() => props.setLearnModalChoice("join")} />
          </div>
        </div>
        <div className="modal-button-container">
          <button onClick="#/">Continue</button>
        </div>
      </div>
    </Modal>
  );
}

export default LearnModal;
