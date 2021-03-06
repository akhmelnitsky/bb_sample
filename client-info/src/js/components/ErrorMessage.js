import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';

export default class ErrorMessage extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Alert bsStyle="danger">
                {this.props.message}
            </Alert>
        );
    }
}
