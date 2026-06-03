function tostMessage(msg) {
    if (typeof toastr !== 'undefined') {
        toastr.error(msg);
    } else {
        alert(msg);
    }
}

function revertButtonState() {
    let submitBtn = $('#applyLoanForm').find('button[type="submit"]');
    submitBtn.prop('disabled', false).removeClass('loading');
}

$(document).ready(function () {

    $('#loan_location').on('change', function() {
        if ($(this).val() === 'Others') {
            $('#other_location_wrap').slideDown();
        } else {
            $('#other_location_wrap').slideUp();
            $('#other_location').val('');

            let form = $('#applyLoanForm').validate();
            if(form) {
                form.element('#other_location');
            }
        }
    });

    $('#loan_name, #other_location').on('input', function () {
        let value = $(this).val();
        value = value.replace(/[^a-zA-Z\s]/g, '');
        value = value.replace(/\s\s+/g, ' ');
        $(this).val(value);
    });

    $('#loan_email').on('input blur', function () {
        let value = $(this).val();
        value = $.trim(value);
        value = value.replace(/\s+/g, '');
        $(this).val(value.toLowerCase());
    });

    $('#loan_mobile').on('input', function () {
        let value = $(this).val();
        value = value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        $(this).val(value);
    });

    $.validator.addMethod("customEmail", function (value, element) {
        value = $.trim(value);
        return this.optional(element) ||
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value);
    }, "Please enter valid email address");

    $.validator.addMethod("mobileValidation", function (value, element) {
        return this.optional(element) ||
            /^[6-9][0-9]{9}$/.test(value);
    }, "Please enter valid mobile number");

    $('#applyLoanForm').validate({
        ignore: ":hidden",

        errorClass: "invalid",

        onfocusout: function (element) {
            $(element).valid();
        },

        onkeyup: function (element) {
            $(element).valid();
        },

        errorPlacement: function (error, element) {
            let container = element.closest('.form-group');
            container.find('.help-block').html(error.text());
            container.addClass('has-error');
        },

        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },

        unhighlight: function (element) {
            let container = $(element).closest('.form-group');
            container.removeClass('has-error');
            container.find('.help-block').html('');
        },

        rules: {
            loan_name: { required: true, minlength: 3, maxlength: 100 },
            loan_location: { required: true },
            other_location: {
                required: function () {
                    return $("#loan_location").val() === "Others";
                },
                minlength: 2
            },
            employment_status: { required: true },
            loan_type: { required: true },
            loan_email: { required: true, customEmail: true, maxlength: 100 },
            loan_mobile: { required: true, mobileValidation: true },
            consent_data: { required: true },
            consent_terms: { required: true }
        },

        messages: {
            loan_name: {
                required: "Please enter your name",
                minlength: "Name should be minimum 3 characters"
            },
            loan_location: { required: "Please select a location" },
            other_location: { required: "Please specify your location" },
            employment_status: { required: "Please select employment status" },
            loan_type: { required: "Please select loan type" },
            loan_email: {
                required: "Please enter email address",
                customEmail: "Please enter valid email address"
            },
            loan_mobile: {
                required: "Please enter mobile number",
                mobileValidation: "Please enter a valid 10-digit mobile number"
            },
            consent_data: { required: "You must agree to the data collection policy" },
            consent_terms: { required: "You must agree to the Privacy Policy and Terms & Conditions" }
        },

        submitHandler: function (form, event) {
            event.preventDefault();

            let submitBtn = $(form).find('button[type="submit"]');
            submitBtn.prop('disabled', true).addClass('loading');

            $.ajax({
                url: 'ajax/apply-loan',
                type: 'POST',
                data: $(form).serialize(),
                success: function (response) {
                    revertButtonState();

                    if (response.status === 'success') {
                        if (typeof toastr !== 'undefined') {
                            toastr.success(response.message);
                        }
                        form.reset();
                        $('#other_location_wrap').hide();
                        $('.help-block').html('');
                        $('.form-group').removeClass('has-error');
                    } else {
                        tostMessage(response.message || 'Submission failed.');
                    }
                },
                error: function (xhr, status) {
                    revertButtonState();
                    if (xhr.status === 0 || status === 'timeout') {
                        tostMessage("Network error. Please check your internet connection.");
                    } else if (xhr.status === 400) {
                        tostMessage("Validation error occurred.");
                    } else if (xhr.status === 500) {
                        tostMessage("Server error. Please try again later.");
                    } else {
                        tostMessage("An unexpected error occurred. Please try again.");
                    }
                }
            });
        }
    });
});