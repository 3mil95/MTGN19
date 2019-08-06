
import React, { Component } from "react";
import { css } from '@emotion/core';
import { RingLoader} from 'react-spinners';

class Loader extends Component {
    
    render() {
      const override = css`
      display: block;
      margin: 0 auto;
      border-color: goldenrod;
      margin-top: 10%;
  `;
  
      return (
        <div className='sweet-loading'>
        <RingLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color={'goldenrod'}
          loading={true}
        />
      </div> 
      );
    }
  }
  
  export default Loader;