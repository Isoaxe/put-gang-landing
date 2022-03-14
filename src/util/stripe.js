/*
 *  Helper functions relating to Stripe.
 */
import { API_URL } from "./urls";

// Create a new customer in Stripe. Required for subscription payments.
export async function createCustomer(email) {
  const fetchConfig = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  };
  const response = await fetch(`${API_URL}/stripe/customer`, fetchConfig);
  const stripeUid = await response.json();
  return stripeUid;
}

// Create a subscription in Stripe.
export async function createSubscription(priceId, customerId) {
  const fetchConfig = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId, customerId }),
  };
  const response = await fetch(`${API_URL}/stripe/subscription`, fetchConfig);
  const jsonResponse = await response.json();
  return jsonResponse;
}
