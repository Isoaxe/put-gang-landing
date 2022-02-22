/*
 * Statically set hosted URLs. Set API URL dynamically based on host.
 */


// These are the static hosted urls.
export const LANDING_URL = "https://put-gang-landing.web.app";
export const CONSOLE_BASE_URL = "https://put-gang-console.web.app";


// Set API_URL based on whether locally hosted emulator is running or not.
const localApiUrl = "http://localhost:5001/put-gang/us-central1/api";
const remoteApiUrl = "https://us-central1-put-gang.cloudfunctions.net/api";

export const API_URL = ((window.location.hostname === "localhost") ? localApiUrl : remoteApiUrl);
