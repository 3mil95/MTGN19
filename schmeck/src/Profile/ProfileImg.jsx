import React from 'react';
import "./Profile.css";


const ProfileImg = (props) => {
    //console.log(props.image)
    /*<svg width="100%" height="100%" viewBox="0 0 1900 1643" style={{fillRule:'evenodd',clipRule:'evenodd',strokeLinejoin:'round',strokeMiterlimit:'1.41421'}}>
    <g transform="matrix(1,0,0,1,-7833,-3515)">
        <g id="Artboard777" transform="matrix(1,0,0,1,2132,-4.54747e-13)">
            <rect x="5701" y="3515" width="1900" height="1643" style={{fill:'none'}}/>
            <g transform="matrix(1.63377,5.85783e-17,4.05119e-17,1.96476,5827.58,3259.09)">
                <rect x="139" y="205" width="730" height="686.732" style={{fill:'white',stroke:'rgb(64,64,64)',strokeWidth:'3.14px'}}/>
            </g>
            <g transform="matrix(3.67225,-5.45312e-17,5.45312e-17,3.67225,6100.16,3698.04)">
                <use xlinkHref={`#${props.user}`} x="0" y="0" width="300px" height="300px" />
                <rect x="0" y="0" width="300" height="300" style={{fill:'none',stroke: 'black', strokeWidth:'0.5px'}}/>
            </g>
        </g>
    </g>
    <defs>
        <image id={props.user} width="300px" height="300px" xlinkHref={props.image} ></image>
    </defs>
    </svg>*/

    return (
       
            <img id={props.user} width="100%" src={props.image} className="prof_img" />
    );
}

export default ProfileImg;