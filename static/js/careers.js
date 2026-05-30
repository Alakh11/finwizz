function tostMessage(msg) {
    if (typeof toastr !== 'undefined') {
        toastr.error(msg);
    } else {
        alert(msg);
    }
}

function revertButtonState() {

    let submitBtn = $('#careerForm')
        .find('button[type="submit"]');

    submitBtn
        .prop('disabled', false)
        .removeClass('loading');
}

function CharsetKeyOnly(evt) {

    let k = evt.keyCode || evt.which;

    if (
        (k >= 65 && k <= 90) ||
        (k >= 97 && k <= 122) ||
        k === 8 ||
        k === 32 ||
        k === 9
    ) {
        return true;
    }

    evt.preventDefault();
    return false;
}

$(document).ready(function () {
    $('#career_name').on('input', function () {

        let value = $(this).val();

        value = value.replace(/[^a-zA-Z\s]/g, '');
        value = value.replace(/\s\s+/g, ' ');

        $(this).val(value);
    });

    $('#career_email').on('input blur', function () {

        let value = $(this).val();

        value = $.trim(value);
        value = value.replace(/\s+/g, '');

        $(this).val(value.toLowerCase());
    });

    $('#career_position').on('change', function () {

        $(this).valid();
    });

    $.validator.addMethod(
        "customEmail",
        function (value, element) {

            value = $.trim(value);

            return this.optional(element) ||
                /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value);

        },
        "Please enter valid email address"
    );

    $.validator.addMethod(
        "resumeValidation",
        function (value, element) {

            if (!element.files.length) {
                return false;
            }

            let file = element.files[0];

            let allowedExtensions = [
                'pdf',
                'doc',
                'docx',
                'jpg',
                'jpeg',
                'png',
                'svg',
                'avif'
            ];

            let extension = file.name
                .split('.')
                .pop()
                .toLowerCase();

            return allowedExtensions.includes(extension);

        },
        "Upload PDF, DOC, DOCX, JPG, JPEG, PNG, SVG or AVIF file"
    );

    $('#career_resume').on('change', function () {

        let file = this.files[0];

        if (!file) {
            return;
        }

        let allowedExtensions = [
            'pdf',
            'doc',
            'docx',
            'jpg',
            'jpeg',
            'png',
            'svg',
            'avif'
        ];

        let extension = file.name
            .split('.')
            .pop()
            .toLowerCase();

        let maxSize = 5 * 1024 * 1024;

        if (!allowedExtensions.includes(extension)) {

            tostMessage(
                "Only PDF, DOC, DOCX, JPG, JPEG, PNG, SVG and AVIF files are allowed."
            );

            $(this).val('');
            return;
        }

        if (file.size > maxSize) {

            tostMessage(
                "File size must be less than 5 MB."
            );

            $(this).val('');
            return;
        }

        $('.selected-file-name')
            .text(file.name);

        $('#clearResume')
            .show();

        $(this)
            .closest('.form-group')
            .removeClass('has-error')
            .find('.help-block')
            .html('');

        $(this).valid();
    });

    $('#clearResume').on('click', function (e) {

        e.preventDefault();

        $('#career_resume').val('');

        $('.selected-file-name').html('');

        $(this).hide();

        let formGroup = $('#career_resume')
            .closest('.form-group');

        formGroup.removeClass('has-error');

        formGroup
            .find('.help-block')
            .html('');
    });

    $('.selected-file-name').html('');
    $('#clearResume').hide();

    $('#careerForm').validate({

        ignore: [],

        errorClass: "invalid",

        onfocusout: function (element) {
            $(element).valid();
        },

        onkeyup: function (element) {
            $(element).valid();
        },

        errorPlacement: function (error, element) {

            let container = element.closest('.form-group');

            container
                .find('.help-block')
                .html(error.text());

            container.addClass('has-error');
        },

        highlight: function (element) {

            $(element)
                .closest('.form-group')
                .addClass('has-error');
        },

        unhighlight: function (element) {

            let container = $(element)
                .closest('.form-group');

            container.removeClass('has-error');

            container
                .find('.help-block')
                .html('');
        },

        rules: {

            career_name: {
                required: true,
                minlength: 3,
                maxlength: 100
            },

            career_email: {
                required: true,
                customEmail: true,
                maxlength: 100
            },

            career_position: {
                required: true
            },

            career_resume: {
                required: true,
                resumeValidation: true
            },

            career_message: {
                required: true,
                minlength: 10,
                maxlength: 500
            }
        },

        messages: {

            career_name: {
                required: "Please enter your name",
                minlength: "Name should be minimum 3 characters",
                maxlength: "Name should not exceed 100 characters"
            },

            career_email: {
                required: "Please enter email address",
                customEmail: "Please enter valid email address",
                maxlength: "Email should not exceed 100 characters"
            },

            career_position: {
                required: "Please select a position"
            },

            career_resume: {
                required: "Please upload your resume"
            },

            career_message: {
                required: "Please enter message",
                minlength: "Message should be minimum 10 characters",
                maxlength: "Message should not exceed 500 characters"
            }
        },

        submitHandler: function (form, event) {

            event.preventDefault();

            let submitBtn = $(form)
                .find('button[type="submit"]');

            submitBtn
                .prop('disabled', true)
                .addClass('loading');

            let formData = new FormData(form);

            $.ajax({

                url: 'ajax/career-form',

                type: 'POST',

                data: formData,

                processData: false,

                contentType: false,

                timeout: 20000,

                success: function (response) {

                    revertButtonState();

                    if (response.status === 'success') {

                        if (typeof toastr !== 'undefined') {
                            toastr.success(response.message);
                        }

                        $('#careerForm')[0].reset();

                        $('.selected-file-name').html('');
                        $('#clearResume').hide();

                        $('.help-block').html('');
                        $('.form-group').removeClass('has-error');

                    } else {

                        tostMessage(
                            response.message ||
                            'Submission failed.'
                        );
                    }
                },

                error: function (xhr, status) {

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
                            "Server error. Please try again later."
                        );

                    } else {

                        tostMessage(
                            "An unexpected error occurred. Please try again."
                        );
                    }
                }
            });
        }
    });
});