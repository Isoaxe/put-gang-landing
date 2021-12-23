import Nav from './../components/Nav';
import Hero from './../components/Hero';
import Membership from './../components/Membership';
import './css/App.css';


function App() {
  return (
    <div className="wrapper">
      <div className="inner">
        <Nav />
      </div>
      <Hero />
      <div className="inner">
        <Membership />
      </div>
    </div>
  );
}

export default App;
