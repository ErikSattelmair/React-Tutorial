import React from 'react';
import { withTranslation } from 'react-i18next';

class Status extends React.Component {

    render() {
        return (
            <div>{this.getGameStatus(this.winner)}</div>
        )
    }

    getGameStatus(winner) {
        let status;
        const isDraw = this.props.stepNumber > 8;

        if (winner) {
            status = this.props.t('Winner') + this.props.winner;
        } else {
            isDraw ? status = this.props.t('Draw') : status = this.props.t('Next_Player') + (this.props.xIsNext ? 'X' : 'O');
        }

        return status;
    }

}

export default withTranslation()(Status);