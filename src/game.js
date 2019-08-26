import React from 'react';
import Board from './board';
import Switch from 'react-switch';

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

  render() {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const moves = this.hasHistoryToBeReversed(history) ? this.createMoves(history).reverse() : this.createMoves(history);

      const current = history[this.state.stepNumber];
      const winner = this.calculateWinner(current.squares);
      const status = this.getGameStatus(winner);
      const winningLine = this.calculateWinningLine(current.squares);

      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              winner={winningLine}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            <Switch onChange={() => this.handleSorting()}
                    checked={this.state.ascending}
                    uncheckedIcon={false} checkedIcon={false}
                    height={14}
                    width={28}
                    offColor={'#080'}/> {!this.state.ascending ? 'Descending' : 'Ascending'}
          </div>
        </div>
      );
    }

    hasHistoryToBeReversed(history) {
        const numberOfChosenSquaresAtFirstElement = this.getNumberOfChosenSqaure(history[0].squares);
        const numberOfChosenSquaresAtLastElement = this.getNumberOfChosenSqaure(history[history.length - 1].squares);

        return (this.state.ascending && numberOfChosenSquaresAtLastElement < numberOfChosenSquaresAtFirstElement)
            || (!this.state.ascending && numberOfChosenSquaresAtLastElement > numberOfChosenSquaresAtFirstElement)
    }

    getNumberOfChosenSqaure(squares) {
        let numberOfChosenSquares = 0;

        for(let i=0; i<squares.length; i++) {
            if(squares[i]) {
                numberOfChosenSquares++;
            }
        }

        return numberOfChosenSquares;
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

    getGameStatus(winner) {
        let status;

        if (winner) {
            status = 'Winner: ' + winner;
          } else {
            this.state.stepNumber > 8 ? status = 'Draw' : status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
          }

        return status;
    }

    createMoves(history) {
        return history.map((step, move) => {
                  const label = this.getHistoryEntryLabel(move);
                  const coordinates = this.getCoordinates(move, history);

                  const styles = {
                      container: {
                          fontWeight: this.getFontWeight(move)
                      }
                  };

                  return (
                    <li key={move}>
                      <button key={move} style={styles.container} onClick={() => this.jumpTo(move)}>{label}{coordinates}</button>
                    </li>
                  );
                }
              );
    }

    getFontWeight(move) {
        return this.state.stepMovedBackTo === move ? 'bold' : 'normal'
    }

    getHistoryEntryLabel(move) {
         return move ? 'Go to move #' + move : 'Go to game start';
    }

    getCoordinates(move, history) {
        if(move) {
            const indexOfNewSquare = this.getPositionOfChosenSqaure(history[move].squares, history[move - 1].squares);
            const row = Math.floor((indexOfNewSquare / 3)) + 1
            const col = Math.floor((indexOfNewSquare % 3)) + 1
            return ' - [' + row + ':' + col + ']';
        }

        return '';
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

        if (this.calculateWinner(squares) || squares[i]) {
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

      calculateWinner(squares) {
        for (let i = 0; i < lines.length; i++) {
              const [a, b, c] = lines[i];
              if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
              }
            }

        return null;
    }

    calculateWinningLine(squares) {
      for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              return lines[i];
          }
      }

      return null;
    }
}

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

export default Game;