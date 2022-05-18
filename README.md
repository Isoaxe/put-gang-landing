# Put Gang Landing

The Put Gang project is broken into two repositories: `put-gang-landing` and `put-gang-console`. The former is just a landing page from which the signup flow is initialized. The customer completes the Stripe payment flow from here via modals. Some data is then passed to `put-gang-console` via params, where the Firebase user is created. This gives access to a dashboard / console where either just `<Settings/>` are displayed (for junior users) or full MLM access (for senior users).


## Landing Page Functionality

The [landing page](https://put-gang-landing.web.app/) that comprises of the `put-gang-landing` repo is a single page application. It contains some text and a video plus several buttons. Three of these are `Learn More` buttons which all initialize the payments flow, albeit with different default selections. The last one is a `Login` button that redirects the user to the signin page of `put-gang-console`. This can be used if the user has already created an account.

### Making Payments

On clicking the `Learn More` button, a modal opens. There are two tabs, one for ACH (bank) payments and another for card payments. Both payment types are executed via Stripe. Each tab has options for selecting one of two membership levels via radio buttons. After the selection has been made, the next page of the modal opens and the user enters their email address and selects `Continue`. This creates a Stripe `customer` and `subscription` for the user associated with that email address. A new modal page opens where the user can select their bank from a list (in the case of ACH payments) or else enter their card details if paying that way. For ACH payments, a separate Stripe sub-modal opens whereby the user can authorise their bank to link a nominated account with Stripe and set up a direct debit. After clicking the `Join Now` button, the payments flow completes and the user is redirected to `put-gang-console` where they can enter a password and create a Firebase account for access to the admin console.

-----------------------------------------------------------------------------


## Project Setup

In the **put-gang-landing directory**, run the following commands:
