import logo from './../assets/logo.png';
import './css/Nav.css';


function Nav() {
  return (
    <div className="nav">
      <img src={logo} alt="Logo" />
      <a href="https://put-gang-console.web.app">Login</a>
    </div>
  );
}

export default Nav;
