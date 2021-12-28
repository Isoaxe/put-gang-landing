import join from './../assets/join.jpg';
import watch from './../assets/watch.jpg';
import './css/Membership.css';


function Membership(props) {

  function openModalWithWatch() {
    props.setLearnModalVisible(true);
    props.setLearnModalChoice("watch");
  }

  function openModalWithJoin() {
    props.setLearnModalVisible(true);
    props.setLearnModalChoice("join");
  }

  return (
    <div>
      <h1 className="header">Select Your Membership Level</h1>
      <div className="membership">
        <div className="memb-container memb-left">
          <img src={watch} alt="Watch"/>
          <h2>Watch the Discussion</h2>
          <ul className="discussion-text">
            <li>Access to a three class course teaching the basics of stock options trading.</li>
            <li>Access to view our private discord channel.</li>
            <li>Access to real-time buying ideas.</li>
            <li>Access to previously recorded content.</li>
            <li>View live strategy discussion with experienced traders.</li>
          </ul>
          <p className="discussion-text">Gain view-only access to our private discord channel to see buying ideas, new content, previously recorded stock classes, and live stock discussion in the discord with experienced traders.</p>
          <div className="button-container">
            <button onClick={openModalWithWatch}>Learn More</button>
          </div>
        </div>
        <div className="memb-container memb-right">
          <img src={join} alt="Join"/>
          <h2>Join the Discussion</h2>
          <p className="discussion-text">Everything that comes with "watch" +</p>
          <ul className="discussion-text">
            <li>Special Access to interact our private discord channel.</li>
            <li>Ability to Join the discussion, ask questions and interact with experienced traders.</li>
            <li>Ability to join LIVE stock market training classes.</li>
          </ul>
          <p className="discussion-text">Access to all "watch" perks plus the ability to ask questions and interact with experienced traders.</p>
          <div className="button-container">
            <button onClick={openModalWithJoin}>Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;
