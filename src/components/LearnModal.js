import Modal from "react-modal";
import './css/LearnModal.css';


function LearnModal(props) {
  Modal.setAppElement("#root");

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
          <h2 className="modal-heading">Watch the discussion</h2>
          <h5 className="modal-subheading">by Put Gang</h5>
          <h2 className="modal-heading-price">$50 / month</h2>
        </div>
        <div className="modal-options-container">
          <div className="modal-option">
            <label for="watch">
              <p className="modal-option-name">Watch the discussion</p>
              <p className="modal-option-price">$50 / month</p>
            </label>
            <input type="radio" name="price-options" id="watch" />
          </div>
          <div className="modal-option">
            <label for="join">
              <p className="modal-option-name">Join the discussion</p>
              <p className="modal-option-price">$150 / month</p>
            </label>
            <input type="radio" name="price-options" id="join" />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default LearnModal;
