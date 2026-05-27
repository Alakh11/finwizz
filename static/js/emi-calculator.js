$(document).ready(function () {

    // EMI CALCULATION
    $("#emi-calculate").on("submit", function (e) {

        e.preventDefault();

        let loanAmount = $("#emi_loan_amount").val();
        let interestRate = $("#emi_interest_rate").val();
        let tenure = $("#emi_tenure").val();
        let tenureType = $("#emi_months_years").val();

        let currency = "INR";

        // VALIDATION
        if (loanAmount == "" || loanAmount == 0) {
            flashMsg("Please Enter Loan Amount");
            return;
        }

        if (interestRate == "" || interestRate == 0) {
            flashMsg("Please Enter Interest Rate");
            return;
        }

        if (tenure == "" || tenure == 0) {
            flashMsg("Please Enter Loan Tenure");
            return;
        }

        // CONVERT YEARS TO MONTHS
        let months = tenureType === "years"
            ? tenure * 12
            : tenure;

        // EMI FORMULA
        let monthlyInterestRate = interestRate / 12 / 100;

        let emi =
            loanAmount *
            monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, months) /
            (Math.pow(1 + monthlyInterestRate, months) - 1);

        let totalPayment = emi * months;

        let totalInterest = totalPayment - loanAmount;

        // UPDATE UI
        $("#result_emi").html(
            formatCurrency(emi) + " " + currency
        );

        $("#total_interest").html(
            formatCurrency(totalInterest) + " " + currency
        );

        $("#total_payments").html(
            formatCurrency(totalPayment) + " " + currency
        );

    });

    // RESET
    $("#emireset").click(function () {

        $("#result_emi").html("0 INR");
        $("#total_interest").html("0 INR");
        $("#total_payments").html("0 INR");

        $("#emi_msg").html("");

    });

});

/* ERROR MESSAGE */
function flashMsg(message){

    $("#emi_msg").html(message);

    setTimeout(function () {
        $("#emi_msg").html("");
    }, 2000);

}

/* FORMAT NUMBER */
function formatCurrency(amount){

    return parseFloat(amount)
        .toLocaleString("en-IN", {
            maximumFractionDigits: 2
        });

}