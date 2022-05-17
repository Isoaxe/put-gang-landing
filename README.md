# Put Gang Landing

The Put Gang project is broken into two repositories: `put-gang-landing` and `put-gang-console`. The former is just a landing page from which the signup flow is initialized. The customer completes the Stripe payment flow from here via modals. Some data is then passed to `put-gang-console` via params, where the Firebase user is created. This gives access to a dashboard / console where either just `<Settings/>` are displayed (for junior users) or full MLM access (for senior users).


## Landing Page Functionality

The [landing page](https://put-gang-landing.web.app/) that comprises of the `put-gang-landing` repo is a single page application. It contains some text and a video plus several buttons. Three of these are `Learn More` buttons which all initialize the payments flow, albeit with different default selections. The last one is a `Login` button that redirects the user to the signin page of `put-gang-console`. This can be used if the user has already created an account.
