import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';

export default class ProgressPanel extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Panel>
                <div>Подождите...</div>
            </Panel>
        );
    }

}
