import logo from './../assets/logo.png';
import { CONSOLE_BASE_URL } from './../util/urls';
import './css/Nav.css';


function Nav() {
  return (
    <div className="nav">
      <img src={logo} alt="Logo" />
      <a href={CONSOLE_BASE_URL}>Login</a>
    </div>
  );
}

export default Nav;
