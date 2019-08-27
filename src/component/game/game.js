import React from 'react';
import Board from '../board/board';
import LanguageChoice from '../language/language_choice';
import Status from '../status/status';
import MoveHistory from '../move/move_history';
import LanguageChoiceErrorBoundary from '../language/language_error_boundry';
import StatusErrorBoundary from '../move/move_error_boundry';
import MoveErrorBoundary from '../status/status_error_boundry';

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
    };
  }

  render() {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);

      const current = history[this.state.stepNumber];
      const winningLine = this.calculateWinningLine(current.squares);
      const winner = winningLine && current.squares[winningLine[0]];

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
            <StatusErrorBoundary>
                <Status winner={winner}
                    stepNumber= {this.stepNumber}
                    xIsNext = {this.state.xIsNext} />
            </StatusErrorBoundary>
            <MoveErrorBoundary>
                <MoveHistory {...this.state} onClick={(move) => this.jumpTo(move)}/>
            </MoveErrorBoundary>
            <LanguageChoiceErrorBoundary>
                <LanguageChoice />
            </LanguageChoiceErrorBoundary>
          </div>
        </div>
      )
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

        if (this.calculateWinningLine(squares) || squares[i]) {
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