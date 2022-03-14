import logo from "./../assets/logo.png";
import "./css/EmailSignup.css";

function EmailSignup() {
  return (
    <div className="email-signup">
      <h2 className="learn-header">Wanna learn stock options?</h2>
      <p className="learn-text">
        Get news on what you missed in the private chat, updates on new classes
        in the chat, and see brand new "Put Gang" members who started as
        beginners winning in the stock market.
      </p>
      <div className="email-container">
        <input placeholder="Email" name="email" type="email" id="email" />
        <div className="email-button-container">
          <button type="submit">Put me on the list!</button>
        </div>
      </div>
      <p className="email-text">
        You're signing up to receive emails from Put Gang.
      </p>
      <img src={logo} alt="Logo" />
      <a className="meeting-text" href="/#">
        One-on-one meeting
      </a>
    </div>
  );
}

export default EmailSignup;
