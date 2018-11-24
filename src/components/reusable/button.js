require('./style.less');
import React from 'react';

const Button = (props) => {
  return (
    <div className="button" {...props}>
      <div className="button-body">
        {props.children}
      </div>
    </div>
  )
}

export default Button;