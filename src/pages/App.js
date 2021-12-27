import { useState } from 'react';
import Nav from './../components/Nav';
import Hero from './../components/Hero';
import Membership from './../components/Membership';
import EmailSignup from './../components/EmailSignup';
import LearnModal from './../components/LearnModal';
import './css/App.css';


function App() {
  const [learnModalVisible, setLearnModalVisible] = useState(false);
  const [learnModalChoice, setLearnModalChoice] = useState("");

  return (
    <div className="wrapper">
      <div className="inner">
        <Nav />
      </div>
      <Hero
        setLearnModalVisible={setLearnModalVisible}
        setLearnModalChoice={setLearnModalChoice}
      />
      <div className="inner">
        <Membership
          setLearnModalVisible={setLearnModalVisible}
          setLearnModalChoice={setLearnModalChoice}
        />
        <EmailSignup />
      </div>
      <LearnModal
        learnModalVisible={learnModalVisible} setLearnModalVisible={setLearnModalVisible}
        learnModalChoice={learnModalChoice}
        setLearnModalChoice={setLearnModalChoice}
      />
    </div>
  );
}

export default App;
