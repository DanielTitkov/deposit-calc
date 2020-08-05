// because js just doesn't have NORMAL round fuction >_____<
// and we are counting MONEY here
// https://stackoverflow.com/a/47151941
export const round = (value, precision) => {
    if (Number.isInteger(precision)) {
        var shift = Math.pow(10, precision);
        // Limited preventing decimal issue
        return (Math.round(value * shift + 0.00000000000001) / shift);
    } else {
        return Math.round(value);
    }
} 

export const calculateMonthlyLoanPayment = (assetPrice, loanPeriod, loanRate) => {
    const monthlyLoanRate = loanRate / 12
    return assetPrice*monthlyLoanRate*((1+monthlyLoanRate)**(loanPeriod*12))/(((1+monthlyLoanRate)**(loanPeriod*12))-1)
}

export const calculateDepositSums = (depositPeriod, monthlyDepositRate, contribution) => {
    let cumulativeSums = [0];
    for (let i = 0; i < depositPeriod * 12; i++) {
        let income = cumulativeSums[i]*monthlyDepositRate;
        cumulativeSums.push(cumulativeSums[i] + income + contribution);
    }
    return cumulativeSums;
}

export const percentToDecimal = (n) => (
    n / 100
);