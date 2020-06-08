import React, { Component } from "react";

class ProfileButton extends Component {
  state = {};

  render() {
    return (
      <button
        className='profiles-button typewriter-font'
        onClick={() => this.props.clickHandeler(this.props.index ,this.props.userName)}>
        <svg
          width='100%'
          height='100%'
          viewBox='0 0 1000 1000'
          style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: "1.5"
          }}>
          <g transform='matrix(1,0,0,1,-2316,-481.535)'>
            <g id='Artboard1' transform='matrix(1,0,0,1,2316,481.535)'>
              <rect
                x='0'
                y='0'
                width='1000'
                height='1000'
                style={{ fill: "none" }}
              />
              <g transform='matrix(1,0,-5.55112e-17,1,-2316,-481.535)'>
                <rect
                  x='2488'
                  y='667'
                  width='672'
                  height='647'
                  style={{
                    fill: "white",
                    stroke: "hite",
                    strokeWidth: "9.92px"
                  }}
                />
              </g>
              <use
                xlinkHref={`#${this.props.userName}`}
                x='211.79'
                y='211.79'
                width='576.665px'
                height='576.665px'
                transform='matrix(0.99942,0,0,0.99942,0,0)'
              />
              <g transform='matrix(1,0,0,1,-2323,-500.535)'>
                <path
                  d='M2729,603.268L3164.4,603.268C3211.64,603.268 3250,637.262 3250,679.133L3250,1339.67C3250,1381.54 3211.64,1415.54 3164.4,1415.54L2479.6,1415.54C2432.36,1415.54 2394,1381.54 2394,1339.67L2394,679.133C2394,637.262 2432.36,603.268 2479.6,603.268L2480.58,603.268L2541.09,541.535L2668.49,541.535L2729,603.268ZM3110.33,712.23L2533.67,712.23L2533.67,1288.89L3110.33,1288.89L3110.33,712.23Z'
                  style={{ fill: "rgb(203,151,74)" }}
                />
              </g>
              <g transform='matrix(1,0,0,1,-2323,-500.535)'>
                <path
                  d='M2533.67,1105.26L2420.73,1103.21L2429.4,626.286L3231.27,640.863L3222.6,1117.79L3110.33,1115.74L3110.33,712.23L2533.67,712.23L2533.67,1105.26Z'
                  style={{ fill: "white" }}
                />
              </g>
              <g transform='matrix(1,0,0,1,-2323,-508.535)'>
                <clipPath id='_clip2'>
                  <path d='M2981.91,621.332L2943.48,611.037L2883.55,834.712L2897.45,838.436L2894.79,848.345L2949.31,862.953L2953.57,847.064L2963.58,849.747L3027.27,612.072L3079.79,626.147L3002.79,913.508L2871.84,878.418L2871.01,881.5L2818.49,867.425L2895.48,580.064L2929.73,589.24L2937.37,560.751L2994.07,575.944L2981.91,621.332Z' />
                </clipPath>
                <g clipPath='url(#_clip2)'>
                  <path
                    d='M2905.5,712.23L2930.18,620.135C2948.2,561.914 3021.52,584.271 3005.96,640.441L3026.01,645.811L3008.21,712.23L2986.73,712.23L3005.96,640.441L2952.1,626.009L2929,712.23L2905.5,712.23Z'
                    style={{
                      fill: "none",
                      stroke: "rgb(140,140,140)",
                      strokeWidth: "16.59px"
                    }}
                  />
                </g>
              </g>
              <g transform='matrix(1,0,0,1,-2323,-500.535)'>
                <path
                  d='M3174.95,665C3216.37,665.001 3250,698.631 3250,740.054L3250,1340.48C3250,1381.9 3216.37,1415.54 3174.95,1415.54L2469.05,1415.54C2427.63,1415.54 2394,1381.9 2394,1340.48L2394,740.054C2394,698.631 2427.63,665.001 2469.05,665L3174.95,665ZM3110.33,712.23L2533.67,712.23L2533.67,1288.89L3110.33,1288.89L3110.33,712.23Z'
                  style={{ fill: "rgb(203,175,74)" }}
                />
              </g>
              <g transform='matrix(1,0,0,1,-2323,-500.535)'>
                <path
                  d='M3134.14,693.297L2509.86,693.297L2509.86,1399.56L3134.14,1399.56L3134.14,693.297ZM3110.33,1288.89L3110.33,712.23L2533.67,712.23L2533.67,1288.89L3110.33,1288.89Z'
                  style={{ fill: "white" }}
                />
              </g>
              <g transform='matrix(1,0,0,1,-979.033,-34.836)'>
                <text x='1480px' y='885px' dominantBaseline="middle" textAnchor="middle" style={{ fontSize: "60px"}}>
                  {this.props.name}
                </text>
              </g>
              <g transform='matrix(-0.626311,-0.16782,0.16782,-0.626311,883.359,612.444)'>
                <clipPath id='_clip3'>
                  <path d='M476.86,762.741L476.86,286.742L594.071,286.742L594.071,654.688L536.502,654.688L536.502,762.741L476.86,762.741Z' />
                </clipPath>
                <g clipPath='url(#_clip3)'>
                  <path
                    d='M578,636L578,347C578.331,284.832 497.308,281.86 492,347L492,636C491.244,725.886 609.401,729.923 613,636L613,313C613.994,220.589 459.571,220.796 460,313L460,636'
                    style={{
                      fill: "none",
                      stroke: "rgb(140,140,140)",
                      strokeWidth: "25.59px"
                    }}
                  />
                </g>
              </g>
            </g>
          </g>
          <defs>
            <image
              id={this.props.userName}
              width='577px'
              height='577px'
              xlinkHref={this.props.userImg}
            />
          </defs>
        </svg>
      </button>
    );
  }
}

export default ProfileButton;
