import React, { useCallback, useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import { API_URL } from "./../util/urls";

const PlaidLink = () => {
  const [token, setToken] = useState("");

  async function createLinkToken() {
    const fetchConfig = {
      method: "POST",
    };
    const response = await fetch(
      API_URL + "/plaid/create-link-token",
      fetchConfig
    );
    const jsonResponse = await response.json();
    const { link_token } = jsonResponse;
    setToken(link_token);
  }

  const onSuccess = useCallback((publicToken, metadata) => {
    const { account_id } = metadata;

    // Exchange a public token for an access one.
    async function exchangeTokens() {
      const fetchConfig = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_token: publicToken, account_id }),
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
    token,
    onSuccess,
    // onEvent
    // onExit
  });

  // get link_token from your server when component mounts
  useEffect(() => {
    createLinkToken();
  }, []);

  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
};

export default PlaidLink;