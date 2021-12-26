import vid from './../assets/video-intro.mp4';
import vidImg from './../assets/video-img.jpg';
import './css/Hero.css';


function Hero(props) {

  function openModal() {
    props.setLearnModalVisible(true);
    props.setLearnModalChoice("watch");
  }

  return (
    <div className="hero-background">
      <div className="hero-foreground">
        <div className="hero-left">
          <h1>We teach how to make money even when stocks go down!</h1>
          <h4>Put Gang is a stock options community that shows how easy it is to profit no matter what happens in the market. We make trading simple!</h4>
          <div className="button-container">
            <button onClick={openModal}>Learn More</button>
          </div>
        </div>
        <div className="hero-right">
          <video src={vid} type="video/mp4" poster={vidImg} controls />
        </div>
      </div>
    </div>
  );
}

export default Hero;
