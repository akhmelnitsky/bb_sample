import React from 'react';

import ProgressPanel from './ProgressPanel'
import ErrorMessage from './ErrorMessage'
import ClientInfoPanel from './ClientInfoPanel'

import ClientService from '../services/ClientService'

const WidgetState = {
    LOADING: 0,
    LOADED: 1,
    FAILED: 2
};

export default class Widget extends React.Component {
    constructor() {
        super();
        this.state = {
            widgetState: WidgetState.LOADING,
            client: null
        };
        this.clientService = new ClientService();
    }

    componentDidMount() {
        const mid = 0, // TODO: fix it
            clientId = new gadgets.Prefs(0).getString('client_id');

        console.log(`getting client with id: '${clientId}'`);

        const request = this.clientService.getById(clientId);
        this.setState({widgetState: WidgetState.LOADING});

        request.then((data) => {
            this.setState({client: data, widgetState: WidgetState.LOADED})
        });

        request.catch((err) => {
            this.setState({widgetState: WidgetState.FAILED, error: {message: 'Произошла ошибка'}});
        });
    }

    render() {

        return (
            <div>
                {this.state.widgetState == WidgetState.LOADING &&
                <ProgressPanel/>
                }

                {this.state.widgetState == WidgetState.FAILED &&
                <ErrorMessage message={this.state.error.message}/>
                }

                {this.state.widgetState == WidgetState.LOADED &&
                <ClientInfoPanel client={this.state.client}/>
                }
            </div>
        );
    }
}

