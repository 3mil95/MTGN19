import React from 'react';
import './Profile.css'

const RSAPopup = (props) => {
    return ( 
        <div id='myModal' className='modal'>
            <div className='modal-content rsa'>
            <p>{props.text}</p>
            <button className="yes-btn" onClick={props.btnRSA}>{props.c1}</button>
            {props.c2 !== '' ? <button className="no-btn" onClick={props.btnRSA}>{props.c2}</button>: null}
            </div>
        </div>
    );
}
 
export default RSAPopup;