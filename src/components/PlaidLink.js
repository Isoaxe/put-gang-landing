import React, { useCallback, useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import { API_URL } from "./../util/urls";

function PlaidLink(props) {
  const [token, setToken] = useState("");
  const { achPayments, setAchPayments, setAccountId, setTokensExchanged } =
    props;

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

  const onSuccess = useCallback(
    (publicToken, metadata) => {
      const { account_id } = metadata;
      setAccountId(account_id);

      // Exchange a public token for an access one.
      async function exchangeTokens() {
        const fetchConfig = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            public_token: publicToken,
            account_id,
          }),
        };
        const response = await fetch(
          API_URL + "/plaid/exchange-tokens",
          fetchConfig
        );
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
          setTokensExchanged(true);
        }
      }

      exchangeTokens();
    },
    [setAccountId, setTokensExchanged]
  );

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

  useEffect(() => {
    if (achPayments && ready) {
      open();
      setAchPayments(false);
    }
  }, [achPayments, setAchPayments, ready, open]);

  return <div></div>;
}

export default PlaidLink;
