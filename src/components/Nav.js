import './css/Nav.css';
import logo from './../assets/logo.png';

function Nav() {
  return (
    <div className="Nav">
      <img src={logo} alt="Logo" />
      <button onClick='#'>Login</button>
    </div>
  );
}

export default Nav;
