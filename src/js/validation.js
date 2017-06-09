
function checkValidation($form) {
    // var className = $("form").valid() ? "" : "disabled";
    // $(this).addClass(className);
    var arr = $form.find('input:visible');
    // if (!arr.length) return;
    for (var i = 0; i < arr.length; i++) {
        var it = arr[i];
        if ($(it).attr('required')) {
            if ($(it).inputmask('isComplete')) {
                $(it).parents('.form-group').removeClass('has-error');
            } else {
                $(it).parents('.form-group').addClass('has-error');
            }
        }
    }

    var isValid = $form.valid();
    if (!isValid) {
        $('label.error:visible').each(function(){
            var target = $(this).closest('.form-group').addClass('has-error').find('.error-handler');
            target.empty();
            $(this).appendTo(target);
        });
    }
    return isValid;

}


$(document).ready(function () {

    function createValidation(){
        function beep() {
            var snd = new Audio('data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=');
            snd.play();
        }

        var ERROR_TEXT = {
            'ru_symbols': 'Поле должно содержать только русские буквы',
            'fio': 'Поле должно содержать только русские буквы, точку, запятую или пробел',
            'phone_ru': 'Поле должно содержать только 10 цифр',
            'twenty_digits': 'Поле должно содержать только 20 цифр',
            'two_digits': 'Поле должно содержать только 2 цифры',
            'four_digits': 'Поле должно содержать только 4 цифры',
            'passport_number': 'Поле должно содержать только 6 цифр',
            'inn_number': 'Поле должно содержать только 10 или 12 цифр',
            'pu': 'Поле должно содержать максимум 100 символов',
            'eight_digits': 'Поле должно содержать только 8 цифр',
            'nine_digits': 'Поле должно содержать только 9 цифр',
            'kpp': 'Поле должно содержать только 9 цифр',
            'sum': 'Поле должно содержать только цифры и разделитель',
            'purpose': 'Поле должно содержать максимум 20 символов',
            'order-number': 'Поле должно содержать только цифры',
            'payment-type': 'Поле должно содержать только 2 заглавные русские буквы',
            'date_mask': 'Неверная дата',
            'login': 'Поле должно содержать только латинские символы, минимум 6 и максимум 15',
            'password': 'Поле должно содержать только латинские символы, минимум 6 и максимум 12'
        };

        Inputmask.extendAliases({
            'login': {
                regex: '[a-zA-Z0-9]+',
                placeholder: '',
                maxlength: 15,
                minlength: 6
            },
            'password': {
                regex: '[a-zA-Z0-9]+',
                placeholder: '',
                maxlength: 12,
                minlength: 6
            },
            'ru_symbols': {
                regex: '[а-яА-Я]+',
                placeholder: '',
                cardinality: 1,
                showMaskOnHover: true,
                casing: 'title'
            },
            'fio': {
                regex: '[а-яА-Я,.\\s]+',
                alias: 'Regex',
                placeholder: '',
                cardinality: 1,
                casing: 'title'
            },
            'phone_ru': {
                mask: '+79999999999',
                placeholder: 'Х'
            },
            'ten_digits': {
                mask: '9999999999',
                placeholder: 'Х'
            },
            'twenty_digits': {
                mask: '99999999999999999999',
                placeholder: 'Х'
            },
            'two_digits': {
                mask: '99',
                placeholder: 'Х'
            },
            'four_digits': {
                mask: '9999',
                placeholder: 'Х'
            },
            'passport_number': {
                regex: '[0-9]{6}',
                placeholder: 'Х'
            },
            'inn_number': {
                regex: '([0-9]{10})|([0-9]{12})',
                placeholder: ''
            },
            'pu': {
                maxlength: 100,
                placeholder: ''
            },
            'eight_digits': {
                regex: '[0-9]{8}',
                placeholder: 'Х'
            },
            'nine_digits': {
                regex: '[0-9]{9}',
                placeholder: 'Х'
            },
            'eleven_digits': {
                regex: '[0-9]{11}',
                placeholder: 'Х'
            },
            'kpp': {
                mask: '(9999AA999)|(999999999)',
                placeholder: ''
            },
            'sum': {
                regex: '([0-9]+[.,]{0,1}[0-9]{0,2})',
                placeholder: ''
            },
            'purpose': {
                maxlength: 210,
                minlength: 1,
                placeholder: ''
            },
            'order-number': {
                mask: 'ДС-999',
                placeholder: 'Х'
            },
            'payment-type': {
                regex: '[А-Я]{2}',
                placeholder: 'Р',
                casing: 'upper'
            },
            'date_mask': {
                mask: '99.99.9999',
                clearIncomplete: false,
                placeholder: ' ',
                alias: 'datetime',
                showMaskOnHover: false,
                showMaskOnFocus: false
            }

        });

        Inputmask.extendDefaults({
            onKeyValidation: function (key, result) {
                var thisId = $(this)[0].id;
                if (!result) {
                    beep();
                    $(this).parents('.form-group').addClass('has-error');
                    var text = $(this)[0].inputmask.opts && $(this)[0].inputmask.opts.alias ? ERROR_TEXT[$(this)[0].inputmask.opts.alias] : '';

                    var labelDesc = '<label id=\'' + thisId + '-label\' class=error>';
                    var label = $(labelDesc).text(text);
                    if ($('#' + thisId + '-error')) {
                        $('#' + thisId + '-error').hide();
                    }
                    if (!document.getElementById(thisId + '-label')) {
                        var handler = $($(this)[0]).closest('.form-group').find('.error-handler');
                        handler.empty();
                        handler.append($(label));
                    } else {
                        $(('#' + thisId + '-label')).show();
                    }
                } else {
                    if ($('#' + thisId + '-label')) {
                        $('#' + thisId + '-label').hide();
                    }
                    $(this).parents('.form-group').removeClass('has-error');
                }
            }

        });

        $('#login').inputmask('login');
        $('#password').inputmask('password');
        $('#inn-fl').inputmask('inn_number');
        $('#payment-type').inputmask('payment-type');
        $('#code-doc-number').inputmask('eight_digits');
        $('#code-nal-period').inputmask('four_digits');
        $('#code-np').inputmask('two_digits');
        $('#code-oktmo').inputmask('eleven_digits');
        $('#code-status-rd').inputmask('two_digits');
        $('#code-uin').inputmask('twenty_digits');
        $('#code-kbk').inputmask('twenty_digits');
        $('#order-number').inputmask('order-number');
        $('#fio').inputmask('fio');
        $('#inputEmail3').inputmask('ru_symbols');
        $('#first-name').inputmask('ru_symbols');
        $('#last-name').inputmask('ru_symbols').on('blur', function () {
            var $this = $(this);
            if ($this.inputmask && $this.inputmask('isComplete')) {
                var thisId = $this.attr('id');
                // clear errors
                if ($('#' + thisId + '-label')) {
                    $('#' + thisId + '-label').hide();
                }
                $(this).parents('.form-group').removeClass('has-error');
            }
        });
        $('#middle-name').inputmask('ru_symbols');
        $('#account').inputmask('twenty_digits');
        $('#document-number').inputmask('passport_number');
        $('#phone').inputmask('phone_ru');
        $('#document-sn').inputmask('four_digits');
        $('#otp').inputmask('four_digits');
        $('#inn').inputmask('four_digits');
        $('#inn').inputmask('inn_number');
        $('#pu').inputmask('pu', {
            onBeforePaste: function (pastedValue, opts) {
                var processedValue = pastedValue.replace(/[\«\»\„\“]/, '"');
                return processedValue;
            }
        });
        $('#bik').inputmask('nine_digits');
        $('#kpp').inputmask('kpp');
        $('#account-number').inputmask('twenty_digits');
        $('#account-number-lic').inputmask('ten_digits');
        $('#amount').inputmask('sum', {
            onBeforePaste: function (pastedValue, opts) {
                var processedValue = pastedValue.replace(/[\.]/g, ',');
                return processedValue;
            }
        });
        $('#payment-description').inputmask('purpose');
        $('#order-number').inputmask('order-number');
        $('#doc-date').inputmask('date_mask');
        $('#payment-period').inputmask('date_mask');
    }

    createValidation();

    // Remove error handler after fill or remove value
    $('input, textarea').each(function (i, el) {
        var $el = $(el);
        if ($el.inputmask) {
            $el.on('blur', function () {
                var $this = $(this);
                if ($this.inputmask('isComplete') || !$this.val()) {
                    var thisId = $this.attr('id'),
                        $label = $('#' + thisId + '-label');
                    if ($label.length > 0) {
                        $label.hide();
                    }
                    $this.parents('.form-group').removeClass('has-error');
                }
            })
        }
    });

    // $('.btn-primary').click(function (e) {
    //     // var className = $("form").valid() ? "" : "disabled";
    //     // $(this).addClass(className);
    //     var loc = $(this).attr('data-href');
    //     if (!$('form')[0]) {
    //         if (loc) {
    //             location.href = loc;
    //         }
    //         return;
    //     }
    //     var arr = $('input').is(':visible');
    //     // if (!arr.length) return;
    //     for (var i = 0; i < arr.length; i++) {
    //         var it = arr[i];
    //         if ($(it).attr('required')) {
    //             if ($(it).inputmask('isComplete')) {
    //                 $(it).parents('.form-group').removeClass('has-error');
    //             } else {
    //                 $(it).parents('.form-group').addClass('has-error');
    //             }
    //         }
    //     }
    //     if ($('form').valid() && !$('.has-error')[0]) {
    //         if (loc) {
    //             location.href = loc;
    //             return false;
    //         }
    //     } else {
    //         $('label.error').each(function(){
    //             var target = $(this).closest('.form-group').addClass('has-error').find('.error-handler');
    //             $(this).appendTo(target);
    //         });
    //
    //         e.preventDefault();
    //     }
    // });

});

