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
      <div className="learn-more">
        <div className="modal-headlines">
          <h2 className="modal-heading">Watch the discussion</h2>
          <h5 className="modal-subheading">by Put Gang</h5>
          <h2 className="modal-heading-price">$50 / month</h2>
        </div>
        <div className="modal-options">
        </div>
      </div>
    </Modal>
  );
}

export default LearnModal;
