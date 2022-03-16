import { useState, useEffect, useCallback } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { usePlaidLink } from "react-plaid-link";
import Nav from "./../components/Nav";
import Hero from "./../components/Hero";
import Membership from "./../components/Membership";
import EmailSignup from "./../components/EmailSignup";
import LearnModal from "./../components/LearnModal";
import EmailModal from "./../components/EmailModal";
import PaymentsModal from "./../components/PaymentsModal";
import { STRIPE_PUBLIC_KEY_TEST } from "./../util/constants";
import { API_URL } from "./../util/urls";
import "./css/App.css";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY_TEST);

function App() {
  const [learnModalVisible, setLearnModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [paymentsModalVisible, setPaymentsModalVisible] = useState(false);
  const [learnModalChoice, setLearnModalChoice] = useState("");
  const [referrerId, setReferrerId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [stripeUid, setStripeUid] = useState("");
  const [linkToken, setLinkToken] = useState("");
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

  // Request a link token for Plaid access from the server.
  async function getLinkToken() {
    const fetchConfig = {
      method: "POST",
    };
    const response = await fetch(
      API_URL + "/plaid/create-link-token",
      fetchConfig
    );
    const jsonResponse = await response.json();
    const { link_token } = jsonResponse;
    setLinkToken(link_token);
  }

  const onSuccess = useCallback((publicToken, metadata) => {
    // send public_token to your server
    // https://plaid.com/docs/api/tokens/#token-exchange-flow
    console.log(publicToken, metadata);

    // Exchange a public token for an access one.
    async function exchangeTokens() {
      const fetchConfig = {
        method: "POST",
        body: JSON.stringify(publicToken),
      };
      const response = await fetch(
        API_URL + "/plaid/exchange-tokens",
        fetchConfig
      );
      const jsonResponse = await response.json();
      console.log("Exchange token response:", jsonResponse);
    }

    exchangeTokens();
  }, []);

  const { open, ready } = usePlaidLink({
    linkToken,
    onSuccess,
  });

  useEffect(() => {
    if (membLvl) setLearnModalChoice(membLvl);
    if (refId) setReferrerId(refId);
  }, [membLvl, refId]);

  useEffect(() => {
    getLinkToken();
  }, []);

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
        <button onClick={() => open()} disabled={!ready}>
          Connect a bank account
        </button>
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
        setStripeUid={setStripeUid}
        email={email}
        setEmail={setEmail}
      />
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <PaymentsModal
            paymentsModalVisible={paymentsModalVisible}
            learnModalChoice={learnModalChoice}
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
