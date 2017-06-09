
var com = com || {};
com.rooxteam = com.rooxteam || {};
com.rooxteam.widgets = com.rooxteam.widgets || {};
com.rooxteam.widgets.otpController = (function () {
    var sendOtpBtn, sendOtpAgainBtn, otpInput, phoneInput, nextBtn;
    var otpWasSent = false;

    return {
        init: function(sendOtpBtn$, sendOtpAgainBtn$, otpInput$, phoneInput$, nextBtn$) {
            sendOtpBtn = sendOtpBtn$;
            sendOtpAgainBtn = sendOtpAgainBtn$;
            otpInput = otpInput$;
            phoneInput = phoneInput$;
            nextBtn = nextBtn$;

            sendOtpBtn.on('click', function(){
                if (!($(this).hasClass('disabled'))) {
                    $(this).hide();
                    otpInput.show().focus();
                    sendOtpAgainBtn.show();

                    otpWasSent = true;
                    nextBtn.removeClass('disabled');
                }
            });

            phoneInput.on('input keyup mouseup change blur', function(){
                if ($(this).val().indexOf('Х') < 0){
                    sendOtpBtn.removeClass('disabled');
                    sendOtpAgainBtn.removeClass('disabled');
                } else {
                    sendOtpBtn.addClass('disabled');
                    sendOtpAgainBtn.addClass('disabled');
                }
            });

            sendOtpAgainBtn.on('click', function(){
                otpInput.focus();
            });

            otpInput.on('input keyup mouseup change blur', function(){
                if ($(this).val().indexOf('Х') < 0){
                    sendOtpBtn.removeClass('disabled');
                } else {
                    sendOtpBtn.addClass('disabled');
                }
            });

            nextBtn.addClass('disabled');
        },

        validateOtp: function (form$) {
            // replace to call real service
            var result = $.Deferred();
            setTimeout(function () {
                if (otpInput.val() == '1234') {
                    result.resolve();
                } else {
                    result.reject();
                }
            }, 1);

            return result.promise()
        }
    }
})();