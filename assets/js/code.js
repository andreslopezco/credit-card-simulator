/* Defining global variables for the document objects */
const inputCop = document.getElementById('cop');
const inputUsd = document.getElementById('usd');
const inputEur = document.getElementById('eur');
const inputCapital = document.getElementById('capital');
const inputEa = document.getElementById('ea');
const inputInstallments = document.getElementById('installments');
const imageSection = document.getElementById('image-section');
const paymentPlanSection = document.getElementById('payment-plan-section');
const totalAmountDescription = document.getElementById('total-amount-description');
const currencyDescription = document.getElementById('currency-description');
const eaDescription = document.getElementById('ea-description');
const mvDescription = document.getElementById('mv-description');
const installmentsDescription = document.getElementById('installments-description');
const paymentPlanDescription = document.getElementById('payment-plan-description')
const submitButton = document.getElementById('submit');
const restartButton = document.getElementById('restart');

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
function startScript() {
    submitButton.addEventListener('click', calculate);
    restartButton.addEventListener('click', restart);

    imageSection.style.display = 'flex';
    imageSection.style.justifyContent = 'center';
    paymentPlanSection.style.display = 'none';
}

function calculate() {

    submitButton.disabled = true;
    imageSection.style.display = 'none';
    paymentPlanSection.style.display = 'block';

    /* Initializing variables */
    capital = Number(inputCapital.value);
    ea = Number(inputEa.value);
    mv = Number(interestConvertion(ea));
    installments = Number(inputInstallments.value);
    capitalPayment = capital / installments;
    capitalPaymentString = financial(capitalPayment);
    totalAmount = capital;

    if(inputCop.checked == true) {
        currencyDescription.innerHTML = 'COP';
    }
    else if(inputUsd.checked == true) {
        currencyDescription.innerHTML = 'USD';
    }
    else if(inputEur.checked == true) {
        currencyDescription.innerHTML = 'EUR';
    }
    
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

        paymentPlanDescription.innerHTML += `
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
    let tmv = Math.pow(1 + (i / 100), 30/360) - 1

    return tmv * 100;
}

function restart(){

}

/* Running code */
startScript();