import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';

import ClientSearchForm from './ClientSearchForm'
import SearchResults from './SearchResults'
import ErrorMessage from './ErrorMessage'


export default class Widget extends React.Component {
    constructor() {
        super();

        this.state = this.getInitialState();

        this.handleSearchStarted = this.handleSearchStarted.bind(this);
        this.handleSearchComplete = this.handleSearchComplete.bind(this);
        this.handleSearchError = this.handleSearchError.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleClientSelected= this.handleClientSelected.bind(this);

    }

    handleSearchStarted() {
        this.setState({searchResults: null, searchError: null});
    }

    handleSearchComplete(data) {
        this.setState({searchResults: data});
    }

    handleSearchError(error) {
        this.setState({searchError: error});
    }

    handleClientSelected(clientIdx) {
        window.location.href ="/widgets/binbank-prototype/client_payment.html";
    }

    getInitialState() {
        return {
            searchResults: null,
            searchError: null,
            searchForm: () => <ClientSearchForm onComplete={this.handleSearchComplete}
                                                onError={this.handleSearchError}
                                                onStarted={this.handleSearchStarted}/>
        }
    }

    handleCancel() {
        this.setState(this.getInitialState());
    }

    render() {
        const SearchForm = this.state.searchForm;

        return (
            <Grid bsClass="container client-identification">
                <div className="header">
                    <h1>Платеж со счета / данные клиента</h1>
                </div>

                <SearchForm/>

                <hr/>

                { this.state.searchResults &&
                    <SearchResults searchResults={this.state.searchResults}
                                   onCancel={this.handleCancel}
                                   onClientSelected={this.handleClientSelected}/>
                }
                { this.state.searchError &&
                    <ErrorMessage message={this.state.searchError.message}/>
                }

            </Grid>
        );
    }
}
