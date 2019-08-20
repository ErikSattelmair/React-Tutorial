import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      stepMovedBackTo: -1,
      ascending: true
    };
  }

  getPositionOfChosenSqaure(current, beforeCurrent) {
    for(let i=0; i<current.length; i++) {
        if(current[i] !== beforeCurrent[i]) {
            return i;
        }
    }

    return 0;
  }

  handleSorting() {
    this.setState({ascending: !this.state.ascending});
  }

  render() {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);

      const moves = history.map((step, move) => {
          const label = move ? 'Go to move #' + move : 'Go to game start';
          let row;
          let col;

           if(move) {
                const indexOfNewSquare = this.getPositionOfChosenSqaure(step.squares, history[move - 1].squares);
                row = Math.floor((indexOfNewSquare / 3)) + 1
                col = Math.floor((indexOfNewSquare % 3)) + 1
           }

           const coordinates = move ? ' - [' + row + ':' + col + ']' : '';

            const styles = {
                container: {
                    fontWeight: this.state.stepMovedBackTo === move ? 'bold' : 'normal'
                }
            };

          return (
            <li key={move}>
              <button key={move} style={styles.container} onClick={() => this.jumpTo(move)}>{label}{coordinates}</button>
            </li>
          );
        }
      );

      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        this.state.stepNumber > 8 ? status = 'Draw' : status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />

          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            <button onClick={() => this.handleSorting()}>{this.state.ascending ? 'Descending' : 'Ascending'}</button>
          </div>
        </div>
      );
    }

    jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
          stepMovedBackTo: step
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
          return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares,
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });
      }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

  function calculateWinner(squares) {
       const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
       }


/*i=0;
s='0'

if(i == 0) => true
if(s == 0) => true

if(i !== 0) => false
if(s !== 0) => true

dev=0
if(dev) ==> false
if(!dev) ==> true*/