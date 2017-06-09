var com = com || {};
com.rooxteam = com.rooxteam || {};
com.rooxteam.widgets = com.rooxteam.widgets || {};

(function () {

    var self;
    var moment = com.rooxteam.momentjs.moment;
    var webapi = com.rooxteam.webapi;
    var NAMES_MAPPING = {
        'last-name': 'surname',
        'first-name': 'name',
        'phone': 'mobilePhone',
        'middle-name': 'patronymic',
        'document-type': 'type',
        'document-sn': 'series',
        'document-number': 'number'
    };


    function ClientSearch(moduleId) {
        var self = this;
        var prefs = new gadgets.Prefs(moduleId);
        this.moduleId = moduleId;
        this.widgetId = '#widget' + moduleId;
        if(!prefs.getBool("disableAutoStart")) {
            //
        }

        var nextBtn$ = $('#next'),
            otp$ = $('#otp');
        this.otpController = com.rooxteam.widgets.otpController;
        this.otpController.init($('#send-otp'), $('#send-otp-again'), otp$, $('#phone'), nextBtn$);

        $('#client-info-view').click(function(){
            var table$ = $('#search_client'),
                selected$ = table$.find('.selected');

            if (selected$.length) {
                var data = table$.bootstrapTable('getData', {useCurrentPage: false}),
                    client = data[selected$.data().index];

                $('#client_last-name').val(client['client_last-name']);
                $('#client_phone').val(client['client_phone']);
                $('#client_document-type').val(client['client_document-type']);
                $('#client_document-number').val(client['client_document-number']);
                $('#client_document-date').val(client['client_document-date']);
                $('#client_document-issuer').val(client['client_document-issuer']);
                $('#client_birthday').val(client['client_birthday']);
                $('#client_birthplace').val(client['client_birthplace']);

                $('#client-info').modal()
            }
        });

        var $form = $('#client-form');
        $form.validate();

        nextBtn$.click(function (e) {
            e.preventDefault();
            if (!nextBtn$.hasClass('disabled')) {
                self.hideError();

                if (checkValidation($form)) {
                    // 1. validate otp
                    var otpResult = self.otpController.validateOtp();
                    otpResult.done(function () {
                        // otp ok

                        // search for clients
                        var searchResult = self.searchClients($form);
                        searchResult.done(function () {
                            $('#next-pane').hide();
                        });

                        searchResult.fail(function (data) {
                            self.showError();
                        });
                    });


                    otpResult.fail(function () {
                        var target = otp$.closest('.form-group').addClass('has-error').find('.error-handler');
                        target.empty();
                        $('<label id="otp-error" class="error" for="otp">Неверное значение OTP.</label>').appendTo(target);

                        otp$.focus();
                    });

                }
            }

            return false;
        });

    }

    ClientSearch.prototype = {

        hideError: function () {
            $('#error-alert').hide();
        },

        showError: function (message) {
            $('#error-alert').show();
        },

        search: function (params) {
            var searchResults = $.Deferred();
            var request = webapi.ajax({
                'url': webapi.makeUrl('/clients?' + $.param(params)),
                'type': 'GET'
            });

            request.done(function (response) {
                if (response && response.data) {
                    searchResults.resolve(response.data);
                }
                else {
                    searchResults.reject({rc: -1});
                }
            });

            request.fail(function (response) {
                gadgets.error('Can\'t get clients: code: ' + response.rc);
                searchResults.reject(response);
            });

            return searchResults.promise();
        },

		searchClients: function (form$) {
            var params = {},
                operation = $.Deferred();
            $.each(NAMES_MAPPING, function (formName, paramName) {
                var val = form$.find('input[name="' + formName + '"],select[name="' + formName + '"]').val();
                if (val) {
                    params[paramName] = val;
                }
            });

            var result = this.search(params),
                self = this;

            result.done(function (clients) {
                var data = {};
                try {
                    data = self.parseClientsResponse(clients);
                } catch (e) {
                    gadgets.error('exception occurred: ' + e);
                    operation.reject();
                    return;
                }

                self.drawTable(data);
                self.drawTooltips();

                $('#search-pane').show();
                operation.resolve();
            });

            result.fail(function (data) {
                operation.reject(data);
            });

            return operation.promise();

        },

        parseClientsResponse: function (clients) {
            var getPhone = function (contractList) {
                // TODO: add formatting
                if (contractList && contractList.length > 0) {
                    return contractList[0].value;
                }
                return '';
            };

            var getDocument = function (documentList) {
                if (documentList && documentList.length) {
                    return documentList[0]
                }
                return null;
            };

            var getDocumentType = function (documentList) {
                var doc = getDocument(documentList);
                if (doc) {
                    switch (doc.type) {
                        case '21': return 'Паспорт';
                        default:
                            return doc.type;
                    }
                }
                return '';
            };

            var getDocumentNumber = function (documentList) {
                var doc = getDocument(documentList);
                if (doc) {
                    return [doc.series || '', doc.number || ''].join(' ').trim();
                }
                return '';
            };

            var getDocumentIssueDate = function (documentList) {
                var doc = getDocument(documentList);
                if (doc && doc.issueDate != null) {
                    return moment(doc.issueDate).format('DD/MM/YYYY');
                }
                return '';
            };

            var getDocumentIssueOrg = function (documentList) {
                var doc = getDocument(documentList);
                if (doc) {
                    return doc.issueOrg || '';
                }
                return '';
            };

            var getTooltipDescription = function (fullName, phone, documentType, documentNumber,
                                                  documentIssueDate, documentIssueOrg, birthPlace, birthDay) {
                // TODO: use templates
                var html = "<div style='text-align: left'> ФИО: " + fullName + "<br>" +
                    "Номер телефона: " + phone + "<br>" +
                    "Тип документа: " + documentType + "<br>" +
                    "Серия и номер: " + documentNumber + "<br>" +
                    "Дата выдачи: " + documentIssueDate + "<br>" +
                    "Выдан: " + documentIssueOrg + "<br>" +
                    "Дата рождения: " + birthDay + "<br>" +
                    "Место рождения: " + birthPlace + "<br>" +
                    "</div>";
                return html;
            };

            var data = $.map(clients, function (e) {
                var fullName = [e.name.surname || '', e.name.name || '', e.name.patronymic || ''].join(' ').trim(),
                    phone = getPhone(e.contractList),
                    documentType = getDocumentType(e.documentList),
                    documentNumber = getDocumentNumber(e.documentList),
                    documentIssueDate = getDocumentIssueDate(e.documentList),
                    documentIssueOrg = getDocumentIssueOrg(e.documentList),
                    birthPlace = e.birthPlace || '',
                    birthDay = moment(e.birthDate).format('DD/MM/YYYY'),
                    description = getTooltipDescription(fullName, phone, documentType, documentNumber,
                        documentIssueDate, documentIssueOrg, birthPlace, birthDay );

                return {
                    'client_last-name': fullName,
                    'client_phone': phone,
                    'client_document-type': documentType,
                    'client_document-number': documentNumber,
                    'client_document-date': documentIssueDate,
                    'client_document-issuer': documentIssueOrg,
                    'client_birthplace': birthPlace,
                    'client_birthday': birthDay,
                    '_description': description
                };
            });

            return data;
        },

        drawTable: function (data) {
            var table$ = $('#search_client');
            table$.bootstrapTable({
                data: data,
                rowAttributes: function (row, index) {
                    return { data: row._description };
                },
                rowStyle: function (row, index) {
                    return { classes: 'tooltip-wrap' };
                }
            }).on('load-success.bs.table', function (e, data) {
                console.log('Event: load-success.bs.table');
            }).on('load-error.bs.table', function (status, data) {
                console.log('Event: load-success.bs.table');
            }).on('click-row.bs.table', function (e, row, $element) {
                console.log('Event: click-row.bs.table');
                $(this).bootstrapTable('uncheckAll');
                $(this).bootstrapTable('check', $element.attr('data-index'));
            }).on('dbl-click-row.bs.table', function (e, row, $element) {
                console.log('Event: dbl-click-row.bs.table');
                window.location.href = '/widgets/binbank-prototype/client_payment.html';
            }).on('check.bs.table', function (e, row) {
                console.log('Event: check.bs.table');
                $('#client-info-view').removeClass('disabled');
                // client = row;
            }).on('uncheck.bs.table', function (e, row) {
                console.log('Event: uncheck.bs.table');
                $('#client-info-view').addClass('disabled');
            }).on('check-all.bs.table', function (e) {
                console.log('Event: check-all.bs.table');
            }).on('uncheck-all.bs.table', function (e) {
                console.log('Event: uncheck-all.bs.table');
            });
        },

        drawTooltips: function () {
            $('.tooltip-wrap').each(function () {
                $(this).attr({
                    'data-toggle': 'tooltip',
                    'data-placement': 'top',
                    'data-html': true,
                    'data-content': $(this).attr('data'),
                    'title': $(this).attr('data')
                }).tooltip({
                    container: 'body'
                });
            });
        },



    };
    
    com.rooxteam.widgets.ClientSearch = ClientSearch;

})();


