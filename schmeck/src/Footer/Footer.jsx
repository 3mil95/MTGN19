import React, { Component } from "react";
import './Footer.css'

class Footer extends Component {
  state = { RR: false};
  //Saknas Unionen och SVT 
  //Ericsson och sveriges ingenjörer är loggor från förra året!
  sponsors = [{url:"https://www.sverigesingenjorer.se/bli-medlem/?gclid=Cj0KCQjwjrvpBRC0ARIsAFrFuV8CwV8BuTUayh6t0L4EoZ2WLZT7SBK7QdFQyPmCdmAEkbO6JYQhLg8aAhK1EALw_wcB", img:"/static/images/sverigesingenjörer.png"},
  {url:"https://www.academicwork.se/", img:"/static/images/Academic Work.PNG"},
  {url:"https://studybuddy.se/", img:"/static/images/Studybuddy.png"},
  {url:"https://mpyadigital.com/", img:"/static/images/mpya_digital.png"},
  {url:"https://www.ericsson.com/en", img:"/static/images/ericsson.png"},
  {url:"https://www.unionen.se/bli-medlem", img:"/static/images/unionen_logo.png"}]


  


  
  RR = () => {
    return <iframe title="RR" style={{position: 'fixed', top: '0px', left:'0px', width:'100%', height: '100%', zIndex: 100}}  className="youtube-player" id="player" src="https://www.youtube.com/embed/oHg5SJYRHA0?autoplay=1" allow='autoplay' frameBorder="0">&lt;br /&gt;</iframe>
  }

  RRHandeler = () => {
    this.setState({ RR: true})
  }


  render() {
    return (
      <div className='footer'>
        {this.state.RR ? this.RR() : null}

        {this.sponsors.map((sponsor, i) => (
          <a key={i} className='footer-linck' href={sponsor.url}><img src={sponsor.img} height="40px" alt="sponsor"/></a>
        ))}
       <button style={{border: 'none', background: 'none'}} onClick={this.RRHandeler}><img src='/static/images/RR.png' height="40px" alt="sponsor"/></button>
    </div>
    
    );
  }
}

export default Footer;