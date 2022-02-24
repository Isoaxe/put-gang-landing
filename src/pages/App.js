import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Nav from './../components/Nav';
import Hero from './../components/Hero';
import Membership from './../components/Membership';
import EmailSignup from './../components/EmailSignup';
import LearnModal from './../components/LearnModal';
import EmailModal from './../components/EmailModal';
import PaymentsModal from './../components/PaymentsModal';
import { STRIPE_PUBLIC_KEY_TEST } from './../util/constants';
import './css/App.css';


const stripePromise = loadStripe(STRIPE_PUBLIC_KEY_TEST);

function App() {
  const [learnModalVisible, setLearnModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [paymentsModalVisible, setPaymentsModalVisible] = useState(false);
  const [learnModalChoice, setLearnModalChoice] = useState("");
  const [referrerId, setReferrerId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [email, setEmail] = useState("");

  const currentUrl = new URL(window.location.href);
  const membLvl = currentUrl.searchParams.get("membLvl"); // Membership level.
  const refId = currentUrl.searchParams.get("refId"); // Referrer ID.

  // Passing the client secret obtained from the server.
  const appearance = {
    theme: 'stripe',
    labels: 'floating'
  }
  const options = { clientSecret, appearance };

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
        setEmailModalVisible={setEmailModalVisible}
      />
      <EmailModal
        learnModalChoice={learnModalChoice}
        emailModalVisible={emailModalVisible}
        setEmailModalVisible={setEmailModalVisible}
        setPaymentsModalVisible={setPaymentsModalVisible}
        setClientSecret={setClientSecret}
        email={email}
        setEmail={setEmail}
      />
      {clientSecret && (
        <Elements stripe={stripePromise} options={options} >
          <PaymentsModal
            paymentsModalVisible={paymentsModalVisible}
            learnModalChoice={learnModalChoice}
            referrerId={referrerId}
          />
        </Elements>
      )}
    </div>
  );
}

export default App;
