import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Nav from "./../components/Nav";
import Hero from "./../components/Hero";
import Membership from "./../components/Membership";
import EmailSignup from "./../components/EmailSignup";
import ChoiceModal from "./../components/ChoiceModal";
import EmailModal from "./../components/EmailModal";
import PaymentsModal from "./../components/PaymentsModal";
import PlaidLink from "./../components/PlaidLink";
import { STRIPE_PUBLIC_KEY_TEST } from "./../util/constants";
import "./css/App.css";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY_TEST);

function App() {
  const [choiceModalVisible, setChoiceModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [paymentsModalVisible, setPaymentsModalVisible] = useState(false);
  const [membershipLevel, setMembershipLevel] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [referrerId, setReferrerId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [stripeUid, setStripeUid] = useState("");
  const [email, setEmail] = useState("");

  const currentUrl = new URL(window.location.href);
  const membLvl = currentUrl.searchParams.get("membLvl"); // Membership level.
  const refId = currentUrl.searchParams.get("refId"); // Referrer ID.

  // Passing the client secret obtained from the server.
  const appearance = {
    theme: "stripe",
    labels: "floating",
  };
  const options = { clientSecret, appearance };

  useEffect(() => {
    if (membLvl) setMembershipLevel(membLvl);
    if (refId) setReferrerId(refId);
  }, [membLvl, refId]);

  return (
    <div className="wrapper">
      <div className="inner">
        <Nav />
      </div>
      <Hero
        setChoiceModalVisible={setChoiceModalVisible}
        setMembershipLevel={setMembershipLevel}
      />
      <div className="inner">
        <Membership
          setChoiceModalVisible={setChoiceModalVisible}
          setMembershipLevel={setMembershipLevel}
        />
        <PlaidLink />
        <EmailSignup />
      </div>
      <ChoiceModal
        choiceModalVisible={choiceModalVisible}
        setChoiceModalVisible={setChoiceModalVisible}
        membershipLevel={membershipLevel}
        setMembershipLevel={setMembershipLevel}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        setEmailModalVisible={setEmailModalVisible}
      />
      <EmailModal
        membershipLevel={membershipLevel}
        emailModalVisible={emailModalVisible}
        setEmailModalVisible={setEmailModalVisible}
        setPaymentsModalVisible={setPaymentsModalVisible}
        setClientSecret={setClientSecret}
        setStripeUid={setStripeUid}
        email={email}
        setEmail={setEmail}
      />
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <PaymentsModal
            paymentsModalVisible={paymentsModalVisible}
            membershipLevel={membershipLevel}
            referrerId={referrerId}
            stripeUid={stripeUid}
            email={email}
          />
        </Elements>
      )}
    </div>
  );
}

export default App;
