/*
 * Helper functions used by the put-gang-landing frontend.
 */

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
