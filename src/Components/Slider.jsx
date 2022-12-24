import React from 'react';
import { useState } from 'react';


const Slider = (props) => {
  
  
  const {value, onChange} = props;

  return (
    <div>
     <input
       type="range"
       min="0"
       max="20"
       id="range"
       value={value}
       onChange={onChange}
     
     />   
    </div>
  )
}

export default Slider