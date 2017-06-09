(function () {
    var setFocus = function (e) {

        // Set self as the current item in focus
        // var self = $(':focus'),
        var self = $(e.target),
        // Set the form by the current item in focus
            form = self.parents('form:eq(0)'), focusable;
        console.log(form);

        // Array of Indexable/Tab-able items
        focusable = form.find('input,a,select,button,textarea,div[contenteditable=true]').not(':disabled').not('[tabindex=\'-1\']').filter(':visible');

        function enterKey() {
            if (e.which === 13 && !self.is('div[contenteditable=true]')) { // [Enter] key
                // If not a regular hyperlink/button/textarea
                if ($.inArray(self, focusable) && (!self.is('a,button'))) {
                    // Then prevent the default [Enter] key behaviour from submitting the form
                    e.preventDefault();

                } // Otherwise follow the link/button as by design, or put new line in textarea
                else {
                    if (self.is('a,button')) {
                        //e.preventDefault();
                        self.trigger('click');
                    }
                }
                ;
                // Focus on the next item (either previous or next depending on shift)
                focusable.eq(focusable.index(self) + (e.shiftKey ? -1 : 1)).focus();
                if (focusable.eq(focusable.index(self) + (e.shiftKey ? -1 : 1)).is('a,button')) {
                    focusable.eq(focusable.index(self) + (e.shiftKey ? -1 : 1)).trigger('click');
                    if ($('#print-checkbox').length) {
                        $('#print-checkbox').focus();
                    }
                }
                return false;
            }
        }

        // We need to capture the [Shift] key and check the [Enter] key either way.
        if (e.shiftKey) {
            enterKey()
        } else {
            enterKey()
        }
    };


    $(document).keydown(function (e) {
        setFocus(e);
    });

    $(document).ready(function () {
        $('#doc-date').keydown(function (e) {
            setFocus(e);
        });

        $('#payment-period').keydown(function (e) {
            setFocus(e);
        });

        $('body').keydown(function(e){
            if ($('.tooltip-wrap.selected').get(0)) {
                var $table = $('.tooltip-wrap.selected').parents('table');
                switch(e.which){
                    case 13: //down
                        $table.find('.selected').trigger('dbl-click-row.bs.table');
                        break;
                    case 40: //down
                        //e.preventDefault();
                        var idx = $table.find('.selected').attr('data-index')  || -1;
                        $table.bootstrapTable('uncheck', idx);
                        try {
                            $table.bootstrapTable('check', ++idx);
                        } catch (e) {}
                        break;
                    case 38: // up
                        //e.preventDefault();
                        var idx = $table.find('.selected').attr('data-index') || 1;
                        $table.bootstrapTable('uncheck', idx);
                        try {
                            $table.bootstrapTable('check', --idx);
                        } catch (e) {}

                        break;
                }
            }
        });

    });

})();

