/*
 *  Helper functions relating to Stripe.
 */
import { API_URL } from "./urls";


// Create a payment intent for a given membership level that returns a secret.
export async function createPaymentIntent (membLvl) {
  const fetchConfig = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ membLvl }),
  };
  const response = await fetch(`${API_URL}/stripe/payments`, fetchConfig);
  const jsonResponse = await response.json();
  return jsonResponse.clientSecret;
}


// Create a new customer in Stripe. Required for subscription payments.
export async function createCustomer (email) {
  const fetchConfig = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  };
  const response = await fetch(`${API_URL}/stripe/customer`, fetchConfig);
  const stripeUid = await response.json();
  return stripeUid;
}
