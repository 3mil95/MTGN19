import React from "react";
import './Media.css'

const CheckBox = props => {
  return (
    <button className="checkbox" onClick={() => props.clickHandeler(props.index, props.type)}>
      <svg className="checkbox-box"
        
        viewBox='0 0 160 160'
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          strokeLinejoin: "round",
          strokeMiterlimit: "1.41421"
        }}>
        <g transform='matrix(1,0,0,1,-2262,0)'>
          <g
            id='Artboard7'
            transform='matrix(0.629921,0,0,0.629921,866.724,228.031)'>
            <rect
              x='2215'
              y='-362'
              width='254'
              height='254'
              style={{fill:'none'}}
            />
            <g transform='matrix(1.5875,0,0,1.5875,-1577.54,-1208.14)'>
              <path
                d='M2529,673L2409,673L2409,553L2529,553L2529,673ZM2425,569L2425,657L2513,657L2513,569L2425,569Z'
                style={{fill:'rgb(89,89,89)'}}
              />
            </g>
            <g transform='matrix(1.26472,0,0,1.26472,-842.439,-1262.27)'>
              <path
                d='M2602,741.936C2602,741.936 2538.78,796.077 2504.69,867.103C2496.98,872.767 2487.14,880.214 2481.07,885.103C2467.26,844.653 2452.3,821.403 2444.62,828.074C2472.97,803.459 2477.22,812.414 2491.51,845.686C2515.2,795.78 2579.33,744.891 2597.12,736.936L2602,741.936Z'
                style={((props.check) ? {fill:'rgba(254,0,0,1)'} : {fill:'rgba(43,92,211,0)'})}
              />
            </g>
          </g>
        </g>
      </svg> {props.text}
    </button>
  );
};

export default CheckBox;
