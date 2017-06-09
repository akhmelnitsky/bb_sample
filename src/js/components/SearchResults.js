import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import TooltipOverlay from './TooltipOverlay'
import ClientInfoModal from './ClientInfoModal'


export default class SearchResults extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            selectedClientIdx: -1
        };

        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.handleRowDoubleClicked = this.handleRowDoubleClicked.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDialogOk = this.handleDialogOk.bind(this);
    }

    static dataFormat(cell, row, formatExtraData, rowIdx) {
        const id = '' + formatExtraData + rowIdx;
        return (
            <TooltipOverlay id={id} tooltip={row.description}>
                <span className="tooltip-overlay-text">
                    {cell}
                </span>
            </TooltipOverlay>
        );
    }

    openModal() {
        this.setState({showModal: true})
    }

    handleRowSelection(row, isSelected, e) {
        const alreadySelected = e.target.className != null && e.target.className.indexOf('selected') >= 0,
            selectionChanged = isSelected !== alreadySelected;
        if (selectionChanged) {
            const selectedClientIdx = this.props.searchResults.findIndex((e) => e.id == row.id);
            this.setState({selectedClientIdx: selectedClientIdx});
        }
        return selectionChanged; // disable toggle selection
    }

    handleRowDoubleClicked(row) {
        this.props.onClientSelected(this.state.selectedClientIdx);
    }

    handleDialogClose() {
        this.setState({showModal: false})
    }

    handleDialogOk() {
        this.props.onClientSelected(this.state.selectedClientIdx);
    }

    render() {
        const clients = this.props.searchResults;
        if (clients == null) {
            return null;
        }

        const selectRow = {
            mode: 'radio',
            className: 'selected',
            clickToSelect: true,
            hideSelectColumn: true,
            onSelect: this.handleRowSelection
        };

        const options = {
            noDataText: 'Ничего не найдено',
            onRowDoubleClick: this.handleRowDoubleClicked
        };


        return (
            <div>
                <BootstrapTable data={clients} selectRow={selectRow} striped={true} hover={true} bordered={false}  options={options}
                                containerClass="fixed-table-container">
                    <TableHeaderColumn dataField="id" isKey={true} hidden={true}/>
                    <TableHeaderColumn dataField="fullName" dataAlign='left' editable={false} dataFormat={SearchResults.dataFormat} formatExtraData="1">ФИО</TableHeaderColumn>
                    <TableHeaderColumn dataField="phone" dataAlign='left' editable={false} dataFormat={SearchResults.dataFormat} formatExtraData="2">Телефон</TableHeaderColumn>
                    <TableHeaderColumn dataField="documentType" dataAlign='left' editable={false} dataFormat={SearchResults.dataFormat} formatExtraData="3">Тип ДУЛ</TableHeaderColumn>
                    <TableHeaderColumn dataField="documentNumber" dataAlign='left' editable={false} dataFormat={SearchResults.dataFormat} formatExtraData="4">Номер ДУЛ</TableHeaderColumn>
                    <TableHeaderColumn dataField="birthday" dataAlign='left' editable={false} dataFormat={SearchResults.dataFormat} formatExtraData="5">Дата рождения</TableHeaderColumn>
                </BootstrapTable>

                <br/>

                <Row>
                    <Col sm={2} smOffset={4}>
                        <Button bsStyle="primary" block={true} onClick={(e) => {this.openModal(e)}} disabled = {this.state.selectedClientIdx < 0}>Просмотр</Button>
                    </Col>
                    <Col sm={2}>
                        <Button block={true} onClick={this.props.onCancel}>Отмена</Button>
                    </Col>

                </Row>

                {this.state.selectedClientIdx >= 0 &&
                    <ClientInfoModal show={this.state.showModal} client={this.props.searchResults[this.state.selectedClientIdx]} onClose={this.handleDialogClose} onOk={this.handleDialogOk}/>
                }

            </div>
        );
    }

}