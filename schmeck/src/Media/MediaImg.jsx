import React, { Component } from "react";
import "./Media.css";

class MediaImg extends Component {
  state = {rot:Math.random() * 8 - 4, hover:false
  };

  togelHover = () => {
    this.setState({hover:!this.state.hover})
  }

  render() {
    var thumbnail;
    if (this.props.media.type === "video") {
      thumbnail = this.props.media.thumbnail;
    } else {
      thumbnail = `/${this.props.media.thumbnail}`;
    }
    let newRot = this.state.rot;
    if (this.state.hover) {
      newRot = 0;
    }

    return (
      <div
        className= {'media-img typewriter_font ' + this.props.deleteClass}
        onMouseEnter={this.togelHover}
        onMouseLeave={this.togelHover}
        onClick={() => this.props.onClickHandeler(this.props.index)}
        style={{ transform: `rotate(${newRot}deg)` }}>
        {this.props.media.type === "video" ? (
          <svg
            className='the-media'
            width='100%'
            height='100%'
            viewBox='0 0 472 472'
            style={{
              fillRule: "evenodd",
              clipRule: "evenodd",
              strokeLinejoin: "round",
              strokeMiterlimit: "1.41421"
            }}>
            <g transform='matrix(1,0,0,1,-199,-50)'>
              <g
                id='Artboard9'
                transform='matrix(0.547564,0,0,0.547564,109.2,50)'>
                <rect
                  x='164'
                  y='0'
                  width='862'
                  height='862'
                  style={{ fill: "none" }}
                />
                <g transform='matrix(0.957907,0,0,1.04697,49.4719,-20.2428)'>
                  <path
                    d='M218,94.635L205,94.635L205,77.869L934,77.869L934,94.635L921,94.635C913.825,94.636 908,100.461 908,107.635L908,141.972C908,149.147 913.825,154.972 921,154.972L934,154.972L934,707.028L921,707.028C913.825,707.028 908,712.853 908,720.028L908,754.365C908,761.539 913.825,767.365 921,767.365L934,767.365L934,784.131L205,784.131L205,767.365L218,767.365C225.175,767.365 231,761.539 231,754.365L231,720.028C231,712.853 225.175,707.028 218,707.028L205,707.028L205,154.972L218,154.972C225.175,154.972 231,149.147 231,141.972L231,107.635C231,100.461 225.175,94.636 218,94.635ZM843,707.028L817,707.028C809.825,707.028 804,712.853 804,720.028L804,754.365C804,761.539 809.825,767.365 817,767.365L843,767.365C850.175,767.365 856,761.539 856,754.365L856,720.028C856,712.853 850.175,707.028 843,707.028ZM738,707.028L712,707.028C704.825,707.028 699,712.853 699,720.028L699,754.365C699,761.539 704.825,767.365 712,767.365L738,767.365C745.175,767.365 751,761.539 751,754.365L751,720.028C751,712.853 745.175,707.028 738,707.028ZM634,707.028L608,707.028C600.825,707.028 595,712.853 595,720.028L595,754.365C595,761.539 600.825,767.365 608,767.365L634,767.365C641.175,767.365 647,761.539 647,754.365L647,720.028C647,712.853 641.175,707.028 634,707.028ZM530,707.028L504,707.028C496.825,707.028 491,712.853 491,720.028L491,754.365C491,761.539 496.825,767.365 504,767.365L530,767.365C537.175,767.365 543,761.539 543,754.365L543,720.028C543,712.853 537.175,707.028 530,707.028ZM426,707.028L400,707.028C392.825,707.028 387,712.853 387,720.028L387,754.365C387,761.539 392.825,767.365 400,767.365L426,767.365C433.175,767.365 439,761.539 439,754.365L439,720.028C439,712.853 433.175,707.028 426,707.028ZM322,707.028L296,707.028C288.825,707.028 283,712.853 283,720.028L283,754.365C283,761.539 288.825,767.365 296,767.365L322,767.365C329.175,767.365 335,761.539 335,754.365L335,720.028C335,712.853 329.175,707.028 322,707.028ZM843,94.635L817,94.635C809.825,94.636 804,100.461 804,107.635L804,141.972C804,149.147 809.825,154.972 817,154.972L843,154.972C850.175,154.972 856,149.147 856,141.972L856,107.635C856,100.461 850.175,94.636 843,94.635ZM738,94.635L712,94.635C704.825,94.636 699,100.461 699,107.635L699,141.972C699,149.147 704.825,154.972 712,154.972L738,154.972C745.175,154.972 751,149.147 751,141.972L751,107.635C751,100.461 745.175,94.636 738,94.635ZM634,94.635L608,94.635C600.825,94.636 595,100.461 595,107.635L595,141.972C595,149.147 600.825,154.972 608,154.972L634,154.972C641.175,154.972 647,149.147 647,141.972L647,107.635C647,100.461 641.175,94.636 634,94.635ZM530,94.635L504,94.635C496.825,94.636 491,100.461 491,107.635L491,141.972C491,149.147 496.825,154.972 504,154.972L530,154.972C537.175,154.972 543,149.147 543,141.972L543,107.635C543,100.461 537.175,94.636 530,94.635ZM426,94.635L400,94.635C392.825,94.636 387,100.461 387,107.635L387,141.972C387,149.147 392.825,154.972 400,154.972L426,154.972C433.175,154.972 439,149.147 439,141.972L439,107.635C439,100.461 433.175,94.636 426,94.635ZM322,94.635L296,94.635C288.825,94.636 283,100.461 283,107.635L283,141.972C283,149.147 288.825,154.972 296,154.972L322,154.972C329.175,154.972 335,149.147 335,141.972L335,107.635C335,100.461 329.175,94.636 322,94.635Z'
                    style={{ fill: "rgb(20,20,20)" }}
                  />
                </g>
                <g transform='matrix(1.82627,-0,-0,1.82627,164,-0)'>
                  <use
                    xlinkHref={`#${thumbnail}`}
                    x='75.317'
                    y='92.134'
                    width='319.568px'
                    height='319.568px'
                    transform='matrix(0.998649,0,0,0.998649,0,0)'
                  />
                </g>
                <g transform='matrix(1.01753,0,0,0.904035,-10.4281,75.7667)'>
                  <rect
                    x='308.218'
                    y='732'
                    width='573.565'
                    height='107'
                    style={{ fill: "white" }}
                  />
                </g>
                <g transform='matrix(1.01753,0,0,1.01753,-909.653,30.7795)'>
                  <text
                    x='1475px'
                    y='750px'
                    dominantBaseline="middle" textAnchor="middle"
                    style={{ fontWeight: "700", fontSize: "60px" }}>
                    {this.props.media.event.name}
                  </text>
                </g>
                <g
                  id='play_icon'
                  transform='matrix(2.36845,0,0,2.36845,443.419,279.419)'>
                  <use
                    xlinkHref='#_Image_play'
                    x='0'
                    y='0'
                    width='128px'
                    height='128px'
                  />
                </g>
              </g>
            </g>
            <defs>
              <image
                id={thumbnail}
                width='322px'
                height='289px'
                preserveAspectRatio='xMidYMid slice'
                xlinkHref={thumbnail}
              />
              <image
                id='_Image_play'
                width='128px'
                height='128px'
                xlinkHref='/static/images/play_icon.png'
              />
            </defs>
          </svg>
        ) : (
          <svg
            className= {this.props.deleteClass +'the-media typewriter_font'}
            width='100%'
            height='100%'
            viewBox='0 0 472 472'
            style={{
              fillRule: "evenodd",
              clipRule: "evenodd",
              strokeLinejoin: "round",
              strokeMiterlimit: "1.41421"
            }}>
            <g transform='matrix(1,0,0,1,-691.75,-49.1373)'>
              <g
                id='Artboard8'
                transform='matrix(0.547564,0,0,0.547564,110.785,220.525)'>
                <rect
                  x='1061'
                  y='-313'
                  width='862'
                  height='862'
                  style={{ fill: "none" }}
                />
                <g transform='matrix(0.909453,3.2608e-17,2.25513e-17,1.0937,1033.64,-452.457)'>
                  <rect
                    x='139'
                    y='205'
                    width='730'
                    height='686.732'
                    style={{ fill: "white" }}
                  />
                </g>
                <g transform='matrix(1.82627,-0,-0,1.82627,1061,-313)'>
                  <use
                    xlinkHref={`#${thumbnail}`}
                    x='68.143'
                    y='57.466'
                    width='335.797px'
                    height='335.797px'
                    transform='matrix(0.999395,0,0,0.999395,0,0)'
                  />
                </g>
                <g transform='matrix(1.06345,0,0,1.06345,-80.5655,-316.91)'>
                  <text
                    x='1475px'
                    y='740px'
                   dominantBaseline="middle" textAnchor="middle"
                    style={{ fontWeight: "700", fontSize: "60px" }}>
                    {this.props.media.event.name}
                  </text>
                </g>
              </g>
            </g>
            <defs>
              <image
                id={thumbnail}
                width='336px'
                height='336px'
                preserveAspectRatio='xMidYMid slice'
                xlinkHref={thumbnail}
              />
            </defs>
          </svg>
        )}
      </div>
    );
  }
}

export default MediaImg;
