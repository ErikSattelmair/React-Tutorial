import React from 'react';
import Square from './square';

class Board extends React.Component {
  renderSquare(i) {
    const styles = {
        container: {
            backgroundColor: this.props.winner && this.props.winner.includes(i) ? '#92a8d1' : ''
      }
    }

    return <Square key={i} styles={styles} value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
  }

  createTable = () => {
    let table = [];

    // Outer loop to create parent
    for (let i = 0; i < 3 ; i++) {
      let children = [];
      //Inner loop to create children
      for (let j = 0; j < 3; j++) {
        children.push(this.renderSquare(i*3 + j));
      }
      //Create the parent and add the children
      table.push(<div key={i} className="board-row">{children}</div>);
    }

    return table;
  }

  render() {
    return (
      <div>
        {this.createTable()}
      </div>
    );
  }
}

export default Board;
