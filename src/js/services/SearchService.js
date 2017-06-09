import React from 'react';

const moment = com.rooxteam.momentjs.moment,
    webapi = com.rooxteam.webapi,
    NAMES_MAPPING = {
        'last-name': 'surname',
        'first-name': 'name',
        'phone': 'mobilePhone',
        'middle-name': 'patronymic',
        'document-type': 'type',
        'document-sn': 'series',
        'document-number': 'number'
    };

export default class SearchService {
    search(formData) {
        return new Promise((resolve, reject) => {
            const params = {};

            $.each(NAMES_MAPPING, function (formName, paramName) {
                var val = formData[formName];
                if (val) {
                    params[paramName] = val;
                }
            });

            const request = webapi.ajax({
                'url': webapi.makeUrl('/clients?' + $.param(params)),
                'type': 'GET'
            });

            request.done((response) => {
                if (response && response.data) {
                    try {
                        resolve(this.parseClientsResponse(response.data));
                    } catch (e) {
                        gadgets.error('exception occurred: ' + e);
                        reject({});
                    }
                }
                else {
                    reject({rc: -1});
                }
            });

            request.fail((response) => {
                gadgets.error('Can\'t get clients: code: ' + response.rc);
                reject(response);
            });
        });
    }

    parseClientsResponse(clients) {
        const getPhone = (contractList) => {
            if (contractList && contractList.length > 0) {
                return contractList[0].value;
            }
            return '';
        };

        const getDocument = (documentList) => {
            if (documentList && documentList.length) {
                return documentList[0]
            }
            return null;
        };

        const getDocumentType = (documentList) => {
            const doc = getDocument(documentList);
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

        const getDocumentNumber = (documentList) => {
            const doc = getDocument(documentList);
            if (doc) {
                return [doc.series || '', doc.number || ''].join(' ').trim();
            }
            return '';
        };

        const getDocumentIssueDate = (documentList) => {
            const doc = getDocument(documentList);
            if (doc && doc.issueDate != null) {
                return moment(doc.issueDate).format('DD/MM/YYYY');
            }
            return '';
        };

        const getDocumentIssueOrg = (documentList) => {
            const doc = getDocument(documentList);
            if (doc) {
                return doc.issueOrg || '';
            }
            return '';
        };

        const getTooltipDescription = (fullName, phone, documentType, documentNumber,
                                       documentIssueDate, documentIssueOrg, birthPlace, birthDay) => {
            return (
                <div className="client-info-tooltip-text">
                    ФИО: {fullName} <br/>
                    Номер телефона: {phone} <br/>
                    Тип документа: {documentType} <br/>
                    Серия и номер: {documentNumber} <br/>
                    Дата выдачи: {documentIssueDate} <br/>
                    Выдан: {documentIssueOrg} <br/>
                    Дата рождения: {birthDay} <br/>
                    Место рождения: {birthPlace} <br/>
                </div>
            );
        };

        return clients.map((e, i) => {
            const fullName = [e.name.surname || '', e.name.name || '', e.name.patronymic || ''].join(' ').trim(),
                phone = getPhone(e.contractList),
                documentType = getDocumentType(e.documentList),
                documentNumber = getDocumentNumber(e.documentList),
                documentIssueDate = getDocumentIssueDate(e.documentList),
                documentIssueOrg = getDocumentIssueOrg(e.documentList),
                birthPlace = e.birthPlace || '',
                birthDay = moment(e.birthDate).format('DD/MM/YYYY'),
                description = getTooltipDescription(fullName, phone, documentType, documentNumber,
                    documentIssueDate, documentIssueOrg, birthPlace, birthDay);

            return {
                id: i,
                fullName: fullName,
                phone: phone,
                documentType: documentType,
                documentNumber: documentNumber,
                documentDate: documentIssueDate,
                documentIssuer: documentIssueOrg,
                birthplace: birthPlace,
                birthday: birthDay,
                description: description
            };
        });
    }
}
