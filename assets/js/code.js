/* Defining global variables for the document objects */
const inputLoan = document.getElementById('loan');
const inputEa = document.getElementById('ea');
const inputInstallments = document.getElementById('installments');
const submitButton = document.getElementById('submit-button');
const totalAmountDescription = document.getElementById('total-amount');
const eaDescription = document.getElementById('apr-description');
const mvDescription = document.getElementById('mv-description');
const installmentsDescription = document.getElementById('installments-description');
const paymentPlan = document.getElementById('payment-plan-table')

/* Defining global variables */
let capital;
let ea;
let mv;
let installments;
let capitalPayment;
let interestPayment;
let installmentPayment;
let capitalPaymentString;
let totalAmount;

/* Creating functions */
function calculateInterest() {

    /* Initializing variables */
    capital = Number(inputLoan.value);
    ea = Number(inputEa.value);
    mv = Number(interestConvertion(ea));
    installments = Number(inputInstallments.value);
    capitalPayment = capital / installments;
    capitalPaymentString = financial(capitalPayment);
    totalAmount = capital;
    
    for(i = 1; i <= installments; i ++) {
        
        
        if(i == 1) {
            capital = capital;
        }
        else {
            capital = capital - capitalPayment;
        }
        
        interestPayment = (capital * (mv / 100));
        installmentPayment = capitalPayment + interestPayment;
        totalAmount = totalAmount + interestPayment;

        interestPayment = financial(interestPayment);
        installmentPayment = financial(installmentPayment);

        paymentPlan.innerHTML += `
                        <tr>
                            <td>${i}</td>
                            <td>$${capitalPaymentString}</td>
                            <td>$${interestPayment}</td>
                            <td>$${installmentPayment}</td>
                        </tr>`

    }

    /* Printing loan details */
    totalAmountDescription.innerHTML = financial(totalAmount);
    eaDescription.innerHTML = financial(ea) + "%";
    mvDescription.innerHTML = financial(mv) + "%";
    installmentsDescription.innerHTML = installments;
}

function financial(n) {
    return Number.parseFloat(n).toFixed(2);
}

function interestConvertion(i) {
    let tnm = Math.pow(1 + (i / 100), 30/360) - 1

    return tnm * 100;
}

/* Running code */
submitButton.addEventListener('click', calculateInterest);