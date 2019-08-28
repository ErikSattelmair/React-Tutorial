import React from 'react';
import Switch from 'react-switch';
import { withTranslation } from 'react-i18next';

class MoveHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          ascending: true,
        };
    }

    render() {
        const history = this.props.history.slice(0, this.props.stepNumber + 1);
        const moves = this.hasHistoryToBeReversed(history) ? this.createMoves(history).reverse() : this.createMoves(history);

        return(
          <React.Fragment>
             <ol>{moves}</ol>
             <Switch id="sorting" onChange={() => this.handleSorting()}
                checked={this.state.ascending}
                uncheckedIcon={false} checkedIcon={false}
                height={14}
                width={28}
                offColor={'#080'}/>
             <label htmlFor={"sorting"}> {!this.state.ascending ? this.props.t('Descending') : this.props.t('Ascending')}</label>
          </React.Fragment>
        )
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
                          <button key={move} style={styles.container} onClick={() => this.props.onClick(move)}>{label}{coordinates}</button>
                        </li>
                      );
                    }
                  );
        }

        getFontWeight(move) {
            return this.props.stepMovedBackTo === move ? 'bold' : 'normal'
        }

        getHistoryEntryLabel(move) {
             return move ? this.props.t('Go_To_Move') + move : this.props.t('Go_To_Start');
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

}

export default withTranslation()(MoveHistory);