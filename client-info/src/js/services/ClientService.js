import React from 'react';

const CLIENT_RESPONSE = {
    "id": {
        "objectType": {
            "value": "CLIENT"
        },
        "system": "siebel",
        "id": "1-2PDHH3"
    },
    "name": {
        "fullName": null,
        "name": "СВЕТЛАНА",
        "surname": "САВИЦКАЯ",
        "patronymic": "ЕВГЕНЬЕВНА"
    },
    "isConfirmed": null,
    "isIdentified": true,
    "sex": "2",
    "birthDate": -675302400000,
    "birthPlace": "Г.БРЯНСК",
    "citizenship": "",
    "nonresident": true,
    "codeWord": null,
    "consentProcessData": null,
    "rejectDelivery": null,
    "alternativeName": null,
    "ownerFullName": null,
    "documentList": [
        {
            "confirmed": null,
            "type": "21",
            "series": "3213",
            "number": "379580",
            "issueDate": 1129075200000,
            "issueOrg": "Отдел загса Бежицкого района г. Брянска управления записи актов гражданского состояния Брянской области",
            "issueOrgCode": "",
            "endDate": null
        }
    ],
    "addressList": [
        {
            "confirmed": null,
            "type": "Work",
            "prioirtyFlag": null,
            "zipCode": "241012",
            "country": "135",
            "region": "",
            "area": "",
            "city": "БРЯНСК",
            "town": "",
            "street": "ОРЛОВСКАЯ",
            "house": "26А",
            "block": "",
            "building": "",
            "flat": "",
            "standaloneHouse": true,
            "cladrCode": ""
        },
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
    "contractList": [
        {
            "confirmed": null,
            "type": "",
            "prioirtyFlag": null,
            "value": "+79803349888",
            "method": "5",
            "code": null
        },
        {
            "confirmed": null,
            "type": "3",
            "prioirtyFlag": null,
            "value": "",
            "method": "Home Phone",
            "code": null
        }
    ],
    "maritalStatus": null,
    "education": null,
    "hasForeignPassport": null,
    "hasPropertyInOwnership": null,
    "monthIncome": null,
    "monthCreditPayment": null,
    "monthExpenditure": null,
    "isBankClient": null,
    "hasDeposit": null,
    "dependentsNumber": null,
    "hasCar": null,
    "lastCreditAmount": null,
    "lastCreditKind": null,
    "workStartDate": null,
    "fundsSource": null,
    "notWork": null,
    "notWorkSinceDate": null,
    "socialStatus": null,
    "isBNExclusive": null,
    "customerEmploymentList": null,
    "clientSegmentList": null,
    "idList": [
        {
            "objectType": {
                "value": "CLIENT"
            },
            "system": "siebel",
            "id": "1-2PDHH3"
        }
    ]
};

export default class ClientService { // TODO: make common
    getById(clientId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(CLIENT_RESPONSE);
                // reject({});
            }, 1000);
        });
    }
}
