import React from 'react';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import SearchService from  '../services/SearchService'
import OtpService from  '../services/OtpService'

const SearchState = {
    INITIAL: 0,
    IN_PROGRESS: 1,
    FAILED: 2,
    COMPLETE: 3
};

export default class ClientSearchForm extends React.Component {
    constructor() {
        super();

        this.state = {
            isOtpWasSent: false,
            isPhoneNumberValid: false,
            isOtpCodeValid: false,
            searchState: SearchState.INITIAL,
            formData: {}
        };

        this.handleSendOtpCodeClicked = this.handleSendOtpCodeClicked.bind(this);
        this.handleNextClicked = this.handleNextClicked.bind(this);
        this.handleInputChanged = this.handleInputChanged.bind(this);

        this.searchService = new SearchService();
        this.otpService = new OtpService();
    }

    setSearchState(state) {
        this.setState({searchState: state});
    }

    validatePhoneNumber(phone) {
        // TODO: add real validation
        return /\+7\d{10}/.test(phone)
    }

    validateOtpCode(code) {
        // TODO: add real validation
        return /\d{4}/.test(code)
    }

    handleInputChanged(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let formData = this.state.formData;
        formData[name] = value;
        this.setState({formData: formData});

        switch (name) {
            case 'phone': {
                this.setState({isPhoneNumberValid: this.validatePhoneNumber(value)});
                break;
            }

            case 'otp': {
                const isValid = this.validateOtpCode(value);
                this.setState({isOtpCodeValid: isValid});
            }
        }
    }

    handleSendOtpCodeClicked() {
        this.setState({isOtpWasSent: true});
    }

    handleNextClicked(e) {
        e.preventDefault();

        this.props.onStarted();
        this.setSearchState(SearchState.IN_PROGRESS);

        const otpValidation = this.otpService.validate(this.state.formData);
        
        otpValidation.then(() => {
            // search
            const searchResult = this.searchService.search(this.state.formData);
            searchResult.then((data) => {
                this.setSearchState(SearchState.COMPLETE);
                this.props.onComplete(data);
            });
            searchResult.catch((error) => {
                this.setSearchState(SearchState.FAILED);
                this.props.onError({message: "Произошла ошибка"});
            });
        });

        otpValidation.catch(() => {
            this.setSearchState(SearchState.FAILED);
            this.props.onError({message: "Неверное значение OTP"});
        });
    }

    render() {
        return (
            <Form horizontal>
                <Row>
                    <Col md={6}>
                        <FormGroup controlId="last-name">
                            <Col componentClass={ControlLabel} md={4}>Фамилия</Col>
                            <Col md={8}>
                                <FormControl name="last-name" type="text" required value={this.state.formData['last-name']} onChange={this.handleInputChanged}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="first-name">
                            <Col componentClass={ControlLabel} md={4}>Имя</Col>
                            <Col md={8}>
                                <FormControl name="first-name" type="text" required value={this.state.formData['first-name']} onChange={this.handleInputChanged}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="middle-name">
                            <Col componentClass={ControlLabel} md={4}>Отчество</Col>
                            <Col md={8}>
                                <FormControl name="middle-name" type="text" required value={this.state.formData['middle-name']} onChange={this.handleInputChanged}/>
                            </Col>
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup controlId="document-type">
                            <Col componentClass={ControlLabel} md={4}>Тип документа</Col>
                            <Col md={8}>
                                <FormControl name="document-type" componentClass="select" value={this.state.formData['document-type']} onChange={this.handleInputChanged}>
                                    <option value="">Все</option>>
                                    <option value="passportRF">Паспорт</option>
                                </FormControl>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="document-sn">
                            <Col componentClass={ControlLabel} md={4}>Серия</Col>
                            <Col md={3}>
                                <FormControl name="document-sn" type="text" min="4" maxLength="4" value={this.state.formData['document-sn']} onChange={this.handleInputChanged}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="document-number">
                            <Col componentClass={ControlLabel} md={4}>Номер</Col>
                            <Col md={4}>
                                <FormControl name="document-number" type="text" min="6" maxLength="6" value={this.state.formData['document-number']} onChange={this.handleInputChanged}/>
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>

                <br/>

                <Row>
                    <Col md={6}>
                        <Row>
                            <Col componentClass={ControlLabel} md={4} htmlFor="phone">Номер телефона</Col>
                            <Col md={4}>
                                <Col md={12}>
                                    <FormGroup controlId="phone" name="phone">
                                        <FormControl name="phone" type="text" min="12" maxLength="12" required value={this.state.formData['phone']} onChange={this.handleInputChanged}/>
                                    </FormGroup>
                                </Col>
                            </Col>

                            <Col md={4}>
                                <Col md={12}>
                                    <FormGroup controlId="otp">
                                        {!this.state.isOtpWasSent ?
                                            (
                                                <Button className="btn btn-default btn-block inline-button" disabled={!this.state.isPhoneNumberValid} onClick={this.handleSendOtpCodeClicked}>Отправить код</Button>
                                            ) :
                                            (
                                                <FormControl name="otp" type="text" min="4" maxLength="4" required value={this.state.formData['otp']} onChange={this.handleInputChanged}/>
                                            )
                                        }
                                    </FormGroup>
                                </Col>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={2}>
                        { this.state.isOtpWasSent &&
                        <Button bsClass="btn btn-default btn-block">Отправить ещё раз</Button>
                        }
                    </Col>
                </Row>

                <br/>
                <br/>
                { this.state.searchState != SearchState.COMPLETE &&
                <Row>
                    <Col sm={2} smOffset={4}>
                        <Button bsStyle="primary" block={true} disabled={!this.state.isOtpCodeValid || this.state.searchState == SearchState.IN_PROGRESS} onClick={this.handleNextClicked}>Продолжить</Button>
                    </Col>
                    <Col sm={2}>
                        <Button block={true} href="/widgets/binbank-prototype/payment_method.html" >Отмена</Button>
                    </Col>
                </Row>
                }
            </Form>
        );
    }
}
