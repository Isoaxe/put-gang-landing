import { useState } from 'react';
import Nav from './../components/Nav';
import Hero from './../components/Hero';
import Membership from './../components/Membership';
import EmailSignup from './../components/EmailSignup';
import LearnModal from './../components/LearnModal';
import './css/App.css';


function App() {
  const [learnModalVisible, setLearnModalVisible] = useState(false);

  return (
    <div className="wrapper">
      <div className="inner">
        <Nav />
      </div>
      <Hero setLearnModalVisible={setLearnModalVisible} />
      <div className="inner">
        <Membership setLearnModalVisible={setLearnModalVisible} />
        <EmailSignup />
      </div>
      <LearnModal
        learnModalVisible={learnModalVisible} setLearnModalVisible={setLearnModalVisible}
      />
    </div>
  );
}

export default App;
