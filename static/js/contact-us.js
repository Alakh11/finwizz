function tostMessage(msg) {

    if (typeof toastr !== 'undefined') {
        toastr.error(msg);
    } else {
        alert(msg);
    }
}

function revertButtonState() {

    var submitBtn = $('#contactForm')
        .find('button[type="submit"]');

    submitBtn
        .prop('disabled', false)
        .removeClass('loading');
}

function CharsetKeyOnly(evt) {

    var k = evt.keyCode || evt.which;

    if (
        (k >= 65 && k <= 90) ||
        (k >= 97 && k <= 122) ||
        k === 8 ||
        k === 32 ||
        k === 9
    ) {
        return true;
    } else {
        evt.preventDefault();
        return false;
    }
}

$(document).ready(function () {
    $('#contact_name').on('input', function () {

        var value = $(this).val();

        value = value.replace(/[^a-zA-Z\s]/g, '');

        value = value.replace(/\s\s+/g, ' ');

        $(this).val(value);
    });

    $('#contact_subject').on('input', function () {

        var value = $(this).val();

        value = value.replace(/[^a-zA-Z0-9\s\.\,\-\&]/g, '');

        value = value.replace(/\s\s+/g, ' ');

        $(this).val(value);
    });

    $.validator.addMethod(
        "ValidName",
        function (value, element) {

            value = $.trim(value);

            value = value.replace(/\s\s+/g, ' ');

            return this.optional(element) ||
                /^[a-zA-Z][a-zA-Z\s]*$/.test(value);

        },
        'Please enter valid name'
    );

    $.validator.addMethod(
        "ValidSubject",
        function (value, element) {

            return this.optional(element) ||
                /^[a-zA-Z0-9\s\.\,\-\&]+$/.test(value);

        },
        'Special characters are not allowed'
    );

    $.validator.addMethod(
        "customEmail",
        function (value, element) {

            return this.optional(element) ||
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);

        },
        "Please enter valid email address."
    );

    $('#contactForm').validate({

        ignore: [],

        errorClass: "invalid",

        onfocusout: function (element) {
            $(element).valid();
        },

        onkeyup: function (element, event) {

            if (
                event.which === 9 &&
                this.elementValue(element) === ""
            ) {
                return;
            } else {
                $(element).valid();
            }
        },

        errorPlacement: function (error, element) {

            var errorText = error.text();

            var container = element.closest('.form-group');

            if (container.find('.help-block').length > 0) {

                container.find('.help-block')
                    .html(errorText);

            } else {

                container.append(
                    '<span class="help-block">' +
                    errorText +
                    '</span>'
                );
            }

            container.addClass('has-error');
        },

        highlight: function (element, errorClass) {

            var $el = $(element);

            $el.addClass(errorClass);

            $el.closest('.form-group')
                .addClass('has-error');
        },

        unhighlight: function (element, errorClass) {

            var $el = $(element);

            $el.removeClass(errorClass);

            $el.closest('.form-group')
                .removeClass('has-error');

            $el.closest('.form-group')
                .find('.help-block')
                .html('');
        },

        rules: {

            contact_name: {
                required: true,
                ValidName: true,
                minlength: 3,
                maxlength: 100
            },

            contact_email: {
                required: true,
                customEmail: true,
                minlength: 5,
                maxlength: 100
            },

            contact_subject: {
                required: true,
                ValidSubject: true,
                minlength: 3,
                maxlength: 100
            },

            contact_message: {
                required: true,
                minlength: 10,
                maxlength: 500
            }
        },

        messages: {

            contact_name: {
                required: "Please enter your name",
                ValidName: "Only alphabets are allowed",
                minlength: "Name should be minimum 3 characters",
                maxlength: "Name should not exceed 100 characters"
            },

            contact_email: {
                required: "Please enter email address",
                customEmail: "Please enter valid email address",
                minlength: "Email should be minimum 5 characters",
                maxlength: "Email should not exceed 100 characters"
            },

            contact_subject: {
                required: "Please enter subject",
                ValidSubject: "Special characters are not allowed",
                minlength: "Subject should be minimum 3 characters",
                maxlength: "Subject should not exceed 100 characters"
            },

            contact_message: {
                required: "Please enter message",
                minlength: "Message should be minimum 10 characters",
                maxlength: "Message should not exceed 500 characters"
            }
        },

        submitHandler: function (form, event) {

            event.preventDefault();

            var submitBtn = $(form)
                .find('button[type="submit"]');

            submitBtn
                .prop('disabled', true)
                .addClass('loading');

            var formData = {
                'contact_name': $('#contact_name').val(),
                'contact_email': $('#contact_email').val(),
                'contact_subject': $('#contact_subject').val(),
                'contact_message': $('#contact_message').val(),
                'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
            };

            $.ajax({

                url: 'ajax/contact-us',

                type: 'POST',

                data: formData,

                timeout: 20000,

                success: function (response) {

                    revertButtonState();

                    if (response.status === 'success') {

                        if (typeof toastr !== 'undefined') {

                            toastr.success(
                                response.message ||
                                'Form submitted successfully'
                            );

                        } else {

                            alert(
                                response.message ||
                                'Form submitted successfully'
                            );
                        }

                        $('#contactForm')[0].reset();

                        $('.help-block').html('');

                        $('.form-group')
                            .removeClass('has-error');

                    } else {

                        tostMessage(
                            response.message ||
                            'Submission failed.'
                        );
                    }
                },

                error: function (xhr, status, error) {

                    revertButtonState();

                    if (
                        xhr.status === 0 ||
                        status === 'timeout'
                    ) {

                        tostMessage(
                            "Network error. Please check your internet connection."
                        );

                    } else if (xhr.status === 400) {

                        tostMessage(
                            "Validation error occurred."
                        );

                    } else if (xhr.status === 500) {

                        tostMessage(
                            "Server Error. Please try again later."
                        );

                    } else {

                        tostMessage(
                            "An unexpected error occurred. Please try again."
                        );
                    }

                    console.error(
                        'Error:',
                        xhr.responseText
                    );
                }
            });
        }
    });
});