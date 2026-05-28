$(document).ready(function () {

    $("#emi-calculate").on("submit", function (e) {

        e.preventDefault();

        let loanAmount = $("#emi_loan_amount").val().trim();
        let interestRate = $("#emi_interest_rate").val().trim();
        let tenure = $("#emi_tenure").val().trim();
        let tenureType = $("#emi_months_years").val();

        let currency = "INR";

        removeErrors();

        let hasError = false;

        if (loanAmount === "" || parseFloat(loanAmount) <= 0) {

            showError(
                "#emi_loan_amount",
                "Please enter loan amount"
            );

            hasError = true;
        }

        if (interestRate === "" || parseFloat(interestRate) <= 0) {

            showError(
                "#emi_interest_rate",
                "Please enter interest rate"
            );

            hasError = true;
        }

        if (tenure === "" || parseInt(tenure) <= 0) {

            showError(
                "#emi_tenure",
                "Please enter loan tenure"
            );

            hasError = true;
        }

        if (hasError) {
            return;
        }

        const calculateBtn = $("#calculateBtn");

        calculateBtn.addClass("loading");
        calculateBtn.prop("disabled", true);

        setTimeout(function () {

            let months =
                tenureType === "years"
                    ? tenure * 12
                    : tenure;

            let monthlyInterestRate =
                interestRate / 12 / 100;

            let emi =
                loanAmount *
                monthlyInterestRate *
                Math.pow(1 + monthlyInterestRate, months) /
                (Math.pow(1 + monthlyInterestRate, months) - 1);

            let totalPayment = emi * months;

            let totalInterest =
                totalPayment - loanAmount;

            $("#result_emi").html(
                formatCurrency(emi) + " " + currency
            );

            $("#total_interest").html(
                formatCurrency(totalInterest) + " " + currency
            );

            $("#total_payments").html(
                formatCurrency(totalPayment) + " " + currency
            );

            calculateBtn.removeClass("loading");
            calculateBtn.prop("disabled", false);

        }, 800);

    });

    $("#emireset").click(function () {

        removeErrors();

        $("#result_emi").html("0 INR");

        $("#total_interest").html("0 INR");

        $("#total_payments").html("0 INR");

    });

    $(".form-control").on("keyup change", function () {

        $(this).removeClass("invalid");

        $(this)
            .closest(".form-group")
            .find(".help-block")
            .remove();

    });

});


function showError(input, message) {

    $(input).addClass("invalid");

    let parent =
        $(input).closest(".form-group");

    if (
        parent.find(".help-block").length === 0
    ) {

        parent.append(
            '<span class="help-block">' +
            message +
            "</span>"
        );

    }

}

function removeErrors() {

    $(".help-block").remove();

    $(".form-control").removeClass(
        "invalid"
    );

}


function formatCurrency(amount) {

    return parseFloat(amount)
        .toLocaleString("en-IN", {
            maximumFractionDigits: 2
        });

}