
import React from 'react';
import styled from 'styled-components';
require('./style.less');

const ButtonDiv = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`

const ButtonBody = styled.div`
    color: ${props => props.theme.color.grey};
    background-color: ${props => props.theme.color.blue};

    border-radius: 1rem;
    padding: 1rem 2rem;
    transition: background-color .2s ease-in-out, 
                box-shadow .2s ease-in-out,
                margin-top .2s ease-in-out;

    :hover{
      background-color: ${props => props.theme.color.green};
      box-shadow: ${props => props.theme.shadow.z2};
      margin-top: -.1rem;
      transition: background-color .1s ease-in-out, 
                  box-shadow .1s ease-in-out,
                  margin-top .1s ease-in;
    }
`

const Button = (props) => {
  return (
    <ButtonDiv className="button" {...props}>
      <ButtonBody>
        {props.children}
      </ButtonBody>
    </ButtonDiv>
  )
}

export default Button;