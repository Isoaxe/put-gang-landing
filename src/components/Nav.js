import logo from './../assets/logo.png';
import './css/Nav.css';


function Nav() {
  return (
    <div className="nav">
      <img src={logo} alt="Logo" />
      <button onClick='#'>Login</button>
    </div>
  );
}

export default Nav;
