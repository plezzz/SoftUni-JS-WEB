module.exports = (amount) => {
    let check = new RegExp('[\$,]?');
    if (check.test(amount)) {
        amount = amount.replace(',', '.')
        amount = amount.replace('$', '')
    }
    if (isNaN(amount)) {
        return amount
    }
    return Number(amount)
}
