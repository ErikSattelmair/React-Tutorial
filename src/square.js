import React from 'react';

const Square = (props) => {
    return <button style={props.styles.container} className="square" onClick={props.onClick}>
      {props.value}
    </button>
}

export default Square;