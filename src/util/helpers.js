/*
 * Helper functions used by the put-gang-landing frontend.
 */
import { API_URL } from "./urls";

// Request a link token for Plaid access from the server.
export async function getLinkToken() {
  const fetchConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const response = await fetch(
    API_URL + "/plaid/create-link-token",
    fetchConfig
  );
  const jsonResponse = await response.json();
  return jsonResponse;
}

// Add the 'disabled' class to the parent of a disabled button. Remove when not disabled.
export function disableButtonContainer() {
  const container = document.getElementsByClassName(
    "modal-button-container"
  )[0];
  const button = container?.childNodes[0];
  if (container && button) {
    if (button.disabled) {
      container.classList.add("disabled");
    } else if (!button.disabled) {
      container.classList.remove("disabled");
    }
  }
}
