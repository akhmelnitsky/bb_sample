import React from 'react';

import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';


export default class TooltipOverlay extends React.Component {
    render() {
        const tooltip = (
            <Tooltip id={this.props.id}>{this.props.tooltip}</Tooltip>
        );

        return (
            <OverlayTrigger
                overlay={tooltip} placement="top"
                delayShow={300} delayHide={150}>
                {this.props.children}
            </OverlayTrigger>
        );
    }
}