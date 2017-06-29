import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Panel from 'react-bootstrap/lib/Panel';

const moment = com.rooxteam.momentjs.moment;

export default class ClientInfoPanel extends React.Component {
    constructor() {
        super();
    }

    render() {

        const getId = (c) => {
            if (c && c.id) {
                return c.id.id;
            }
            return '';
        };

        const getFullName = (c) => {
            if (c && c.name) {
                return [c.name.surname || '', c.name.name || '', c.name.patronymic || ''].join(' ')
            }
            return '';
        };

        const getDocument = (c) => {
            if (c && c.documentList && c.documentList.length) {
                return c.documentList[0]
            }
            return null;
        };

        const getDocumentType = (c) => {
            const doc = getDocument(c);
            if (doc) {
                switch (doc.type) {
                    case '21':
                        return 'Паспорт';
                    default:
                        return doc.type;
                }
            }
            return '';
        };

        const getDocumentSeries = (c) => {
            const doc = getDocument(c);
            if (doc) {
                return doc.series;
            }
            return '';
        };

        const getDocumentNumber = (c) => {
            const doc = getDocument(c);
            if (doc) {
                return doc.number;
            }
            return '';
        };

        const getDocumentIssueOrgCode = (c) => {
            const doc = getDocument(c);
            if (doc) {
                return doc.issueOrgCode;
            }
            return '';
        };

        const getDocumentIssueDate = (c) => {
            const doc = getDocument(c);
            if (doc && doc.issueDate != null) {
                return moment(doc.issueDate).format('DD/MM/YYYY');
            }
            return '';
        };

        const getDocumentEndDate = (c) => {
            const doc = getDocument(c);
            if (doc && doc.endDate!= null) {
                return moment(doc.endDate).format('DD/MM/YYYY');
            }
            return '';
        };

        const getDocumentIssueOrg = (c) => {
            const doc = getDocument(c);
            if (doc) {
                return doc.issueOrg || '';
            }
            return '';
        };

        const getBirthPlace = (c) => {
            if (c) {
                return c.birthPlace || '';
            }
            return '';
        };

        const getBirthDate = (c) => {
            if (c && c.birthDate != null) {
                return moment(c.birthDate ).format('DD/MM/YYYY');
            }
            return '';
        };
        /*
         "addressList": [
         ...
         {
         "confirmed": null,
         "type": "Fact",
         "prioirtyFlag": null,
         "zipCode": "241012",
         "country": "135",
         "region": "",
         "area": "",
         "city": "БРЯНСК",
         "town": "",
         "street": "22 СЪЕЗДА КПСС",
         "house": "53",
         "block": "",
         "building": "",
         "flat": "79",
         "standaloneHouse": true,
         "cladrCode": ""
         }
         ],

         */

        const getRegistrationAddress = (c) => {
            if (c && c.addressList) {
                const idx = c.addressList.findIndex((e) => e.type == 'Fact');
                if (idx > 0) {
                    const address = c.addressList[idx];
                    let house = address.house || '';
                    if (address.block) house += '-' + address.block;
                    if (address.building) house += '-' + address.building;
                    return (
                        <div>
                            г. {address.city || address.town || ''}<br/>
                            ул. {address.street || ''}<br/>
                            д. {house}<br/>
                            кв. {address.flat || ''}<br/>
                        </div>
                    );
                }
            }
            return '';
        };

        if (this.props.client == null) {
            return null;
        }

        return (
            <Panel className="panel-client">
                <h2 style={{marginTop: 0}}>Клиент</h2>
                <h4 style={{marginTop: 0}}>
                    <span className="label label-success">идентифицирован</span>
                </h4>
                <div className="form-horizontal">
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>ID</Col>
                        <Col sm={8}>
                            <span>{getId(this.props.client)}</span>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>ФИО</Col>
                        <Col sm={8}>
                            <span>{getFullName(this.props.client)}</span>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>Документ</Col>
                        <Col sm={8}>
                            <span>{getDocumentType(this.props.client)}</span>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>Серия</Col>
                        <Col sm={5}>
                            <span>{getDocumentSeries(this.props.client)}</span>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>Номер</Col>
                        <Col sm={5}>
                            <span>{getDocumentNumber(this.props.client)}</span>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>Код
                            подр.</Col>
                        <Col sm={5}>
                            <span>{getDocumentIssueOrgCode(this.props.client)}</span>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>Дата
                            выдачи</Col>
                        <Col sm={6}>
                            <span>{getDocumentIssueDate(this.props.client)}</span>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>Действует
                            до</Col>
                        <Col sm={6}>
                            <span>{getDocumentEndDate(this.props.client)}</span>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>Выдан</Col>
                        <Col sm={8}>
                            <span>{getDocumentIssueOrg(this.props.client)}</span>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>Место
                            рожд.</Col>
                        <Col sm={8}>
                            <span>{getBirthPlace(this.props.client)}</span>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>Дата рожд.</Col>
                        <Col sm={6}>
                            <span>{getBirthDate(this.props.client)}</span>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>Адрес
                            рег.</Col>
                        <Col sm={8}>
                            <span>{getRegistrationAddress(this.props.client)}</span>
                        </Col>
                    </FormGroup>
                </div>
            </Panel>
        );
    }

}
