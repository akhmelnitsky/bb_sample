import React from 'react';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Modal from 'react-bootstrap/lib/Modal';


export default class ClientInfoModal extends React.Component {
    render () {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Документ клиента</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="full-name">
                            <Col componentClass={ControlLabel} md={4}>ФИО</Col>
                            <Col md={7}>
                                <FormControl type="text" disabled value={this.props.client.fullName}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="phone">
                            <Col componentClass={ControlLabel} md={4}>Номер телефона</Col>
                            <Col md={4}>
                                <FormControl type="text" disabled value={this.props.client.phone}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="document-type">
                            <Col componentClass={ControlLabel} md={4}>Тип документа</Col>
                            <Col md={5}>
                                <FormControl type="text" disabled value={this.props.client.documentType}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="document-number">
                            <Col componentClass={ControlLabel} md={4}>Серия и номер документа</Col>
                            <Col md={5}>
                                <FormControl type="text" disabled value={this.props.client.documentNumber}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="document-date">
                            <Col componentClass={ControlLabel} md={4}>Дата выдачи</Col>
                            <Col md={3}>
                                <FormControl type="text" disabled value={this.props.client.documentDate}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="document-issuer">
                            <Col componentClass={ControlLabel} md={4}>Дата выдачи</Col>
                            <Col md={8}>
                                <FormControl componentClass="textarea" cols="50" rows="3" disabled value={this.props.client.documentIssuer}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="birthday">
                            <Col componentClass={ControlLabel} md={4}>Дата рождения</Col>
                            <Col md={3}>
                                <FormControl type="text" disabled value={this.props.client.birthday}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="birthplace">
                            <Col componentClass={ControlLabel} md={4}>Место рождения</Col>
                            <Col md={6}>
                                <FormControl type="text" disabled value={this.props.client.birthplace}/>
                            </Col>
                        </FormGroup>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onClose}>Закрыть</Button>
                    <Button bsStyle="primary" onClick={this.props.onOk}>Выбрать</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
