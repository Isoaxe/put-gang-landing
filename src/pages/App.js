import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Nav from './../components/Nav';
import Hero from './../components/Hero';
import Membership from './../components/Membership';
import EmailSignup from './../components/EmailSignup';
import LearnModal from './../components/LearnModal';
import PaymentsModal from './../components/PaymentsModal';
import { STRIPE_PUBLIC_KEY_TEST } from './../util/constants';
import './css/App.css';


const stripePromise = loadStripe(STRIPE_PUBLIC_KEY_TEST);

function App() {
  const [learnModalVisible, setLearnModalVisible] = useState(false);
  const [paymentsModalVisible, setPaymentsModalVisible] = useState(false);
  const [learnModalChoice, setLearnModalChoice] = useState("");
  const [referrerId, setReferrerId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const currentUrl = new URL(window.location.href);
  const membLvl = currentUrl.searchParams.get("membLvl"); // Membership level.
  const refId = currentUrl.searchParams.get("refId"); // Referrer ID.

  // Passing the client secret obtained from the server.
  const options = { clientSecret };

  useEffect(() => {
    if (membLvl) setLearnModalChoice(membLvl);
    if (refId) setReferrerId(refId);
  }, [membLvl, refId]);

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
        learnModalVisible={learnModalVisible}
        setLearnModalVisible={setLearnModalVisible}
        learnModalChoice={learnModalChoice}
        setLearnModalChoice={setLearnModalChoice}
        referrerId={referrerId}
        setClientSecret={setClientSecret}
        setPaymentsModalVisible={setPaymentsModalVisible}
      />
      {clientSecret && (
        <Elements stripe={stripePromise} options={options} >
          <PaymentsModal
            paymentsModalVisible={paymentsModalVisible}
          />
        </Elements>
      )}
    </div>
  );
}

export default App;
